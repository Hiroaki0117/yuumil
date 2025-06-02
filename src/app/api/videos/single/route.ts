import { supabase } from "@/lib/database/supabaseClient";
import { NextResponse } from "next/server";

export const runtime = 'edge';

export async function GET(req: Request) {
  const vid = new URL(req.url).searchParams.get('vid');
  if (!vid) return NextResponse.json({ error: 'video id required' }, { status: 400 });

  const { data, error } = await supabase
    .from('videos')
    .select('*')
    .eq('id', vid)
    .single();
  
  if (error) return NextResponse.json({ error: error.message }, { status: 404 });
  return NextResponse.json(data, {
    headers: {
      'Cache-Control': 's-maxage=86400, stale-while-revalidate=43200', // Cache for 24 hours
    },
  });
}