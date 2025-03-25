"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Attendance, AttendanceActionType } from "@/types/supabase";
import { recordAttendance } from "./action";

interface AttendanceClientProps {
  status: Attendance | null;
  history: {
    data: Attendance[];
    count: number;
    totalPages: number;
  };
}

export default function AttendanceClient({
  status,
  history,
}: AttendanceClientProps) {
  const [currentTime] = useState(new Date());
  const formatDateTime = (date: Date) => {
    return date.toLocaleString("ja-JP", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

  const getStatusText = (status: AttendanceActionType | null) => {
    switch (status) {
      case "clock_in":
        return "出勤中";
      case "break_start":
        return "休憩中";
      case "break_end":
        return "休憩終了";
      case "clock_out":
        return "退勤済み";
      default:
        return "未出勤";
    }
  };

  const getActionText = (status: AttendanceActionType) => {
    switch (status) {
      case "clock_in":
        return "出勤中";
      case "break_start":
        return "休憩中";
      case "break_end":
        return "休憩終了";
      case "clock_out":
        return "退勤済み";
      default:
        return "未出勤";
    }
  };

  // ボタンの表示条件
  // - 出勤 (前回が退勤、あるいはレコードがない)
  // - 休憩開始 (前回が出勤)
  // - 休憩終了 (前回が休憩開始)
  // - 退勤(前回が出勤または休憩終了)

  // 出勤できるかどうか
  const isClockIn = status === null || status?.action === "clock_out";
  // 休憩開始できるかどうか
  const isBreakStart = status === null || status?.action === "clock_in";
  // 休憩終了できるかどうか
  const isBreakEnd = status === null || status?.action === "break_start";
  // 退勤できるかどうか
  const isClockOut =
    status === null ||
    status?.action === "clock_in" ||
    status?.action === "break_end";

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="space-y-4">
          <div className="text-center">
            <p className="text-xl">{formatDateTime(currentTime)}</p>
          </div>

          <div className="text-center">
            <p className="text-lg font-semibold">
              現在の状況: {getStatusText(status?.action ?? null)}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            <Button
              onClick={() => recordAttendance("clock_in")}
              disabled={!isClockIn}
            >
              出勤
            </Button>
            <Button
              onClick={() => recordAttendance("break_start")}
              disabled={!isBreakStart}
            >
              休憩開始
            </Button>
            <Button
              onClick={() => recordAttendance("break_end")}
              disabled={!isBreakEnd}
            >
              休憩終了
            </Button>
            <Button
              onClick={() => recordAttendance("clock_out")}
              disabled={!isClockOut}
            >
              退勤
            </Button>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h2 className="text-xl font-bold mb-4">打刻履歴</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>日時</TableHead>
              <TableHead>操作</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {history.data.map((record) => (
              <TableRow key={record.attendance_id}>
                <TableCell>
                  {formatDateTime(new Date(record.timestamp))}
                </TableCell>
                <TableCell>{getActionText(record.action)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
