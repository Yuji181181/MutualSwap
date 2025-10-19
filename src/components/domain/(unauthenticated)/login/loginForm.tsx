"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { authClient } from "@/lib/auth-client";
import {
  ArrowRight,
  CheckCircle2,
  Coins,
  FileText,
  MessageSquare,
  Sparkles,
  Users,
} from "lucide-react";

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
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <div className="container mx-auto max-w-4xl px-4 py-12">
        {/* Hero Section */}
        <div className="mb-16 text-center">
          <div className="mb-6 inline-flex items-center justify-center gap-4">
            <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-primary to-secondary shadow-2xl shadow-primary/30">
              <Users className="h-11 w-11 text-primary-foreground" />
            </div>
          </div>
          <h1 className="mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text font-bold text-5xl text-transparent">
            MutualSwap
          </h1>
          <p className="mx-auto max-w-2xl text-muted-foreground text-xl leading-relaxed">
            Google Formで作成したアンケートを共有する掲示板
            <br />
            相互にアンケートを回答し合うことができる新しいプラットフォーム
          </p>
          <Button
            onClick={handleLogin}
            size="lg"
            className="mt-8 gap-2 bg-gradient-to-r from-primary to-secondary px-8 py-6 font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl"
          >
            <Users className="h-5 w-5" />
            Googleでログイン
            <ArrowRight className="h-5 w-5" />
          </Button>
        </div>

        {/* How It Works Section */}
        <div className="mb-16">
          <h2 className="mb-12 text-center font-bold text-3xl text-foreground">
            使い方
          </h2>

          <div className="space-y-12">
            {/* Step 1 */}
            <div className="flex gap-6">
              <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10">
                <FileText className="h-8 w-8 text-primary" />
              </div>
              <div className="flex-1">
                <div className="mb-2 flex items-center gap-3">
                  <span className="rounded-full bg-primary/10 px-3 py-1 font-bold text-primary text-sm">
                    1
                  </span>
                  <h3 className="font-bold text-2xl text-foreground">
                    アンケートを投稿
                  </h3>
                </div>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Google
                  Formで作成したアンケートのリンクを掲示板に投稿しましょう。
                  <br />
                  アンケートの投稿にポイントは不要です。
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="rounded-lg bg-muted px-3 py-1.5 text-muted-foreground text-sm">
                    📝 作成したGoogle FormのURLを貼る
                  </span>
                  <span className="rounded-lg bg-muted px-3 py-1.5 text-muted-foreground text-sm">
                    ⏱️ 設問数、回答期限を設定
                  </span>
                </div>
              </div>
            </div>

            <Separator className="my-8" />

            {/* Step 2 */}
            <div className="flex gap-6">
              <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20">
                <CheckCircle2 className="h-8 w-8 text-primary" />
              </div>
              <div className="flex-1">
                <div className="mb-2 flex items-center gap-3">
                  <span className="rounded-full bg-gradient-to-r from-primary/10 to-secondary/10 px-3 py-1 font-bold text-primary text-sm">
                    2
                  </span>
                  <h3 className="font-bold text-2xl text-foreground">
                    他のユーザーに回答してもらう
                  </h3>
                </div>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  <br />
                  投稿したアンケートは掲示板に表示され、他のユーザーが回答できます。
                  <br />
                  他のユーザーに回答をしてもらうと、投稿者のポイントが1ポイント減ります。
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="rounded-lg bg-muted px-3 py-1.5 text-muted-foreground text-sm">
                    📊
                    投稿者は他ユーザーに回答してもらうことで自分のポイントを消費します。
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        {/* Step 3 */}
        <div className="flex gap-6">
          <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-secondary/20 to-secondary/10">
            <MessageSquare className="h-8 w-8 text-secondary" />
          </div>
          <div className="flex-1">
            <div className="mb-2 flex items-center gap-3">
              <span className="rounded-full bg-secondary/10 px-3 py-1 font-bold text-secondary text-sm">
                3
              </span>
              <h3 className="font-bold text-2xl text-foreground">
                他のユーザーのアンケートに回答し、ポイント獲得する
              </h3>
            </div>
            <p className="text-lg text-muted-foreground leading-relaxed">
              掲示板に投稿されている他のユーザーのアンケートに回答しましょう。
              <br />
              回答するアンケートの設問数に応じたポイントを獲得できます。
            </p>
            <div className="mt-4 rounded-lg border-2 border-secondary/20 bg-secondary/10 p-4">
              <div className="flex items-start gap-3">
                <Sparkles className="mt-1 h-5 w-5 flex-shrink-0 text-secondary" />
                <div>
                  <p className="font-semibold text-foreground text-sm">
                    獲得できるポイントについて
                  </p>
                  <p className="mt-1 text-muted-foreground text-sm">
                    設問数1~5：2ポイント
                    <br />
                    設問数6~10：3ポイント
                    <br />
                    設問数11~：4ポイント
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="rounded-lg bg-muted px-3 py-1.5 text-muted-foreground text-sm">
                🎯 興味のあるアンケートを選ぶ
              </span>
              <span className="rounded-lg bg-muted px-3 py-1.5 text-muted-foreground text-sm">
                ✅ 回答してポイント獲得
              </span>
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        {/* Step 4 */}
        <div className="flex gap-6">
          <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-accent/20 to-accent/10">
            <Coins className="h-8 w-8 text-accent" />
          </div>
          <div className="flex-1">
            <div className="mb-2 flex items-center gap-3">
              <span className="rounded-full bg-accent/10 px-3 py-1 font-bold text-accent text-sm">
                4
              </span>
              <h3 className="font-bold text-2xl text-foreground">
                ポイントを獲得し続け、アンケートを公開状態に保つ
              </h3>
            </div>
            <p className="text-lg text-muted-foreground leading-relaxed">
              所有ポイント数が0ポイントの場合、投稿したアンケートは非公開状態になります。
              <br />
              他のユーザーに自分のアンケートを回答してもらうためにも、積極的に他のユーザーのアンケートに回答してポイントを獲得しましょう。
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="rounded-lg bg-muted px-3 py-1.5 text-muted-foreground text-sm">
                🔄 相互に回答し合う
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
