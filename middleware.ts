import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow only:
  // - Root path (/)
  // - API routes (/api/*)
  // - Next.js internal routes (_next/*)
  // - Static files (favicon, robots, sitemap, etc.)
  // - Files with extensions (images, fonts, etc.)
  // - Policy pages (required for legal compliance)
  const allowedPaths = [
    "/",
    "/politica-de-privacidade",
    "/politica-kyc-kyb",
    "/politica-pld-ft",
    "/politica-seguranca-informacao",
  ];

  if (
    allowedPaths.includes(pathname) ||
    pathname.startsWith("/api/") ||
    pathname.startsWith("/_next/") ||
    pathname.startsWith("/favicon") ||
    pathname.startsWith("/robots") ||
    pathname.startsWith("/sitemap") ||
    pathname.match(/\.(ico|png|jpg|jpeg|svg|gif|webp|woff|woff2|ttf|eot|css|js|json|xml|txt)$/)
  ) {
    return NextResponse.next();
  }

  // Redirect ALL other routes to home page (one-pager)
  return NextResponse.redirect(new URL("/", request.url));
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - robots.txt, sitemap.xml (SEO files)
     * - Files with extensions (images, fonts, etc.)
     */
    "/((?!api|_next/static|_next/image|favicon|robots|sitemap|.*\\..*).*)",
  ],
};
