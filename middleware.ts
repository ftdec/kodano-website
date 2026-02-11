import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Enterprise site - All main routes allowed
  const allowedPaths = [
    "/",
    "/solucao",
    "/como-funciona",
    "/segmentos",
    "/integracao",
    "/seguranca-e-compliance",
    "/sobre",
    "/contato",
    "/blog",
    // Policy pages (legal compliance)
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

  // Redirect unknown routes to home
  return NextResponse.redirect(new URL("/", request.url));
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon|robots|sitemap|.*\\..*).*)",
  ],
};
