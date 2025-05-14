

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;


CREATE EXTENSION IF NOT EXISTS "pg_cron" WITH SCHEMA "pg_catalog";






CREATE EXTENSION IF NOT EXISTS "pg_net" WITH SCHEMA "extensions";






COMMENT ON SCHEMA "public" IS 'standard public schema';



CREATE EXTENSION IF NOT EXISTS "pg_graphql" WITH SCHEMA "graphql";






CREATE EXTENSION IF NOT EXISTS "pg_stat_statements" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "pgjwt" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "supabase_vault" WITH SCHEMA "vault";






CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA "extensions";






CREATE TYPE "public"."interaction_type_enum" AS ENUM (
    'like',
    'dislike',
    'watch_start',
    'watch_complete'
);


ALTER TYPE "public"."interaction_type_enum" OWNER TO "postgres";


CREATE TYPE "public"."period_type_enum" AS ENUM (
    'daily',
    'weekly',
    'monthly',
    'all_time'
);


ALTER TYPE "public"."period_type_enum" OWNER TO "postgres";


CREATE TYPE "public"."subscription_tier_enum" AS ENUM (
    'free',
    'pro'
);


ALTER TYPE "public"."subscription_tier_enum" OWNER TO "postgres";


CREATE TYPE "public"."video_type_enum" AS ENUM (
    'standard',
    'short',
    'live'
);


ALTER TYPE "public"."video_type_enum" OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."calculate_daily_trends"("as_of" timestamp with time zone) RETURNS "void"
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$DECLARE
  today    date := as_of::date;            -- 例: 2025-05-02
  prev1    date := today - 1;              -- 前日
  prev7    date := today - 7;              -- 7 日前
BEGIN
  ------------------------------------------------------------------
  -- 1) 基本統計 (delta CTE)
  ------------------------------------------------------------------
  WITH today_stats AS (
    SELECT video_id, view_count AS vc_today
    FROM video_stats
    WHERE period_type = 'daily' AND period_date = today
  ), prev1_stats AS (
    SELECT video_id, view_count AS vc_prev1
    FROM video_stats
    WHERE period_type = 'daily' AND period_date = prev1
  ), prev7_stats AS (
    SELECT video_id, view_count AS vc_prev7
    FROM video_stats
    WHERE period_type = 'daily' AND period_date = prev7
  ), delta AS (
    SELECT
      v.id                                   AS video_id,
      COALESCE(t.vc_today, 0)                AS today_v,
      COALESCE(p1.vc_prev1, 0)               AS prev1_v,
      COALESCE(p7.vc_prev7, 0)               AS prev7_v,
      COALESCE(v.total_views, 0)             AS total_v,
      EXTRACT(EPOCH FROM (now() - v.published_at))/3600 AS hrs_since
    FROM videos v
    LEFT JOIN today_stats t  ON t.video_id = v.id
    LEFT JOIN prev1_stats p1 ON p1.video_id = v.id
    LEFT JOIN prev7_stats p7 ON p7.video_id = v.id
  ),
  ------------------------------------------------------------------
  -- 2) タグ (ジャンル+キーワード) と結合 & スコア計算
  ------------------------------------------------------------------
  tagged AS (
    SELECT video_id, genre_id AS tag_id, 'genre' AS tag_type FROM video_genres
    UNION ALL
    SELECT video_id, keyword_id, 'keyword' FROM video_keywords
  ), scored AS (
    SELECT
      tg.tag_id,
      tg.tag_type,
      d.video_id,
      (d.today_v - d.prev1_v)                       AS g1d,
      (d.today_v - d.prev7_v)                       AS g7d,
      d.total_v                                     AS views,
      /* 伸び率計算 (分母下限50) */
      ((d.today_v - d.prev1_v)::float / GREATEST(d.prev1_v,50)) *
      ((d.today_v - d.prev7_v)::float / GREATEST(d.prev7_v,50)) *
      LOG(10, d.total_v + 1) *
      EXP(-d.hrs_since/72)                          AS hot_score,
      ROW_NUMBER() OVER (
        PARTITION BY tg.tag_id, tg.tag_type
        ORDER BY
                 ((d.today_v - d.prev1_v)::float / GREATEST(d.prev1_v,50)) DESC,
                 -- hot_score (再計算)
                 (((d.today_v - d.prev1_v)::float / GREATEST(d.prev1_v,50)) *
                  ((d.today_v - d.prev7_v)::float / GREATEST(d.prev7_v,50)) *
                  LOG(10, d.total_v + 1) *
                  EXP(-d.hrs_since/72)) DESC NULLS LAST
      )                                             AS rn
    FROM tagged tg
    JOIN delta  d ON d.video_id = tg.video_id
    WHERE d.today_v > 0  -- 0 再生の動画を除外
  ), topn AS (
    SELECT
      tag_id,    -- scored から
      tag_type,  -- scored から
      video_id,  -- scored から
      g1d,       -- scored から
      g7d,       -- scored から
      views,     -- scored から
      hot_score, -- scored から ★明示的に含める
      rn         -- scored から
    FROM scored
    WHERE rn <= 20
  )
  ------------------------------------------------------------------
  -- 3) UPSERT into pre_calculated_rankings
  ------------------------------------------------------------------
