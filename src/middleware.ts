import { clerkMiddleware, createRouteMatcher, clerkClient } from '@clerk/nextjs/server';
import { supabase } from './lib/supabaseClient';
import { NextResponse } from 'next/server';
import { ensureUserRecord } from './dal/users';

const isProtectedRoute = createRouteMatcher([
  '/dashboard(.*)',
  '/profile(.*)',
  '/trends(.*)',
  '/settings(.*)',
]);

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) {
    await auth.protect();
  }

  const { userId: clerkId } = await auth();
  if (!clerkId) return null;
  const client = await clerkClient()
  const user   = await client.users.getUser(clerkId)
  
  const email = 
    user?.primaryEmailAddress?.emailAddress ??
    user?.emailAddresses?.[0]?.emailAddress ??
    `${clerkId}@users.yumeal`;

  const externalProvider = user?.externalAccounts?.[0]?.provider ?? null;
  const externalId = user?.externalAccounts?.[0]?.externalId ?? null;

  const userId = await ensureUserRecord({
    clerkId,
    email,
    externalProvider,
    externalId
  });

  if (userId) {
    console.log("userId："+userId);
    const { count, error } = await supabase
      .from('user_preferences_view')
      .select('user_id', { count: 'exact', head: true })
      .eq('user_id', userId);

    if (error) throw error;
    if (!count && !req.nextUrl.pathname.startsWith('/onboarding')) {
      return NextResponse.redirect(new URL('/onboarding', req.url));
    }
    if ((count ?? 0) > 0 &&
        (req.nextUrl.pathname === '/' || req.nextUrl.pathname.startsWith('/onboarding'))) {
      return NextResponse.redirect(new URL('/dashboard', req.url));
    }
  }
  return NextResponse.next();
});

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|api/auth|api/health).*)',
  ],
};