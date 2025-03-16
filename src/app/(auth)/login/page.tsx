"use client";

import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FcGoogle } from "react-icons/fc";

export default function LoginPage() {
  return (
    <>
      <div className="flex min-h-[calc(100vh-64px)] items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl">ログイン</CardTitle>
            <CardDescription>
              Googleアカウントでログインしてください
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button
              variant="outline"
              className="w-full"
              onClick={() => signIn("google", { callbackUrl: "/attendance" })}
            >
              <FcGoogle className="mr-2 h-4 w-4" />
              Googleでログイン
            </Button>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
