import { Suspense } from "react";
import {
  getAttendanceStatus,
  getAttendanceHistory,
} from "./attendance-actions";
import AttendanceClient from "./attendance-client";
import Header from "./header";
import Loading from "./loading";

export default async function AttendancePage() {
  // Server Componentで初期データを取得
  const status = await getAttendanceStatus();
  const history = await getAttendanceHistory();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      <main className="p-4">
        <div className="max-w-4xl mx-auto">
          <Suspense fallback={<Loading />}>
            <AttendanceClient initialStatus={status} initialHistory={history} />
          </Suspense>
        </div>
      </main>
    </div>
  );
}
