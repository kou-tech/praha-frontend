import { http, HttpResponse } from "msw";
import type { AttendanceStatus, AttendanceRecord } from "../types";

const currentStatus: AttendanceStatus = {
  status: "not_started",
  lastAction: null,
};

const attendanceHistory: AttendanceRecord[] = [];

export const handlers = [
  http.post("/api/login", async ({ request }) => {
    const { email, password } = await request.json();

    if (email === "test@example.com" && password === "password") {
      return HttpResponse.json({ data: { token: "dummy-token" } });
    }

    return HttpResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }),

  http.get("/api/attendance/status", () => {
    return HttpResponse.json({ data: currentStatus });
  }),

  http.get("/api/attendance/history", () => {
    return HttpResponse.json({ data: attendanceHistory });
  }),

  http.post("/api/attendance/record", async ({ request }) => {
    const { type } = await request.json();
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

    return HttpResponse.json({ data: record });
  }),
];
