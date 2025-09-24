"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { HttpError } from "@/hooks/common/useCustomizedSWR";
import { useEditSurvey } from "@/hooks/domain/(authenticated)/useEditSurvey";
import type { EditSurveyPageProps } from "@/types/components";
import { useRouter } from "next/navigation";
import type React from "react";

export const EditSurveyPage: React.FC<EditSurveyPageProps> = (props) => {
  const router = useRouter();
  const {
    form,
    handleSubmit: onSubmit,
    submitError,
    survey,
    isLoading,
    isError,
    error,
    isUpdating,
  } = useEditSurvey(props.id);

  if (isError) {
    return (
      <main className="container mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-balance text-lg">エラー</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              {(() => {
                const status =
                  error instanceof HttpError ? error.status : undefined;
                if (status === 404) return "対象の投稿が見つかりません。";
                if (status === 403)
                  return "この投稿を編集する権限がありません。";
                if (status === 401) return "ログインが必要です。";
                return "データの取得に失敗しました。時間をおいて再度お試しください。";
              })()}
            </CardDescription>
          </CardContent>
        </Card>
      </main>
    );
  }

  if (isLoading || !survey) {
    return (
      <main className="container mx-auto px-4 py-8">
        <Card className="mx-auto w-full max-w-2xl">
          <CardHeader>
            <CardTitle>読み込み中...</CardTitle>
            <CardDescription>編集フォームを準備しています。</CardDescription>
          </CardHeader>
        </Card>
      </main>
    );
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <Card className="mx-auto w-full max-w-2xl">
        <CardHeader>
          <CardTitle>投稿を編集</CardTitle>
          <CardDescription>内容を更新して保存してください。</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
              {submitError && (
                <div className="rounded-md border border-destructive/30 bg-destructive/10 p-3 text-destructive text-sm">
                  {submitError}
                </div>
              )}

              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>タイトル</FormLabel>
                    <FormControl>
                      <Input className="border-black/30" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>説明（任意）</FormLabel>
                    <FormControl>
                      <Textarea
                        rows={6}
                        className="min-h-32 border border-black/30 text-base leading-relaxed focus:border-black/50 focus-visible:ring-black/30"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="googleFormUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>GoogleフォームURL</FormLabel>
                    <FormControl>
                      <Input
                        className="border-black/30"
                        type="url"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="questionCount"
                render={({ field: { value, onChange, ...field } }) => (
                  <FormItem>
                    <FormLabel>設問数</FormLabel>
                    <FormControl>
                      <Input
                        className="border-black/30"
                        type="number"
                        inputMode="numeric"
                        min={1}
                        step={1}
                        value={value || ""}
                        onChange={(e) => onChange(Number(e.target.value) || 0)}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="deadline"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>締切（任意）</FormLabel>
                    <FormControl>
                      <Input
                        className="border-black/30"
                        type="datetime-local"
                        {...field}
                        value={field.value || ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.back()}
                >
                  キャンセル
                </Button>
                <Button type="submit" disabled={isUpdating}>
                  {isUpdating ? "保存中..." : "保存する"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </main>
  );
};

export default EditSurveyPage;