INSERT INTO pre_calculated_rankings (
    genre_id,
    keyword_id,
    period_type,
    calculation_date,
    video_id,
    rank,
    metrics
  )
  SELECT
    t.genre_id_col, -- topnからエイリアスで取得
    t.keyword_id_col, -- topnからエイリアスで取得
    'daily' AS period_type,
    as_of AS calculation_date,
    t.video_id_col, -- topnからエイリアスで取得
    t.rn_col, -- topnからエイリアスで取得
    jsonb_build_object(
      'g1d',   t.g1d_col,
      'g7d',   t.g7d_col,
      'views', t.views_col,
      'score', t.actual_hot_score -- 明示的に選択したカラムを使用
    ) AS metrics
  FROM (
    SELECT
      CASE WHEN tag_type='genre' THEN tag_id ELSE NULL::uuid END AS genre_id_col,
      CASE WHEN tag_type='keyword' THEN tag_id ELSE NULL::uuid END AS keyword_id_col,
      video_id AS video_id_col,
      rn AS rn_col,
      g1d AS g1d_col,
      g7d AS g7d_col,
      views AS views_col,
      hot_score AS actual_hot_score -- ★ここで hot_score を明示的に選択
    FROM topn
  ) t
  ON CONFLICT (genre_id, keyword_id, period_type, calculation_date, video_id)
  DO UPDATE SET
    rank    = EXCLUDED.rank,
    metrics = EXCLUDED.metrics;
END;$$;


ALTER FUNCTION "public"."calculate_daily_trends"("as_of" timestamp with time zone) OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."cleanup_old_videos"() RETURNS "void"
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$
BEGIN
  -- 1) ジャンル側最新 20 件残し
  PERFORM cleanup_tag_links('video_genres', 20);

  -- 2) キーワード側最新 20 件残し
  PERFORM cleanup_tag_links('video_keywords', 20);

  -- 3) 参照がゼロになった動画を削除
  DELETE FROM videos v
  WHERE NOT EXISTS (SELECT 1 FROM video_genres   vg WHERE vg.video_id = v.id)
    AND NOT EXISTS (SELECT 1 FROM video_keywords vk WHERE vk.video_id = v.id);

  -- 4) 30 日より古い日次統計を削除
  DELETE FROM video_stats
  WHERE period_type = 'daily'
    AND period_date < (CURRENT_DATE - INTERVAL '30 days');
END;
$$;


ALTER FUNCTION "public"."cleanup_old_videos"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."cleanup_tag_links"("tbl_name" "text", "keep_rows" integer) RETURNS "void"
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $_$
DECLARE
  dyn_sql text;
BEGIN
  -- 動的 SQL でパーティションテーブル名を差し替える
  dyn_sql := format('
    WITH ranked AS (
      SELECT video_id, tag_id, rn FROM (
        SELECT vg.video_id,
               vg.%1$I   AS tag_id,
               ROW_NUMBER() OVER (
                 PARTITION BY vg.%1$I
                 ORDER BY v.published_at DESC
               ) AS rn
        FROM %2$I vg
        JOIN videos v ON v.id = vg.video_id
      ) sub
      WHERE rn > %3$L
    )
    DELETE FROM %2$I vg
    USING ranked r
    WHERE vg.video_id = r.video_id AND vg.%1$I = r.tag_id;
  ',
    CASE WHEN tbl_name = 'video_genres'   THEN 'genre_id'
         WHEN tbl_name = 'video_keywords' THEN 'keyword_id'
    END,
    tbl_name,
    keep_rows
  );

  EXECUTE dyn_sql;
