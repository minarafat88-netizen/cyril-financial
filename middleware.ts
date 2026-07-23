import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("cynl_auth_token")?.value;

  // Protect Admin Dashboard Routes at the edge boundary.
  // The server routes themselves still verify the JWT and role, which keeps
  // the middleware lightweight and compatible with Edge Runtime.
  if ((pathname.startsWith("/admin") || pathname.startsWith("/api/admin")) && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Set Security Headers on all responses
  const response = NextResponse.next();
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=()");
  response.headers.set(
    "Content-Security-Policy",
    "default-src 'self'; base-uri 'self'; object-src 'none'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.google.com https://www.gstatic.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:;"
  );

  return response;
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*", "/apply/:path*"],
};