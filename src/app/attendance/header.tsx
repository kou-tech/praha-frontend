"use client";

import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { logout } from "@/app/login/actions";

export default function Header() {
  return (
    <header className="border-b">
      <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-xl font-semibold">勤怠管理システム</h1>
        <Button
          variant="ghost"
          size="sm"
          onClick={logout}
          className="text-muted-foreground hover:text-foreground"
        >
          <LogOut className="h-4 w-4 mr-2" />
          ログアウト
        </Button>
      </div>
    </header>
  );
}
