import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// English lives at the root ("/", "/blog"); Chinese at "/zh/...".
// Both are prerendered under app/[locale], so unprefixed paths are rewritten to /en.
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/en" || pathname.startsWith("/en/")) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.slice(3) || "/";
    return NextResponse.redirect(url, 308);
  }
  if (pathname === "/zh" || pathname.startsWith("/zh/")) return;

  const url = request.nextUrl.clone();
  url.pathname = `/en${pathname === "/" ? "" : pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: ["/((?!_next|feed.xml|.*\\..*).*)"],
};
