import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const commit = process.env.VERCEL_GIT_COMMIT_SHA || process.env.NEXT_PUBLIC_VERCEL_COMMIT_SHA || null;
    const url = process.env.VERCEL_URL || null;
    const env = process.env.VERCEL_ENV || process.env.NODE_ENV || null;
    const time = new Date().toISOString();

    return NextResponse.json({ ok: true, commit, url, env, time });
  } catch (err) {
    console.error('deploy info error', err);
    return NextResponse.json({ ok: false, error: 'Server error' }, { status: 500 });
  }
}
