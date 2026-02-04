import { NextResponse } from "next/server";
import { verifyToken } from "./lib/auth";

export function middleware(req) {
  const url = req.nextUrl.clone();
  if (url.pathname.startsWith("/admin")) {
    return NextResponse.next();
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
