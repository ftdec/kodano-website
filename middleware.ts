import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Don't redirect:
  // - Root path (/)
  // - API routes (/api/*)
  // - Next.js internal routes (_next/*)
  // - Static files (favicon, robots, sitemap, etc.)
  // - Files with extensions (images, fonts, etc.)
  // - Policy pages (required for compliance)
  // - Other allowed routes
  const allowedRoutes = [
    "/",
    "/contato",
    "/sobre",
    "/produtos",
    "/solucoes",
    "/precos",
    "/como-funciona",
    "/desenvolvedores",
    "/fale-conosco",
    "/seguranca",
    "/clientes",
    "/para-empresas",
    "/para-adquirentes",
    "/politica-de-privacidade",
    "/politica-kyc-kyb",
    "/politica-pld-ft",
    "/politica-seguranca-informacao",
  ];

  if (
    pathname === "/" ||
    pathname.startsWith("/api/") ||
    pathname.startsWith("/_next/") ||
    pathname.startsWith("/favicon") ||
    pathname.startsWith("/robots") ||
    pathname.startsWith("/sitemap") ||
    pathname.match(/\.(ico|png|jpg|jpeg|svg|gif|webp|woff|woff2|ttf|eot|css|js|json|xml|txt)$/) ||
    allowedRoutes.includes(pathname)
  ) {
    return NextResponse.next();
  }

  // Redirect all other routes to home page
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
