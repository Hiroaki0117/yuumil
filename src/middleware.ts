import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { supabase } from './lib/supabaseClient';
import { NextResponse } from 'next/server';

const isProtectedRoute = createRouteMatcher([
  '/dashboard(.*)',
  '/profile(.*)',
  '/trends(.*)',
  '/settings(.*)',
]);

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) {
    await auth.protect(); // auth()ではなくauth.protect()
  }
  
  var userId = (await auth()).userId;
  if (userId) {
    const {data} = await supabase.from("user_genres")
                                  .select("uesr_id")
                                  .eq('user_id', userId)
                                  .limit(1)
                                  .maybeSingle();

    if (!data && !req.nextUrl.pathname.startsWith('/onboarding')) {
      return NextResponse.redirect(new URL('/onboarding', req.url));
    }
  }
  return NextResponse.next();
});

export const config = {
  matcher: [
    '/((?!_next|.*\\..*).*)',
  ],
};
