import { supabase } from "@/lib/database/supabaseClient";
import { PerfType } from "@/types";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export const runtime = 'edge';

export async function GET(req: Request) {
    const { userId } = await auth();
    if (!userId) return NextResponse.json({error: 'unauthorized'}, { status: 401});

    const url = new URL(req.url);
    const [prefType, prefId] = (url.searchParams.get("pref") ?? "").split(":");
    if (!(prefType && prefId)) {
        return NextResponse.json({ error: "pref param required"}, { status: 400 });
    }

    const period = url.searchParams.get("period") ?? "trend24h"; // デフォルトで24時間のトレンド

    try {
        // ジャンルまたはキーワードの情報を取得してslugを取得
        let tagSlug: string;
        
        if (prefType === "genre") {
            const { data: genre, error } = await supabase
                .from('genres')
                .select('slug')
                .eq('id', prefId)
                .single();
            
            if (error || !genre) {
                return NextResponse.json({ error: "Genre not found" }, { status: 404 });
            }
            tagSlug = genre.slug;
        } else if (prefType === "keyword") {
            const { data: keyword, error } = await supabase
                .from('keywords')
                .select('slug')
                .eq('id', prefId)
                .single();
            
            if (error || !keyword) {
                return NextResponse.json({ error: "Keyword not found" }, { status: 404 });
            }
            tagSlug = keyword.slug;
        } else {
            return NextResponse.json({ error: "Invalid pref type" }, { status: 400 });
        }

        // SupabaseのEdgeFunctionを呼び出し
        const { data, error } = await supabase.functions.invoke('fetch-trending-videos', {
            body: {
                tagSlug,
                period,
                jobType: "api"
            }
        });

        if (error) {
            console.error('EdgeFunction error:', error);
            return NextResponse.json({ 
                error: "Failed to fetch trending videos",
                details: error.message 
            }, { status: 500 });
        }

        // EdgeFunctionから返された動画データを整形
        const videos = data?.videos || [];
        
        // 既存のフォーマットに合わせてレスポンスを返す
        return NextResponse.json({ 
            data: videos.map((video: any) => ({
                id: video.id,
                youtube_id: video.youtube_id,
                title: video.title,
                thumbnail_url: video.thumbnail_url,
                channel_title: video.channel_title,
                published_at: video.published_at,
                total_views: video.total_views
            })),
            nextCursor: null // EdgeFunctionは無限スクロール未対応のため
        }, {
            headers: {
                'Cache-Control': 's-maxage=3600, stale-while-revalidate=1800', // Cache for 1 hour
            },
        });

    } catch (error) {
        console.error('API error:', error);
        return NextResponse.json({ 
            error: "Internal server error" 
        }, { status: 500 });
    }
};