END;
$_$;


ALTER FUNCTION "public"."cleanup_tag_links"("tbl_name" "text", "keep_rows" integer) OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."upsert_video_genres"("rows" "jsonb") RETURNS "void"
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$
DECLARE
  rec RECORD;
BEGIN
  FOR rec IN SELECT * FROM jsonb_to_recordset(rows)
      AS x(video_id uuid, genre_id uuid)
  LOOP
    INSERT INTO video_genres(video_id, genre_id)
    VALUES (rec.video_id, rec.genre_id)
    ON CONFLICT (video_id, genre_id) DO NOTHING;
  END LOOP;
END;
$$;


ALTER FUNCTION "public"."upsert_video_genres"("rows" "jsonb") OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."upsert_video_keywords"("rows" "jsonb") RETURNS "void"
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$
DECLARE
  rec RECORD;
BEGIN
  FOR rec IN SELECT * FROM jsonb_to_recordset(rows)
      AS x(video_id uuid, keyword_id uuid)
  LOOP
    INSERT INTO video_keywords(video_id, keyword_id)
    VALUES (rec.video_id, rec.keyword_id)
    ON CONFLICT (video_id, keyword_id) DO NOTHING;
  END LOOP;
END;
$$;


ALTER FUNCTION "public"."upsert_video_keywords"("rows" "jsonb") OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."upsert_video_stats"("rows" "jsonb") RETURNS "void"
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$DECLARE
  rec RECORD;
BEGIN
  -- JSONB 配列を 1 行ずつ展開
  FOR rec IN SELECT * FROM jsonb_to_recordset(rows)
      AS x(video_id uuid,
            period_type period_type_enum,
            period_date date,
            view_count integer,
            like_count integer)
  LOOP
    INSERT INTO video_stats (
      video_id,
      period_type,
      period_date,
      view_count,
      like_count
    ) VALUES (
      rec.video_id,
      rec.period_type,
      rec.period_date,
      rec.view_count,
      rec.like_count
    )
    ON CONFLICT (video_id, period_type, period_date)
    DO UPDATE SET
      view_count = EXCLUDED.view_count,
      like_count = EXCLUDED.like_count,
      created_at = now();
  END LOOP;
END;$$;


ALTER FUNCTION "public"."upsert_video_stats"("rows" "jsonb") OWNER TO "postgres";

SET default_tablespace = '';

SET default_table_access_method = "heap";


CREATE TABLE IF NOT EXISTS "public"."favorites" (
    "user_id" "uuid" NOT NULL,
    "video_id" "uuid" NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL
);


ALTER TABLE "public"."favorites" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."genres" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "name" "text" NOT NULL,
    "slug" "text" NOT NULL,
    "description" "text",
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "category" "text"
);


ALTER TABLE "public"."genres" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."keywords" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "name" "text" NOT NULL,
    "slug" "text" NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL
);


ALTER TABLE "public"."keywords" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."pre_calculated_rankings" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "genre_id" "uuid",
    "keyword_id" "uuid",
    "period_type" "public"."period_type_enum" NOT NULL,
    "calculation_date" timestamp with time zone NOT NULL,
    "video_id" "uuid",
    "rank" integer NOT NULL,
    "metrics" "jsonb"
);


ALTER TABLE "public"."pre_calculated_rankings" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."user_genres" (
    "user_id" "uuid" NOT NULL,
    "genre_id" "uuid" NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL
);


ALTER TABLE "public"."user_genres" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."user_interactions" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "user_id" "uuid",
    "video_id" "uuid",
    "interaction_type" "public"."interaction_type_enum" NOT NULL,
    "watch_duration" integer,
    "watch_percentage" numeric,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    CONSTRAINT "user_interactions_watch_percentage_check" CHECK ((("watch_percentage" IS NULL) OR (("watch_percentage" >= (0)::numeric) AND ("watch_percentage" <= (100)::numeric))))
);


ALTER TABLE "public"."user_interactions" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."user_keywords" (
    "user_id" "uuid" NOT NULL,
    "keyword_id" "uuid" NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL
);


