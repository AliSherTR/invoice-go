import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const publicRoutes = ['/login', '/register'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Skip Next.js internal requests, static files, and API routes
  if (
    pathname.startsWith('/_next') ||
    pathname.includes('/api/') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  const hasAccessToken = request.cookies.has('access_token');
  const hasRefreshToken = request.cookies.has('refresh_token');
  
  // We consider the user authenticated if either token is present.
  // If access_token is expired but refresh_token exists, the layout 
  // or API calls will securely refresh it in the background via Axios.
  const isAuthenticated = hasAccessToken || hasRefreshToken;

  const isPublicRoute = publicRoutes.some((route) => pathname.startsWith(route));

  // 1. If trying to access protected route without being authenticated
  if (!isAuthenticated && !isPublicRoute) {
    const loginUrl = new URL('/login', request.url);
    // loginUrl.searchParams.set('callbackUrl', encodeURI(pathname));
    return NextResponse.redirect(loginUrl);
  }

  // 2. If already authenticated and trying to access auth pages
  // Redirect them to their dashboard / home
  if (isAuthenticated && isPublicRoute) {
    return NextResponse.redirect(new URL('/invoices', request.url)); // adjust as needed
  }

  return NextResponse.next();
}

export const config = {
  // Apply middleware routing to all paths except the Next.js static asset build paths
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
