import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await auth();

  if (session) {
    redirect("/attendance");
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold">勤怠管理システム</h1>
      <p className="mt-3 text-2xl">ようこそ</p>
    </main>
  );
}
