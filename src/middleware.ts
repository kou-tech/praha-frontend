import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // 認証が必要なパスかチェック
  if (request.nextUrl.pathname.startsWith("/attendance")) {
    const token = request.cookies.get("auth-token");

    if (!token) {
      // 未認証の場合はログインページにリダイレクト
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/attendance/:path*",
};
