import { NextResponse } from "next/server";
import { auth } from "./auth";

export default auth((req) => {
  // 保護されたルートへのアクセスをチェック
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  // 次のアクセスはログインが必要
  if (nextUrl.pathname.startsWith("/attendance") && !isLoggedIn) {
    return NextResponse.redirect(new URL("/login", nextUrl));
  }

  // ログイン済みユーザーがログインページにアクセスした場合はリダイレクト
  if (nextUrl.pathname.startsWith("/login") && isLoggedIn) {
    return NextResponse.redirect(new URL("/attendance", nextUrl));
  }

  return NextResponse.next();
});

// 特定のパスに対してミドルウェアを適用
export const config = {
  matcher: ["/attendance/:path*", "/login"],
};