ALTER TABLE "public"."user_keywords" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."users" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "clerk_id" "text" NOT NULL,
    "username" "text",
    "email" "text" NOT NULL,
    "subscription_tier" "public"."subscription_tier_enum" DEFAULT 'free'::"public"."subscription_tier_enum" NOT NULL,
    "subscription_start_date" timestamp with time zone,
    "subscription_end_date" timestamp with time zone,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "updated_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "external_provider" "text",
    "external_id" "text"
);


ALTER TABLE "public"."users" OWNER TO "postgres";


CREATE OR REPLACE VIEW "public"."user_preferences_detail_view" AS
 SELECT "u"."clerk_id",
    'genre'::"text" AS "pref_type",
    "g"."genre_id" AS "pref_id",
    "gn"."name" AS "label"
   FROM (("public"."users" "u"
     JOIN "public"."user_genres" "g" ON (("g"."user_id" = "u"."id")))
     JOIN "public"."genres" "gn" ON (("gn"."id" = "g"."genre_id")))
UNION ALL
 SELECT "u"."clerk_id",
    'keyword'::"text" AS "pref_type",
    "k"."keyword_id" AS "pref_id",
    "kw"."name" AS "label"
   FROM (("public"."users" "u"
     JOIN "public"."user_keywords" "k" ON (("k"."user_id" = "u"."id")))
     JOIN "public"."keywords" "kw" ON (("kw"."id" = "k"."keyword_id")));


ALTER TABLE "public"."user_preferences_detail_view" OWNER TO "postgres";


CREATE OR REPLACE VIEW "public"."user_preferences_view" AS
 SELECT DISTINCT "t"."user_id"
   FROM ( SELECT "user_genres"."user_id"
           FROM "public"."user_genres"
        UNION ALL
         SELECT "user_keywords"."user_id"
           FROM "public"."user_keywords") "t";


ALTER TABLE "public"."user_preferences_view" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."video_details" (
    "video_id" "uuid" NOT NULL,
    "description" "text",
    "updated_at" timestamp with time zone DEFAULT "now"() NOT NULL
);


ALTER TABLE "public"."video_details" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."video_genres" (
    "video_id" "uuid" NOT NULL,
    "genre_id" "uuid" NOT NULL
);


ALTER TABLE "public"."video_genres" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."video_keywords" (
    "video_id" "uuid" NOT NULL,
    "keyword_id" "uuid" NOT NULL
);


ALTER TABLE "public"."video_keywords" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."video_stats" (
    "video_id" "uuid" NOT NULL,
    "period_type" "public"."period_type_enum" NOT NULL,
    "period_date" "date" NOT NULL,
    "view_count" integer NOT NULL,
    "like_count" integer,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL
);


ALTER TABLE "public"."video_stats" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."videos" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "youtube_id" "text" NOT NULL,
    "title" "text" NOT NULL,
    "thumbnail_url" "text",
    "channel_id" "text",
    "channel_title" "text",
    "published_at" timestamp with time zone,
    "duration" integer,
    "video_type" "public"."video_type_enum" DEFAULT 'standard'::"public"."video_type_enum" NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "total_views" bigint DEFAULT 0 NOT NULL
);


ALTER TABLE "public"."videos" OWNER TO "postgres";


CREATE OR REPLACE VIEW "public"."videos_recent_genres" AS
 SELECT "v"."id",
    "v"."youtube_id",
    "v"."title",
    "v"."thumbnail_url",
    "v"."channel_id",
    "v"."channel_title",
    "v"."published_at",
    "v"."duration",
    "v"."video_type",
    "v"."created_at",
    "v"."total_views",
    "vg"."genre_id"
   FROM (("public"."videos" "v"
     JOIN "public"."video_genres" "vg" ON (("vg"."video_id" = "v"."id")))
     LEFT JOIN "public"."video_stats" "vs" ON (("vs"."video_id" = "v"."id")))
  WHERE ("v"."published_at" >= (("now"() AT TIME ZONE 'utc'::"text") - '24:00:00'::interval));


ALTER TABLE "public"."videos_recent_genres" OWNER TO "postgres";


