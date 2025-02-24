"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

export default function Header() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
      });

      if (!response.ok) {
        throw new Error("Logout failed");
      }

      router.push("/login");
      router.refresh();
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <header className="border-b">
      <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-xl font-semibold">勤怠管理システム</h1>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleLogout}
          className="text-muted-foreground hover:text-foreground"
        >
          <LogOut className="h-4 w-4 mr-2" />
          ログアウト
        </Button>
      </div>
    </header>
  );
}
