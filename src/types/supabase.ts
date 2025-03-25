export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type AttendanceActionType =
  | "clock_in"
  | "break_start"
  | "break_end"
  | "clock_out";

export interface Database {
  public: {
    Tables: {
      attendance: {
        Row: {
          attendance_id: string;
          auth_id: string;
          action: AttendanceActionType;
          timestamp: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          attendance_id?: string;
          auth_id: string;
          action: AttendanceActionType;
          timestamp?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          attendance_id?: string;
          auth_id?: string;
          action?: AttendanceActionType;
          timestamp?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
  };
}

export type Attendance = Database["public"]["Tables"]["attendance"]["Row"];
export type AttendanceAction = Attendance["action"];