CREATE OR REPLACE VIEW "public"."videos_recent_keywords" AS
 SELECT "v"."id",
    "v"."youtube_id",
    "v"."title",
    "v"."thumbnail_url",
    "v"."channel_id",
    "v"."channel_title",
    "v"."published_at",
    "v"."duration",
    "v"."video_type",
    "v"."created_at",
    "v"."total_views",
    "vk"."keyword_id"
   FROM (("public"."videos" "v"
     JOIN "public"."video_keywords" "vk" ON (("vk"."video_id" = "v"."id")))
     LEFT JOIN "public"."video_stats" "vs" ON (("vs"."video_id" = "v"."id")))
  WHERE ("v"."published_at" >= (("now"() AT TIME ZONE 'utc'::"text") - '24:00:00'::interval));


ALTER TABLE "public"."videos_recent_keywords" OWNER TO "postgres";


ALTER TABLE ONLY "public"."favorites"
    ADD CONSTRAINT "favorites_pkey" PRIMARY KEY ("user_id", "video_id");



ALTER TABLE ONLY "public"."genres"
    ADD CONSTRAINT "genres_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."genres"
    ADD CONSTRAINT "genres_slug_key" UNIQUE ("slug");



ALTER TABLE ONLY "public"."keywords"
    ADD CONSTRAINT "keywords_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."keywords"
    ADD CONSTRAINT "keywords_slug_key" UNIQUE ("slug");



ALTER TABLE ONLY "public"."pre_calculated_rankings"
    ADD CONSTRAINT "pre_calculated_rankings_genre_id_keyword_id_period_type_cal_key" UNIQUE ("genre_id", "keyword_id", "period_type", "calculation_date", "video_id");



ALTER TABLE ONLY "public"."pre_calculated_rankings"
    ADD CONSTRAINT "pre_calculated_rankings_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."user_genres"
    ADD CONSTRAINT "user_genres_pkey" PRIMARY KEY ("user_id", "genre_id");



ALTER TABLE ONLY "public"."user_interactions"
    ADD CONSTRAINT "user_interactions_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."user_keywords"
    ADD CONSTRAINT "user_keywords_pkey" PRIMARY KEY ("user_id", "keyword_id");



ALTER TABLE ONLY "public"."users"
    ADD CONSTRAINT "users_clerk_id_key" UNIQUE ("clerk_id");



ALTER TABLE ONLY "public"."users"
    ADD CONSTRAINT "users_email_key" UNIQUE ("email");



ALTER TABLE ONLY "public"."users"
    ADD CONSTRAINT "users_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."video_details"
    ADD CONSTRAINT "video_details_pkey" PRIMARY KEY ("video_id");



ALTER TABLE ONLY "public"."video_genres"
    ADD CONSTRAINT "video_genres_pkey" PRIMARY KEY ("video_id", "genre_id");



ALTER TABLE ONLY "public"."video_keywords"
    ADD CONSTRAINT "video_keywords_pkey" PRIMARY KEY ("video_id", "keyword_id");



ALTER TABLE ONLY "public"."video_stats"
    ADD CONSTRAINT "video_stats_pkey" PRIMARY KEY ("video_id", "period_type", "period_date");



ALTER TABLE ONLY "public"."videos"
    ADD CONSTRAINT "videos_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."videos"
    ADD CONSTRAINT "videos_youtube_id_key" UNIQUE ("youtube_id");



CREATE INDEX "idx_ui_user_created" ON "public"."user_interactions" USING "btree" ("user_id", "created_at" DESC);



CREATE UNIQUE INDEX "idx_videos_youtube_id" ON "public"."videos" USING "btree" ("youtube_id");



CREATE INDEX "idx_vs_period" ON "public"."video_stats" USING "btree" ("period_type", "period_date");



