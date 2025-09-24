"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useNewSurvey } from "@/hooks/domain/(authenticated)/useNewSurvey";
import { useRouter } from "next/navigation";
import type React from "react";

const NewSurveyPage: React.FC = () => {
  const router = useRouter();
  const {
    form: {
      register,
      handleSubmit,
      formState: { errors },
    },
    handleSubmit: onSubmit,
    submitError,
    isCreating,
  } = useNewSurvey();

  return (
    <main className="container mx-auto px-4 py-8">
      <Card className="mx-auto w-full max-w-2xl">
        <CardHeader>
          <CardTitle>新規投稿</CardTitle>
          <CardDescription>
            アンケートの内容を入力してください。
            <br />
            <span className="text-muted-foreground">
              タイトル・URL・設問数は必須です。
            </span>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            {submitError && (
              <div className="rounded-md border border-destructive/30 bg-destructive/10 p-3 text-destructive text-sm">
                {submitError}
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="title">
                タイトル <span className="text-destructive">*</span>
              </Label>
              <Input
                className="border-black/30"
                id="title"
                placeholder="アンケートのタイトル"
                aria-invalid={!!errors.title}
                {...register("title")}
              />
              <p className="text-muted-foreground text-xs">
                わかりやすいタイトルを入力してください（200文字以内）。
              </p>
              {errors.title && (
                <p className="text-destructive text-sm">
                  {errors.title.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">説明（任意）</Label>
              <Textarea
                id="description"
                rows={6}
                className="min-h-32 border border-black/30 text-base leading-relaxed focus:border-black/50 focus-visible:ring-black/30"
                placeholder="アンケートの目的や内容、回答者への補足などを記載（任意）"
                aria-invalid={!!errors.description}
                {...register("description")}
              />
              {errors.description && (
                <p className="text-destructive text-sm">
                  {errors.description.message as string}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="googleFormUrl">
                GoogleフォームURL <span className="text-destructive">*</span>
              </Label>
              <Input
                className="border-black/30"
                id="googleFormUrl"
                type="url"
                placeholder="https://docs.google.com/forms/..."
                aria-invalid={!!errors.googleFormUrl}
                {...register("googleFormUrl")}
              />
              <p className="text-muted-foreground text-xs">
                フォームの公開リンクを貼り付けてください。
              </p>
              {errors.googleFormUrl && (
                <p className="text-destructive text-sm">
                  {errors.googleFormUrl.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="questionCount">
                設問数 <span className="text-destructive">*</span>
              </Label>
              <Input
                className="border-black/30"
                id="questionCount"
                type="number"
                inputMode="numeric"
                min={1}
                step={1}
                placeholder="例: 10"
                aria-invalid={!!errors.questionCount}
                {...register("questionCount", { valueAsNumber: true })}
              />
              <p className="text-muted-foreground text-xs">
                Googleフォームのアンケートの設問数を入力してください。
              </p>
              {errors.questionCount && (
                <p className="text-destructive text-sm">
                  {errors.questionCount.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="deadline">締切（任意）</Label>
              <Input
                className="border-black/30"
                id="deadline"
                type="datetime-local"
                aria-invalid={!!errors.deadline}
                {...register("deadline", {
                  setValueAs: (v: string) =>
                    typeof v === "string" && v.trim() === "" ? undefined : v,
                })}
              />
              {errors.deadline && (
                <p className="text-destructive text-sm">
                  {errors.deadline.message as string}
                </p>
              )}
            </div>

            <div className="flex justify-end gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
              >
                キャンセル
              </Button>
              <Button type="submit" disabled={isCreating}>
                {isCreating ? "送信中..." : "投稿する"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </main>
  );
};

export default NewSurveyPage;
