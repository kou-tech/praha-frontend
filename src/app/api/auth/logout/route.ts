import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  // 認証用Cookieを削除
  (await cookies()).delete("auth-token");

  return NextResponse.json({ success: true });
}