ALTER TABLE ONLY "public"."favorites"
    ADD CONSTRAINT "favorites_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."favorites"
    ADD CONSTRAINT "favorites_video_id_fkey" FOREIGN KEY ("video_id") REFERENCES "public"."videos"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."pre_calculated_rankings"
    ADD CONSTRAINT "pre_calculated_rankings_genre_id_fkey" FOREIGN KEY ("genre_id") REFERENCES "public"."genres"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."pre_calculated_rankings"
    ADD CONSTRAINT "pre_calculated_rankings_keyword_id_fkey" FOREIGN KEY ("keyword_id") REFERENCES "public"."keywords"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."pre_calculated_rankings"
    ADD CONSTRAINT "pre_calculated_rankings_video_id_fkey" FOREIGN KEY ("video_id") REFERENCES "public"."videos"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."user_genres"
    ADD CONSTRAINT "user_genres_genre_id_fkey" FOREIGN KEY ("genre_id") REFERENCES "public"."genres"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."user_genres"
    ADD CONSTRAINT "user_genres_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."user_interactions"
    ADD CONSTRAINT "user_interactions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."user_interactions"
    ADD CONSTRAINT "user_interactions_video_id_fkey" FOREIGN KEY ("video_id") REFERENCES "public"."videos"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."user_keywords"
    ADD CONSTRAINT "user_keywords_keyword_id_fkey" FOREIGN KEY ("keyword_id") REFERENCES "public"."keywords"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."user_keywords"
    ADD CONSTRAINT "user_keywords_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."video_details"
    ADD CONSTRAINT "video_details_video_id_fkey" FOREIGN KEY ("video_id") REFERENCES "public"."videos"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."video_genres"
    ADD CONSTRAINT "video_genres_genre_id_fkey" FOREIGN KEY ("genre_id") REFERENCES "public"."genres"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."video_genres"
    ADD CONSTRAINT "video_genres_video_id_fkey" FOREIGN KEY ("video_id") REFERENCES "public"."videos"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."video_keywords"
    ADD CONSTRAINT "video_keywords_keyword_id_fkey" FOREIGN KEY ("keyword_id") REFERENCES "public"."keywords"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."video_keywords"
    ADD CONSTRAINT "video_keywords_video_id_fkey" FOREIGN KEY ("video_id") REFERENCES "public"."videos"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."video_stats"
    ADD CONSTRAINT "video_stats_video_id_fkey" FOREIGN KEY ("video_id") REFERENCES "public"."videos"("id") ON DELETE CASCADE;



CREATE POLICY "Allow insert for authenticated users with Clerk ID" ON "public"."users" FOR INSERT TO "authenticated" WITH CHECK (("clerk_id" = ("auth"."uid"())::"text"));





ALTER PUBLICATION "supabase_realtime" OWNER TO "postgres";








GRANT USAGE ON SCHEMA "public" TO "postgres";
GRANT USAGE ON SCHEMA "public" TO "anon";
GRANT USAGE ON SCHEMA "public" TO "authenticated";
GRANT USAGE ON SCHEMA "public" TO "service_role";
































































































































































































GRANT ALL ON FUNCTION "public"."calculate_daily_trends"("as_of" timestamp with time zone) TO "anon";
GRANT ALL ON FUNCTION "public"."calculate_daily_trends"("as_of" timestamp with time zone) TO "authenticated";
GRANT ALL ON FUNCTION "public"."calculate_daily_trends"("as_of" timestamp with time zone) TO "service_role";



GRANT ALL ON FUNCTION "public"."cleanup_old_videos"() TO "anon";
GRANT ALL ON FUNCTION "public"."cleanup_old_videos"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."cleanup_old_videos"() TO "service_role";



GRANT ALL ON FUNCTION "public"."cleanup_tag_links"("tbl_name" "text", "keep_rows" integer) TO "anon";
GRANT ALL ON FUNCTION "public"."cleanup_tag_links"("tbl_name" "text", "keep_rows" integer) TO "authenticated";
GRANT ALL ON FUNCTION "public"."cleanup_tag_links"("tbl_name" "text", "keep_rows" integer) TO "service_role";



GRANT ALL ON FUNCTION "public"."upsert_video_genres"("rows" "jsonb") TO "anon";
GRANT ALL ON FUNCTION "public"."upsert_video_genres"("rows" "jsonb") TO "authenticated";
GRANT ALL ON FUNCTION "public"."upsert_video_genres"("rows" "jsonb") TO "service_role";



GRANT ALL ON FUNCTION "public"."upsert_video_keywords"("rows" "jsonb") TO "anon";
GRANT ALL ON FUNCTION "public"."upsert_video_keywords"("rows" "jsonb") TO "authenticated";
GRANT ALL ON FUNCTION "public"."upsert_video_keywords"("rows" "jsonb") TO "service_role";



