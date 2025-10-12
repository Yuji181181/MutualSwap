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
      <div className="min-h-screen bg-background">
        <main className="container mx-auto max-w-4xl px-4 py-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-balance text-lg">エラー</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                データの取得に失敗しました。時間をおいて再度お試しください。
              </CardDescription>
            </CardContent>
          </Card>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
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

          <Separator />

          {/* 投稿一覧セクション */}
          <div className="space-y-4">
            <h2 className="font-semibold text-xl">投稿</h2>
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
                      <Card>
                        <CardContent className="py-12 text-center">
                          <CardDescription>
                            まだ投稿がありません。最初の投稿を作成しましょう！
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
