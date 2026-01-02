import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const token = request.cookies.get('token')?.value;
  const role = request.cookies.get('role')?.value;

  console.log('Middleware check:', {
    pathname,
    hasToken: !!token,
    role,
    cookies: request.cookies.getAll(),
  });

  const publicPaths = ['/login', '/register', '/verify-email', '/unauthorized'];
  const isPublicPath = publicPaths.some(path => pathname === path || pathname.startsWith(path));

  if (
    token &&
    (pathname === '/login' || pathname === '/register' || pathname === '/verify-email')
  ) {
    if (role === 'admin') {
      return NextResponse.redirect(new URL('/admin', request.url));
    }
    if (role === 'user') {
      return NextResponse.redirect(new URL('/member', request.url));
    }
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (pathname.startsWith('/admin')) {
    if (!token) {
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('callbackUrl', pathname);
      return NextResponse.redirect(loginUrl);
    }

    if (role !== 'admin') {
      if (role === 'user') {
        return NextResponse.redirect(new URL('/member', request.url));
      }
      return NextResponse.redirect(new URL('/unauthorized', request.url));
    }

    return NextResponse.next();
  }

  if (pathname.startsWith('/member')) {
    if (!token) {
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('callbackUrl', pathname);
      return NextResponse.redirect(loginUrl);
    }

    if (role !== 'user') {
      if (role === 'admin') {
        return NextResponse.redirect(new URL('/admin', request.url));
      }
      return NextResponse.redirect(new URL('/unauthorized', request.url));
    }

    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)'],
};
