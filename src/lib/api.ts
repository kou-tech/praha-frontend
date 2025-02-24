import type {
  AttendanceRecord,
  AttendanceStatus,
  LoginResponse,
  ApiResponse,
} from "../types";

const API_BASE = "/api";

export async function login(
  email: string,
  password: string
): Promise<ApiResponse<LoginResponse>> {
  const response = await fetch(`${API_BASE}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
  return response.json();
}

export async function getAttendanceStatus(): Promise<
  ApiResponse<AttendanceStatus>
> {
  const response = await fetch(`${API_BASE}/attendance/status`);
  return response.json();
}

export async function getAttendanceHistory(): Promise<
  ApiResponse<AttendanceRecord[]>
> {
  const response = await fetch(`${API_BASE}/attendance/history`);
  return response.json();
}

export async function recordAttendance(
  type: AttendanceRecord["type"]
): Promise<ApiResponse<AttendanceRecord>> {
  const response = await fetch(`${API_BASE}/attendance/record`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ type }),
  });
  return response.json();
}
