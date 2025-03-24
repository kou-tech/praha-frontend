import { Card } from "@/components/ui/card";
import { login, signup } from "./actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
      <Card className="w-full max-w-md p-6 space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">勤怠管理システム</h1>
          <p className="text-muted-foreground">
            メールアドレスとパスワードでログイン
          </p>
        </div>
        <form className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">メールアドレス</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="your@email.com"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">パスワード</Label>
            <Input id="password" name="password" type="password" required />
          </div>
          <div className="space-y-2 flex justify-between">
            <Button type="submit" formAction={login}>
              ログイン
            </Button>
            <Button formAction={signup}>サインアップ</Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
