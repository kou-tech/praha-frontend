"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { Attendance, AttendanceAction } from "@/types/supabase";
import { getCurrentUser } from "@/app/login/actions";

// 次の有効なアクションを取得する関数
export async function getNextValidAction(): Promise<AttendanceAction | null> {
  const user = await getCurrentUser();
  if (!user) return null;

  const supabase = await createClient();

  // 最新の勤怠レコードを取得
  const { data: latestAttendance } = await supabase
    .from("attendance")
    .select("*")
    .eq("auth_id", user.data.user?.id)
    .order("timestamp", { ascending: false })
    .limit(1)
    .single();

  if (!latestAttendance) {
    // レコードがない場合は出勤のみ可能
    return "clock_in";
  }

  // 前回のアクションに基づいて次の有効なアクションを決定
  switch (latestAttendance.action) {
    case "clock_in":
      return "break_start";
    case "break_start":
      return "break_end";
    case "break_end":
      return "clock_out";
    case "clock_out":
      return "clock_in";
    default:
      return null;
  }
}

// 勤怠アクションを記録する関数
export async function recordAttendance(action: AttendanceAction) {
  const user = await getCurrentUser();
  if (!user) {
    return { error: "ユーザーが認証されていません" };
  }

  // 次の有効なアクションを確認
  const nextValidAction = await getNextValidAction();
  if (nextValidAction !== action) {
    return {
      error: `現在の状態では ${action} はできません。有効なアクションは ${nextValidAction} です。`,
    };
  }

  const supabase = await createClient();

  const { error } = await supabase.from("attendance").insert({
    auth_id: user.data.user?.id,
    action: action,
    timestamp: new Date().toISOString(),
  });

  if (error) {
    console.error("Error recording attendance:", error.message);
    return { error: error.message };
  }

  revalidatePath("/attendance");
  return { success: true };
}

// 当日の勤怠記録を取得する関数
export async function getTodayAttendance(): Promise<Attendance | null> {
  const user = await getCurrentUser();
  if (!user) return null;

  const supabase = await createClient();

  // 日本時間の当日の開始と終了を計算
  const now = new Date();
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const todayEnd = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() + 1
  );

  const { data } = await supabase
    .from("attendance")
    .select("*")
    .eq("auth_id", user.data.user?.id)
    .gte("timestamp", todayStart.toISOString())
    .lt("timestamp", todayEnd.toISOString())
    .order("timestamp", { ascending: false });

  return data?.[0] || null;
}

// 勤怠履歴を取得する関数（ページネーション対応）
export async function getAttendanceHistory(
  page = 1,
  pageSize = 10
): Promise<{
  data: Attendance[];
  count: number;
  totalPages: number;
}> {
  const user = await getCurrentUser();
  if (!user) return { data: [], count: 0, totalPages: 0 };

  const supabase = await createClient();

  // 総数を取得
  const { count } = await supabase
    .from("attendance")
    .select("*", { count: "exact", head: true })
    .eq("auth_id", user.data.user?.id);

  // データを取得
  const { data } = await supabase
    .from("attendance")
    .select("*")
    .eq("auth_id", user.data.user?.id)
    .order("timestamp", { ascending: false })
    .range((page - 1) * pageSize, page * pageSize - 1);

  return {
    data: data || [],
    count: count || 0,
    totalPages: Math.ceil((count || 0) / pageSize),
  };
}
