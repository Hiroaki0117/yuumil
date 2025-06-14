import { listRankingsByTag } from "@/dal/videos";
import { PerfType, PeriodType } from "@/types";
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

    const limit = Number(url.searchParams.get("limit") ?? "20");
    const periodType = url.searchParams.get("type") ?? <PeriodType>'daily';

    const data = await listRankingsByTag({
        periodType: periodType as PeriodType, 
        limit, 
        prefType: prefType as PerfType, 
        prefId});
    
    return NextResponse.json(data, {
        headers: {
            'Cache-Control': 's-maxage=3600, stale-while-revalidate=1800', // Cache for 1 hour
        },
    });
}