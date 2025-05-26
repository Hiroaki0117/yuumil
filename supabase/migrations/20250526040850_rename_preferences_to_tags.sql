-- Rename preferences-related views to tags for consistency

-- First, drop the existing views
DROP VIEW IF EXISTS user_preferences_detail_view;
DROP VIEW IF EXISTS user_preferences_view;

-- Create new views with updated names and column names
CREATE OR REPLACE VIEW user_tags_detail_view AS
 SELECT u.clerk_id,
    'genre'::text AS tag_type,
    g.genre_id AS tag_id,
    gn.name AS label
   FROM ((users u
     JOIN user_genres g ON ((g.user_id = u.id)))
     JOIN genres gn ON ((gn.id = g.genre_id)))
UNION ALL
 SELECT u.clerk_id,
    'keyword'::text AS tag_type,
    k.keyword_id AS tag_id,
    kw.name AS label
   FROM ((users u
     JOIN user_keywords k ON ((k.user_id = u.id)))
     JOIN keywords kw ON ((kw.id = k.keyword_id)));

CREATE OR REPLACE VIEW user_tags_view AS
 SELECT DISTINCT t.user_id
   FROM ( SELECT user_genres.user_id
           FROM user_genres
        UNION ALL
         SELECT user_keywords.user_id
           FROM user_keywords) t;