GRANT ALL ON FUNCTION "public"."upsert_video_stats"("rows" "jsonb") TO "anon";
GRANT ALL ON FUNCTION "public"."upsert_video_stats"("rows" "jsonb") TO "authenticated";
GRANT ALL ON FUNCTION "public"."upsert_video_stats"("rows" "jsonb") TO "service_role";
























GRANT ALL ON TABLE "public"."favorites" TO "anon";
GRANT ALL ON TABLE "public"."favorites" TO "authenticated";
GRANT ALL ON TABLE "public"."favorites" TO "service_role";



GRANT ALL ON TABLE "public"."genres" TO "anon";
GRANT ALL ON TABLE "public"."genres" TO "authenticated";
GRANT ALL ON TABLE "public"."genres" TO "service_role";



GRANT ALL ON TABLE "public"."keywords" TO "anon";
GRANT ALL ON TABLE "public"."keywords" TO "authenticated";
GRANT ALL ON TABLE "public"."keywords" TO "service_role";



GRANT ALL ON TABLE "public"."pre_calculated_rankings" TO "anon";
GRANT ALL ON TABLE "public"."pre_calculated_rankings" TO "authenticated";
GRANT ALL ON TABLE "public"."pre_calculated_rankings" TO "service_role";



GRANT ALL ON TABLE "public"."user_genres" TO "anon";
GRANT ALL ON TABLE "public"."user_genres" TO "authenticated";
GRANT ALL ON TABLE "public"."user_genres" TO "service_role";



GRANT ALL ON TABLE "public"."user_interactions" TO "anon";
GRANT ALL ON TABLE "public"."user_interactions" TO "authenticated";
GRANT ALL ON TABLE "public"."user_interactions" TO "service_role";



GRANT ALL ON TABLE "public"."user_keywords" TO "anon";
GRANT ALL ON TABLE "public"."user_keywords" TO "authenticated";
GRANT ALL ON TABLE "public"."user_keywords" TO "service_role";



GRANT ALL ON TABLE "public"."users" TO "anon";
GRANT ALL ON TABLE "public"."users" TO "authenticated";
GRANT ALL ON TABLE "public"."users" TO "service_role";



GRANT ALL ON TABLE "public"."user_preferences_detail_view" TO "anon";
GRANT ALL ON TABLE "public"."user_preferences_detail_view" TO "authenticated";
GRANT ALL ON TABLE "public"."user_preferences_detail_view" TO "service_role";



GRANT ALL ON TABLE "public"."user_preferences_view" TO "anon";
GRANT ALL ON TABLE "public"."user_preferences_view" TO "authenticated";
GRANT ALL ON TABLE "public"."user_preferences_view" TO "service_role";



GRANT ALL ON TABLE "public"."video_details" TO "anon";
GRANT ALL ON TABLE "public"."video_details" TO "authenticated";
GRANT ALL ON TABLE "public"."video_details" TO "service_role";



GRANT ALL ON TABLE "public"."video_genres" TO "anon";
GRANT ALL ON TABLE "public"."video_genres" TO "authenticated";
GRANT ALL ON TABLE "public"."video_genres" TO "service_role";



GRANT ALL ON TABLE "public"."video_keywords" TO "anon";
GRANT ALL ON TABLE "public"."video_keywords" TO "authenticated";
GRANT ALL ON TABLE "public"."video_keywords" TO "service_role";



GRANT ALL ON TABLE "public"."video_stats" TO "anon";
GRANT ALL ON TABLE "public"."video_stats" TO "authenticated";
GRANT ALL ON TABLE "public"."video_stats" TO "service_role";



GRANT ALL ON TABLE "public"."videos" TO "anon";
GRANT ALL ON TABLE "public"."videos" TO "authenticated";
GRANT ALL ON TABLE "public"."videos" TO "service_role";



GRANT ALL ON TABLE "public"."videos_recent_genres" TO "anon";
GRANT ALL ON TABLE "public"."videos_recent_genres" TO "authenticated";
GRANT ALL ON TABLE "public"."videos_recent_genres" TO "service_role";



GRANT ALL ON TABLE "public"."videos_recent_keywords" TO "anon";
GRANT ALL ON TABLE "public"."videos_recent_keywords" TO "authenticated";
GRANT ALL ON TABLE "public"."videos_recent_keywords" TO "service_role";









ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "service_role";






























RESET ALL;
