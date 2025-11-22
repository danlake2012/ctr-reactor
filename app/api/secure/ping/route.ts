import { NextResponse } from 'next/server';

export async function GET() {
  console.debug('[app api] /api/secure/ping');
  return NextResponse.json({ ok: true, message: 'pong' });
}
