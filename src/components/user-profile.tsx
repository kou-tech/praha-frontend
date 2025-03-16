"use client";

import { useSession, signOut } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function UserProfile() {
  const { data: session } = useSession();

  if (!session) {
    return <div>ログインしていません</div>;
  }

  return (
    <Card className="max-w-md w-full">
      <CardHeader>
        <CardTitle>ユーザープロフィール</CardTitle>
        <CardDescription>ログイン中のユーザー情報</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16">
            <AvatarImage
              src={session.user?.image || ""}
              alt={session.user?.name || "ユーザー"}
            />
            <AvatarFallback>
              {session.user?.name?.charAt(0) || "U"}
            </AvatarFallback>
          </Avatar>
          <div>
            <h3 className="text-lg font-medium">
              {session.user?.name || "ユーザー"}
            </h3>
            <p className="text-sm text-muted-foreground">
              {session.user?.email}
            </p>
          </div>
        </div>

        <div className="space-y-2">
          <h4 className="text-sm font-medium">ユーザー情報</h4>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="text-muted-foreground">ユーザーID</div>
            <div className="truncate">{session.user?.id}</div>
          </div>
        </div>

        <Button
          variant="destructive"
          onClick={() => signOut({ callbackUrl: "/" })}
          className="w-full"
        >
          ログアウト
        </Button>
      </CardContent>
    </Card>
  );
}
