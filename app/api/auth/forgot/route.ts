import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email } = body || {};

    if (!email) return NextResponse.json({ ok: false, message: 'Email required' }, { status: 400 });

    // In production: enqueue reset email, generate token, etc.
    console.log('Password reset requested for (demo):', email);
    return NextResponse.json({ ok: true, message: 'If the email exists, a reset link will be sent' }, { status: 200 });
  } catch (err) {
    console.error('Forgot route error', err);
    return NextResponse.json({ ok: false, message: 'Bad request' }, { status: 400 });
  }
}
