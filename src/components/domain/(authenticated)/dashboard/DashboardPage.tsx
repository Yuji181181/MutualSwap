"use client";

import { SurveyCard } from "@/components/domain/(authenticated)/dashboard/SurveyCard";
import { SurveyCardSkeleton } from "@/components/domain/(authenticated)/dashboard/SurveyCardSkeleton";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useDashboardPage } from "@/hooks/domain/(authenticated)/dashboard/useDashboardPage";
import { authClient } from "@/lib/auth-client";
import type React from "react";

const DashboardPage: React.FC = () => {
  const { surveys, isLoading, isError } = useDashboardPage();
  const { data: session } = authClient.useSession();
  const currentUserId = session?.user?.id;

  if (isError) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-destructive/5 via-50% via-background to-destructive/10">
        <main className="container mx-auto px-4 py-8">
          <div className="mt-6 flex items-center justify-center">
            <Card className="max-w-md border-2 border-destructive/20 bg-card/90 shadow-2xl backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-balance text-destructive text-lg">
                  <span className="text-2xl">⚠️</span>
                  エラーが発生しました
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  データの取得に失敗しました。時間をおいて再度お試しください。
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-50% via-background to-secondary/10">
      <main className="container mx-auto px-4 py-8">
        <div className="space-y-6">
          {/* Hero Section */}
          <div className="mb-8 text-center">
            <h2 className="mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text font-bold text-4xl text-transparent">
              アンケート一覧
            </h2>
            <p className="text-muted-foreground">
              気になるアンケートに回答してポイントを獲得しましょう
            </p>
          </div>

          <div className="grid gap-6">
            {isLoading
              ? [...Array(4)].map((_, index) => (
                  // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                  <SurveyCardSkeleton key={index} />
                ))
              : surveys.map((survey) => (
                  <SurveyCard
                    key={survey.id}
                    survey={survey}
                    currentUserId={currentUserId}
                  />
                ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
