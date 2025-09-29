"use client";

import { NewSurveySkeleton } from "@/components/domain/(authenticated)/survey/NewSurveySkeleton";
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
import { useNewSurvey } from "@/hooks/domain/(authenticated)/useNewSurvey";
import { useRouter } from "next/navigation";
import type React from "react";

const NewSurveyPage: React.FC = () => {
  const router = useRouter();
  const {
    form,
    handleSubmit: onSubmit,
    error: submitError,
    isCreating,
  } = useNewSurvey();

  if (isCreating) {
    return (
      <main className="container mx-auto px-4 py-8">
        <NewSurveySkeleton />
      </main>
    );
  }

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
          <Form {...form}>
            <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
              {submitError && (
                <div className="rounded-md border border-destructive/30 bg-destructive/10 p-3 text-destructive text-sm">
                  {submitError.message}
                </div>
              )}
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      タイトル <span className="text-destructive">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="border-black/30"
                        placeholder="アンケートのタイトル"
                        {...field}
                      />
                    </FormControl>
                    <p className="text-muted-foreground text-xs">
                      わかりやすいタイトルを入力してください（200文字以内）。
                    </p>
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
                        placeholder="アンケートの目的や内容、回答者への補足などを記載（任意）"
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
                    <FormLabel>
                      GoogleフォームURL{" "}
                      <span className="text-destructive">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="border-black/30"
                        type="url"
                        placeholder="https://docs.google.com/forms/..."
                        {...field}
                      />
                    </FormControl>
                    <p className="text-muted-foreground text-xs">
                      フォームの公開リンクを貼り付けてください。
                    </p>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="questionCount"
                render={({ field: { value, onChange, ...field } }) => (
                  <FormItem>
                    <FormLabel>
                      設問数 <span className="text-destructive">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="border-black/30"
                        type="number"
                        inputMode="numeric"
                        min={1}
                        step={1}
                        placeholder="例: 10"
                        value={value || ""}
                        onChange={(e) => onChange(Number(e.target.value) || 0)}
                        {...field}
                      />
                    </FormControl>
                    <p className="text-muted-foreground text-xs">
                      Googleフォームのアンケートの設問数を入力してください。
                    </p>
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
                <Button type="submit" disabled={isCreating}>
                  {isCreating ? "送信中..." : "投稿する"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </main>
  );
};

export default NewSurveyPage;
