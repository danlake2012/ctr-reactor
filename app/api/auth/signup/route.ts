import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, password } = body || {};

    // Very small demo: accept any signup and return success
    if (!email || !password) {
      return NextResponse.json({ ok: false, message: 'Email and password required' }, { status: 400 });
    }

    // In production: validate, create user, hash password, etc.
    return NextResponse.json({ ok: true, email, name }, { status: 201 });
  } catch (err) {
    console.error('Signup route error', err);
    return NextResponse.json({ ok: false, message: 'Bad request' }, { status: 400 });
  }
}
