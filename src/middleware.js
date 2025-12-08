import { NextResponse } from "next/server";

export function middleware(req) {
  const session = req.cookies.get("signupSessionId");

  if (!session && req.nextUrl.pathname.startsWith("/auth/otp")) {
    return NextResponse.redirect(new URL("/auth/register", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/auth/otp"],
};
