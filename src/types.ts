export type AttendanceRecord = {
  id: string;
  type: "clock_in" | "break_start" | "break_end" | "clock_out";
  timestamp: string;
};

export type AttendanceStatus = {
  status: "not_started" | "working" | "on_break" | "finished";
  lastAction: AttendanceRecord | null;
};

export type LoginResponse = {
  token: string;
};

export type ApiResponse<T> = {
  data: T;
  error?: string;
};
