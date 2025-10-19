"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { authClient } from "@/lib/auth-client";
import { ArrowRight, Users } from "lucide-react";

export default function LoginForm() {
  const handleLogin = async () => {
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/dashboard",
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-primary/10 via-50% via-background to-secondary/10 p-4">
      <div className="w-full max-w-md">
        {/* Logo Section */}
        <div className="mb-8 text-center">
          <div className="mb-6 inline-flex items-center gap-3">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-secondary shadow-2xl shadow-primary/30">
              <Users className="h-9 w-9 text-primary-foreground" />
            </div>
            <h1 className="bg-gradient-to-r from-primary to-secondary bg-clip-text font-bold text-3xl text-transparent">
              アンケート共有掲示板
            </h1>
          </div>
          <p className="text-lg text-muted-foreground leading-relaxed">
            コミュニティでアンケートを共有し、
            <br />
            相互回答でポイントを獲得しよう
          </p>
        </div>

        {/* Login Form */}
        <Card className="border-2 border-primary/10 bg-card/90 shadow-2xl backdrop-blur-sm transition-all duration-300 hover:border-primary/30 hover:shadow-3xl">
          <CardHeader className="text-center">
            <CardTitle className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-2xl text-transparent">
              ログイン
            </CardTitle>
            <CardDescription className="text-base">
              アカウントにログインしてアンケートを共有しましょう
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              onClick={handleLogin}
              className="w-full gap-2 bg-gradient-to-r from-primary to-secondary transition-all duration-300 hover:scale-105 hover:shadow-xl"
            >
              ログイン
              <ArrowRight className="h-4 w-4" />
            </Button>
          </CardContent>
        </Card>

        {/* Features Section */}
        <div className="mt-8 grid grid-cols-3 gap-4 text-center">
          <div className="rounded-xl bg-card/60 p-4 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:bg-card/80">
            <div className="mb-2 text-2xl">📝</div>
            <p className="font-medium text-muted-foreground text-xs">
              アンケート作成
            </p>
          </div>
          <div className="rounded-xl bg-card/60 p-4 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:bg-card/80">
            <div className="mb-2 text-2xl">🎯</div>
            <p className="font-medium text-muted-foreground text-xs">
              回答でポイント獲得
            </p>
          </div>
          <div className="rounded-xl bg-card/60 p-4 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:bg-card/80">
            <div className="mb-2 text-2xl">🚀</div>
            <p className="font-medium text-muted-foreground text-xs">
              掲示板で共有
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
