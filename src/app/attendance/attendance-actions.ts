"use server";

import type { AttendanceRecord, AttendanceStatus } from "@/types";

// 実際の環境では、これらの値はデータベースに保存される
const currentStatus: AttendanceStatus = {
  status: "not_started",
  lastAction: null,
};

const attendanceHistory: AttendanceRecord[] = [];

export async function getAttendanceStatus(): Promise<AttendanceStatus> {
  return currentStatus;
}

export async function getAttendanceHistory(): Promise<AttendanceRecord[]> {
  return attendanceHistory;
}

export async function recordAttendance(
  type: AttendanceRecord["type"]
): Promise<AttendanceRecord> {
  const record: AttendanceRecord = {
    id: crypto.randomUUID(),
    type,
    timestamp: new Date().toISOString(),
  };

  // Update status based on action type
  switch (type) {
    case "clock_in":
      currentStatus.status = "working";
      break;
    case "break_start":
      currentStatus.status = "on_break";
      break;
    case "break_end":
      currentStatus.status = "working";
      break;
    case "clock_out":
      currentStatus.status = "finished";
      break;
  }

  currentStatus.lastAction = record;
  attendanceHistory.unshift(record);

  return record;
}
