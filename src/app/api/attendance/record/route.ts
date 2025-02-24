import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { recordAttendance } from "@/app/attendance/attendance-actions";

export async function POST(request: Request) {
  try {
    const token = (await cookies()).get("auth-token");
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { type } = await request.json();
    const record = await recordAttendance(type);

    return NextResponse.json({ data: record });
  } catch {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
