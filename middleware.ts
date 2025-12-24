import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const token = request.cookies.get('token')?.value;

  const publicPaths = ['/login', '/register', '/verify-email'];
  const isPublicPath = publicPaths.includes(pathname);

  if (token && isPublicPath) {
    return NextResponse.redirect(new URL('/admin', request.url));
  }

  if (pathname.startsWith('/admin') && !token) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
