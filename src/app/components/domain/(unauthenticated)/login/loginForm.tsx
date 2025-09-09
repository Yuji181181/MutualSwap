"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowRight, Users } from "lucide-react";

export default function LoginForm() {
  const handleLogin = () => {
    // ログイン処理をここに実装
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-primary/5 via-background to-secondary/5 p-4">
      <div className="w-full max-w-md">
        {/* Logo Section */}
        <div className="mb-8 text-center">
          <div className="mb-4 inline-flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary">
              <Users className="h-7 w-7 text-primary-foreground" />
            </div>
            <h1 className="font-bold text-2xl text-foreground">
              アンケート共有掲示板
            </h1>
          </div>
          <p className="text-muted-foreground">
            コミュニティでアンケートを共有し、相互回答でポイントを獲得しよう
          </p>
        </div>

        {/* Login Form */}
        <Card className="border-0 bg-card/80 shadow-lg backdrop-blur-sm">
          <CardHeader className="text-center">
            <CardTitle className="text-xl">ログイン</CardTitle>
            <CardDescription>
              アカウントにログインしてアンケートを共有しましょう
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={handleLogin} className="w-full gap-2">
              ログイン
              <ArrowRight className="h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
