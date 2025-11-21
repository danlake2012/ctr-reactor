import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password } = body || {};

    // Demo credentials - replace with real auth in production
    if (email === 'demo@ctr.com' && password === 'demo123') {
      return NextResponse.json({ ok: true, email }, { status: 200 });
    }

    return NextResponse.json({ ok: false, message: 'Invalid email or password' }, { status: 401 });
  } catch (err) {
    console.error('Login route error', err);
    return NextResponse.json({ ok: false, message: 'Bad request' }, { status: 400 });
  }
}
