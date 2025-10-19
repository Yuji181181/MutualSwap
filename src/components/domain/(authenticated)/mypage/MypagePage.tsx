"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useMypagePage } from "@/hooks/domain/(authenticated)/useMypagePage";
import type React from "react";
import { MypageSurveyCard } from "./MypageSurveyCard";
import { MypageSurveyCardSkeleton } from "./MypageSurveyCardSkeleton";
import { ProfileHeader } from "./ProfileHeader";
import { ProfileHeaderSkeleton } from "./ProfileHeaderSkeleton";

const MypagePage: React.FC = () => {
  const { surveys, user, isLoading, isError, mutate } = useMypagePage();

  const handleDeleteSurvey = async (id: string) => {
    const response = await fetch(`/api/survey/${id}`, {
      method: "DELETE",
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("削除に失敗しました");
    }

    // データを再取得
    await mutate();
  };

  if (isError) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-destructive/5 via-50% via-background to-destructive/10">
        <main className="container mx-auto max-w-4xl px-4 py-8">
          <Card className="border-2 border-destructive/20 bg-card/90 shadow-2xl backdrop-blur-sm">
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
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-accent/5 via-50% via-background to-primary/5">
      <main className="container mx-auto max-w-4xl px-4 py-8">
        <div className="space-y-6">
          {/* プロフィールヘッダー */}
          {isLoading || !user ? (
            <ProfileHeaderSkeleton />
          ) : (
            <ProfileHeader
              user={{
                id: user.id,
                name: user.name,
                grade: user.grade,
                image: user.image,
                totalEarnedPoints: user.totalEarnedPoints,
              }}
              surveyCount={surveys.length}
            />
          )}

          <Separator className="bg-gradient-to-r from-transparent via-border to-transparent" />

          {/* 投稿一覧セクション */}
          <div className="space-y-4">
            <h2 className="bg-gradient-to-r from-primary to-accent bg-clip-text font-semibold text-transparent text-xl">
              投稿
            </h2>
            <div className="grid gap-6">
              {isLoading
                ? [...Array(3)].map((_, index) => (
                    // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                    <MypageSurveyCardSkeleton key={index} />
                  ))
                : surveys.length > 0
                  ? surveys.map((survey) => (
                      <MypageSurveyCard
                        key={survey.id}
                        survey={survey}
                        onDelete={handleDeleteSurvey}
                      />
                    ))
                  : !isLoading && (
                      <Card className="border-2 border-muted border-dashed bg-card/50 backdrop-blur-sm transition-all duration-300 hover:border-primary/30 hover:bg-card/80">
                        <CardContent className="py-12 text-center">
                          <div className="mb-4 text-6xl">📝</div>
                          <CardDescription className="text-base">
                            まだ投稿がありません。最初の投稿を作成しましょう!
                          </CardDescription>
                        </CardContent>
                      </Card>
                    )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MypagePage;
