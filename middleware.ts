import { NextRequest, NextResponse } from 'next/server';

// Simple middleware to protect the /admin path. It looks for an HttpOnly cookie
// named `is_admin` set to '1' (set at login when the email matches ADMIN_EMAIL).
// If the cookie is missing or not '1', the request is redirected to the site root.

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Only enforce for /admin and its subpaths
  if (!pathname.startsWith('/admin')) return NextResponse.next();

  const isAdmin = req.cookies.get('is_admin')?.value === '1';
  if (isAdmin) return NextResponse.next();

  const url = req.nextUrl.clone();
  url.pathname = '/';
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ['/admin/:path*'],
};
