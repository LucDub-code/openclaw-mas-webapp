import { NextRequest, NextResponse } from "next/server"
import { getSessionCookie } from "better-auth/cookies"

export function proxy(request: NextRequest) {
  
  const sessionCookie = getSessionCookie(request)
  const { pathname } = request.nextUrl
  const isLoginPage = pathname === "/login"

  if (!sessionCookie && !isLoginPage) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  if (sessionCookie && isLoginPage) {
    return NextResponse.redirect(new URL("/", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}