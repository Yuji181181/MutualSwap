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
            アンケート共有掲示板
          </h1>
          <p className="mx-auto max-w-2xl text-muted-foreground text-xl leading-relaxed">
            コミュニティでアンケートを共有し、相互回答でポイントを獲得。
            <br />
            より多くの回答を集めるための新しいプラットフォーム。
          </p>
        </div>

        {/* How It Works Section */}
        <div className="mb-16">
          <h2 className="mb-12 text-center font-bold text-3xl text-foreground">
            使い方はシンプル
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
                    STEP 1
                  </span>
                  <h3 className="font-bold text-2xl text-foreground">
                    アンケートを投稿
                  </h3>
                </div>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Google
                  Formで作成したアンケートのリンクを掲示板に投稿しましょう。
                  <br />
                  タイトルや説明を追加して、回答者に内容を伝えます。
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="rounded-lg bg-muted px-3 py-1.5 text-muted-foreground text-sm">
                    📝 Google Formのリンクを貼る
                  </span>
                  <span className="rounded-lg bg-muted px-3 py-1.5 text-muted-foreground text-sm">
                    ⏱️ 回答期限を設定
                  </span>
                </div>
              </div>
            </div>

            <Separator className="my-8" />

            {/* Step 2 */}
            <div className="flex gap-6">
              <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-secondary/20 to-secondary/10">
                <MessageSquare className="h-8 w-8 text-secondary" />
              </div>
              <div className="flex-1">
                <div className="mb-2 flex items-center gap-3">
                  <span className="rounded-full bg-secondary/10 px-3 py-1 font-bold text-secondary text-sm">
                    STEP 2
                  </span>
                  <h3 className="font-bold text-2xl text-foreground">
                    他のアンケートに回答
                  </h3>
                </div>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  掲示板に投稿されている他のユーザーのアンケートに回答しましょう。
                  <br />
                  回答することでポイントを獲得できます。
                </p>
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

            {/* Step 3 */}
            <div className="flex gap-6">
              <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-accent/20 to-accent/10">
                <Coins className="h-8 w-8 text-accent" />
              </div>
              <div className="flex-1">
                <div className="mb-2 flex items-center gap-3">
                  <span className="rounded-full bg-accent/10 px-3 py-1 font-bold text-accent text-sm">
                    STEP 3
                  </span>
                  <h3 className="font-bold text-2xl text-foreground">
                    ポイントで公開
                  </h3>
                </div>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  獲得したポイントを使って、自分のアンケートを公開状態にします。
                  <br />
                  公開されたアンケートは掲示板のトップに表示されます。
                </p>
                <div className="mt-4 rounded-lg border-2 border-accent/20 bg-accent/5 p-4">
                  <div className="flex items-start gap-3">
                    <Sparkles className="mt-1 h-5 w-5 flex-shrink-0 text-accent" />
                    <div>
                      <p className="font-semibold text-foreground text-sm">
                        ポイント制度について
                      </p>
                      <p className="mt-1 text-muted-foreground text-sm">
                        所有ポイント数によって、アンケートの公開状態が自動的に変わります。
                        より多くのアンケートに回答して、自分のアンケートを多くの人に見てもらいましょう！
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Separator className="my-8" />

            {/* Step 4 */}
            <div className="flex gap-6">
              <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20">
                <CheckCircle2 className="h-8 w-8 text-primary" />
              </div>
              <div className="flex-1">
                <div className="mb-2 flex items-center gap-3">
                  <span className="rounded-full bg-gradient-to-r from-primary/10 to-secondary/10 px-3 py-1 font-bold text-primary text-sm">
                    STEP 4
                  </span>
                  <h3 className="font-bold text-2xl text-foreground">
                    回答を集める
                  </h3>
                </div>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  公開されたアンケートは、コミュニティのみんなが回答してくれます。
                  <br />
                  より多くの回答を集めて、質の高いデータを収集しましょう。
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="rounded-lg bg-muted px-3 py-1.5 text-muted-foreground text-sm">
                    📊 回答数をリアルタイムで確認
                  </span>
                  <span className="rounded-lg bg-muted px-3 py-1.5 text-muted-foreground text-sm">
                    🔄 相互に助け合うコミュニティ
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="mb-16">
          <h2 className="mb-8 text-center font-bold text-3xl text-foreground">
            このプラットフォームの特徴
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="text-center">
              <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
                <span className="text-3xl">🤝</span>
              </div>
              <h3 className="mb-2 font-semibold text-foreground text-lg">
                相互扶助の仕組み
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                お互いにアンケートに答え合うことで、全員が必要な回答数を集められます
              </p>
            </div>
            <div className="text-center">
              <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-secondary/10">
                <span className="text-3xl">⚡</span>
              </div>
              <h3 className="mb-2 font-semibold text-foreground text-lg">
                素早い回答収集
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                アクティブなコミュニティで、短時間で多くの回答を集めることができます
              </p>
            </div>
            <div className="text-center">
              <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-accent/10">
                <span className="text-3xl">🎯</span>
              </div>
              <h3 className="mb-2 font-semibold text-foreground text-lg">
                公平なシステム
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                ポイント制度により、貢献度に応じた公平な機会が得られます
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mb-8 text-center">
          <div className="mx-auto max-w-2xl rounded-3xl border-2 border-primary/20 bg-gradient-to-br from-primary/10 via-background to-secondary/10 p-8 shadow-xl backdrop-blur-sm">
            <h2 className="mb-4 font-bold text-3xl text-foreground">
              さあ、始めましょう
            </h2>
            <p className="mb-6 text-lg text-muted-foreground">
              Googleアカウントでログインして、
              <br />
              今すぐアンケート共有を始めましょう
            </p>
            <Button
              onClick={handleLogin}
              size="lg"
              className="gap-2 bg-gradient-to-r from-primary to-secondary px-8 py-6 font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            >
              <Users className="h-5 w-5" />
              Googleでログイン
              <ArrowRight className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-muted-foreground text-sm">
          <p>アカウント作成は無料です。今すぐ始めましょう！</p>
        </div>
      </div>
    </div>
  );
}
