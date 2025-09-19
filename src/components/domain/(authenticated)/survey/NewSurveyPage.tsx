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
import { useRouter } from "next/navigation";
import type React from "react";
import { useCallback, useState } from "react";

import { createSurveyRequestSchema } from "@/schemas/api/create";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

// ISO文字列に正規化
const normalizeDeadlineToISO = (value: unknown): string | undefined => {
  if (typeof value !== "string") return undefined;
  const raw = value.trim();
  if (!raw) return undefined;
  let candidate = raw;
  // 例: 2025/10/31 06:00 -> 2025-10-31T06:00
  if (candidate.includes("/")) {
    candidate = candidate.replaceAll("/", "-");
  }
  if (candidate.includes(" ") && !candidate.includes("T")) {
    candidate = candidate.replace(" ", "T");
  }
  // DateにパースしてISOへ
  const d = new Date(candidate);
  if (!Number.isNaN(d.getTime())) {
    return d.toISOString();
  }
  // 既にISOならそのまま
  if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}(:\d{2}(\.\d{1,3})?)?Z$/.test(raw)) {
    return raw;
  }
  return undefined;
};

const formSchema = createSurveyRequestSchema.extend({
  deadline: z
    .preprocess((v) => normalizeDeadlineToISO(v), z.string().datetime())
    .optional(),
});

type FormValues = z.infer<typeof formSchema>;

const NewSurveyPage: React.FC = () => {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      googleFormUrl: "",
      questionCount: 1,
      deadline: undefined,
    },
  });

  const onSubmit = useCallback(
    async (values: FormValues) => {
      try {
        setSubmitting(true);
        setSubmitError(null);
        const payload: FormValues = {
          ...values,
          // datetime-localをISO に変換
          deadline: values.deadline ?? undefined,
        };
        const res = await fetch("/api/survey", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(payload),
        });
        if (!res.ok) {
          const text = await res.text();
          throw new Error(`Failed: ${res.status} ${text}`);
        }
        const json = (await res.json()) as { data?: { id: string } };
        const id = json?.data?.id;
        if (id) {
          router.push(`/survey/${id}?created=1`);
        } else {
          router.push("/dashboard");
        }
      } catch (e) {
        console.error(e);
        setSubmitError(
          e instanceof Error
            ? e.message
            : "送信中にエラーが発生しました。時間をおいて再度お試しください。",
        );
      } finally {
        setSubmitting(false);
      }
    },
    [router],
  );

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
                  setValueAs: (v) =>
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
              <Button type="submit" disabled={submitting}>
                {submitting ? "送信中..." : "投稿する"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </main>
  );
};

export default NewSurveyPage;
