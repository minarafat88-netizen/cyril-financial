import { NextResponse, type NextRequest } from 'next/server';

// Function to set security headers on a response
function setSecurityHeaders(response: NextResponse) {
  const cspHeader = `
    default-src 'self';
    script-src 'self' 'unsafe-eval' 'unsafe-inline';
    style-src 'self' 'unsafe-inline';
    img-src * data:;
    font-src 'self';
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
  `.replace(/\s{2,}/g, ' ').trim();

  response.headers.set('Content-Security-Policy', cspHeader);
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  return response;
}

export async function middleware(request: NextRequest) {
  // Check for Firebase session cookie or token managed by your app client/server flow
  const sessionToken = request.cookies.get('firebase-auth-token')?.value || request.cookies.get('session')?.value;

  const isProtectedPath = request.nextUrl.pathname.startsWith('/admin') || request.nextUrl.pathname.startsWith('/portal');

  if (isProtectedPath && !sessionToken) {
    // Redirect unauthenticated users to the login page preserving your exact error flow
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('error', 'Authentication required. Please log in.');
    const redirectResponse = NextResponse.redirect(loginUrl);
    return setSecurityHeaders(redirectResponse);
  }

  // For all other requests, continue and apply security headers
  const response = NextResponse.next();
  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (e.g. images, icons)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|images|icons).*)',
  ],
};