import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { email, password } = await request.json();

  // 実際の環境では、ここでデータベースとの照合を行う
  if (email === "test@example.com" && password === "password") {
    // セッショントークンの生成（実際の環境では適切な暗号化が必要）
    const token = "dummy-token";

    // Cookieの設定
    (await cookies()).set("auth-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 1週間
    });

    return NextResponse.json({ success: true });
  }

  return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
}
