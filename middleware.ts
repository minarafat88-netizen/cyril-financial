import { NextResponse, type NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  // Maintaining full cookie management helper matching your original architecture structure
  const cookieMethods = {
    get(name: string) {
      return request.cookies.get(name)?.value;
    },
    set(name: string, value: string, options: any) {
      request.cookies.set({
        name,
        value,
        ...options,
      });
      response = NextResponse.next({
        request: {
          headers: request.headers,
        },
      });
      response.cookies.set({
        name,
        value,
        ...options,
      });
    },
    remove(name: string, options: any) {
      request.cookies.set({
        name,
        value: '',
        ...options,
      });
      response = NextResponse.next({
        request: {
          headers: request.headers,
        },
      });
      response.cookies.set({
        name,
        value: '',
        ...options,
      });
    },
  };

  // Check for Firebase session cookie or token managed by your app client/server flow
  const sessionToken = request.cookies.get('firebase-auth-token')?.value || request.cookies.get('session')?.value;

  const isProtectedPath = request.nextUrl.pathname.startsWith('/admin') || request.nextUrl.pathname.startsWith('/portal');

  if (isProtectedPath && !sessionToken) {
    // Redirect unauthenticated users to the login page preserving your exact error flow
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('error', 'Authentication required. Please log in.');
    return NextResponse.redirect(loginUrl);
  }

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