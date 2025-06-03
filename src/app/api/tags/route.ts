import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { listUserTagsByClerkId } from '@/dal/users';

export const runtime = 'edge';

export async function GET() {
  const { userId: clerkId } = await auth();
  if (!clerkId) return NextResponse.json([], { status: 401 });

  const tags = await listUserTagsByClerkId(clerkId);
  return NextResponse.json(tags, {
    headers: {
      'Cache-Control': 's-maxage=300, stale-while-revalidate=150', // Cache for 5 minutes
    },
  });
}