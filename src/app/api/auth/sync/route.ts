import { ensureUserRecord } from '@/dal/users';
import { normalizeUserPayload } from '@/lib/auth';
import { validateRequired, validateEmail } from '@/lib/validations';
import { ERROR_MESSAGES } from '@/lib/constants';
import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export const runtime = 'edge';

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json(
        { error: ERROR_MESSAGES.UNAUTHORIZED }, 
        { status: 401 }
      );
    }

    const body = await req.json();
    
    // バリデーション
    const clerkIdError = validateRequired(body.clerkId, 'Clerk ID');
    if (clerkIdError) {
      return NextResponse.json(
        { error: clerkIdError }, 
        { status: 400 }
      );
    }

    const emailError = validateEmail(body.email);
    if (emailError) {
      return NextResponse.json(
        { error: emailError }, 
        { status: 400 }
      );
    }

    // ユーザー情報の正規化と保存
    const userPayload = normalizeUserPayload(body);
    const internalUserId = await ensureUserRecord(userPayload);

    if (!internalUserId) {
      return NextResponse.json(
        { error: ERROR_MESSAGES.SAVE_ERROR }, 
        { status: 500 }
      );
    }

    return NextResponse.json({ 
      success: true, 
      userId: internalUserId 
    });

  } catch (error) {
    console.error('User sync error:', error);
    return NextResponse.json(
      { error: ERROR_MESSAGES.NETWORK_ERROR }, 
      { status: 500 }
    );
  }
} 