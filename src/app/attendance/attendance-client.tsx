"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
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
import type { AttendanceStatus, AttendanceRecord } from "@/types";

interface AttendanceClientProps {
  initialStatus: AttendanceStatus;
  initialHistory: AttendanceRecord[];
}

export default function AttendanceClient({
  initialStatus,
  initialHistory,
}: AttendanceClientProps) {
  const router = useRouter();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [status, setStatus] = useState(initialStatus);
  const [history, setHistory] = useState(initialHistory);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleAttendanceAction = async (type: AttendanceRecord["type"]) => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/attendance/record", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ type }),
      });

      if (!response.ok) {
        throw new Error("Failed to record attendance");
      }

      router.refresh(); // サーバーコンポーネントを再フェッチ
    } catch (error) {
      console.error("Failed to record attendance:", error);
    } finally {
      setIsLoading(false);
    }
  };

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

  const getStatusText = (status: AttendanceStatus["status"]) => {
    switch (status) {
      case "not_started":
        return "未出勤";
      case "working":
        return "勤務中";
      case "on_break":
        return "休憩中";
      case "finished":
        return "退勤済み";
      default:
        return "";
    }
  };

  const getActionText = (type: AttendanceRecord["type"]) => {
    switch (type) {
      case "clock_in":
        return "出勤";
      case "break_start":
        return "休憩開始";
      case "break_end":
        return "休憩終了";
      case "clock_out":
        return "退勤";
      default:
        return "";
    }
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="space-y-4">
          <div className="text-center">
            <p className="text-xl">{formatDateTime(currentTime)}</p>
          </div>

          <div className="text-center">
            <p className="text-lg font-semibold">
              現在の状況: {getStatusText(status.status)}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            <Button
              onClick={() => handleAttendanceAction("clock_in")}
              disabled={isLoading || status.status !== "not_started"}
            >
              出勤
            </Button>
            <Button
              onClick={() => handleAttendanceAction("break_start")}
              disabled={isLoading || status.status !== "working"}
            >
              休憩開始
            </Button>
            <Button
              onClick={() => handleAttendanceAction("break_end")}
              disabled={isLoading || status.status !== "on_break"}
            >
              休憩終了
            </Button>
            <Button
              onClick={() => handleAttendanceAction("clock_out")}
              disabled={isLoading || status.status !== "working"}
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
            {history.map((record) => (
              <TableRow key={record.id}>
                <TableCell>
                  {formatDateTime(new Date(record.timestamp))}
                </TableCell>
                <TableCell>{getActionText(record.type)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
