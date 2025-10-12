"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useSurveyAnswerPage } from "@/hooks/domain/(authenticated)/survey/[id]/answer/useSurveyAnswerPage";
import type React from "react";

interface SurveyAnswerPageProps {
  surveyId: string;
}

const SurveyAnswerPage: React.FC<SurveyAnswerPageProps> = (props) => {
  const {
    survey,
    hasAnswered,
    isLoading,
    isError,
    isSubmitting,
    handleComplete,
    handleReopenForm,
    handleCancel,
  } = useSurveyAnswerPage({
    id: props.surveyId,
  });

  if (isError) {
    return (
      <div className="min-h-screen bg-background">
        <main className="container mx-auto max-w-2xl px-4 py-8">
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

  if (isLoading || !survey) {
    return (
      <div className="min-h-screen bg-background">
        <main className="container mx-auto max-w-2xl px-4 py-8">
          <Card>
            <CardHeader>
              <Skeleton className="h-8 w-3/4" />
              <Skeleton className="mt-2 h-4 w-full" />
            </CardHeader>
            <CardContent className="space-y-4">
              <Skeleton className="h-24 w-full" />
              <div className="flex gap-3">
                <Skeleton className="h-10 flex-1" />
                <Skeleton className="h-10 flex-1" />
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    );
  }

  if (hasAnswered) {
    return (
      <div className="min-h-screen bg-background">
        <main className="container mx-auto max-w-2xl px-4 py-8">
          <Card>
            <CardHeader>
              <CardTitle>既に回答済みです</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <CardDescription>
                このアンケートには既に回答済みです。
              </CardDescription>
              <Button onClick={handleCancel}>ダッシュボードに戻る</Button>
            </CardContent>
          </Card>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto max-w-2xl px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-balance">{survey.title}</CardTitle>
            <CardDescription>
              別タブでGoogleフォームが開きます。回答後、下のボタンを押してください。
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="rounded-lg border bg-muted/50 p-4">
              <div className="space-y-2">
                <p className="font-medium text-sm">回答方法</p>
                <ol className="list-decimal space-y-1 pl-5 text-muted-foreground text-sm">
                  <li>別タブで開いたGoogleフォームに回答してください</li>
                  <li>回答が完了したら、このページに戻ってきてください</li>
                  <li>
                    下の「回答完了」ボタンを押すと{survey.questionCount}
                    ポイント獲得できます
                  </li>
                </ol>
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Button
                onClick={handleComplete}
                disabled={isSubmitting}
                className="flex-1"
              >
                {isSubmitting ? "送信中..." : "回答完了"}
              </Button>
              <Button
                variant="outline"
                onClick={handleReopenForm}
                className="flex-1"
              >
                フォームを再度開く
              </Button>
              <Button
                variant="ghost"
                onClick={handleCancel}
                disabled={isSubmitting}
              >
                キャンセル
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default SurveyAnswerPage;
