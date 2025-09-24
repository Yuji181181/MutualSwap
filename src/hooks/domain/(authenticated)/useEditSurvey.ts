"use client";

import { HttpError, useCustomizedSWR } from "@/hooks/common/useCustomizedSWR";
import { normalizeDeadlineToISO, toLocalInputValue } from "@/lib/formatter";
import { surveySchema } from "@/schemas/api/read";
import { updateSurveyRequestSchema } from "@/schemas/api/update";
import type { ResBody } from "@/types/api";
import type { Survey } from "@/types/api/survey";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import useSWRMutation from "swr/mutation";
import { z } from "zod";

const formSchema = updateSurveyRequestSchema.extend({
  deadline: z
    .preprocess((v) => normalizeDeadlineToISO(v), z.string().datetime())
    .optional(),
});

type FormValues = z.infer<typeof formSchema>;

// Date復元ロジック
const isIsoDateString = (value: string): boolean => {
  return /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/.test(value);
};

const reviveDates = (input: unknown): unknown => {
  if (Array.isArray(input)) return input.map((i) => reviveDates(i));
  if (input && typeof input === "object") {
    const result: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(input as Record<string, unknown>)) {
      result[k] = reviveDates(v);
    }
    return result;
  }
  if (typeof input === "string" && isIsoDateString(input)) {
    const time = Date.parse(input);
    if (!Number.isNaN(time)) return new Date(time);
  }
  return input;
};

// API更新関数
const putUpdater = async (
  url: string,
  { arg }: { arg: unknown },
): Promise<Survey> => {
  const parsed = updateSurveyRequestSchema.safeParse(arg);
  if (!parsed.success) {
    throw new Error("入力値が不正です。フォームを確認してください。");
  }

  const res = await fetch(url, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(parsed.data),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new HttpError(res.status, res.statusText, url, text);
  }
  const json = (await res.json()) as ResBody<unknown>;
  const revived = reviveDates(json.data);
  const verified = surveySchema.safeParse(revived);
  if (!verified.success) {
    throw new Error("サーバーレスポンスの形式が不正です。");
  }
  return verified.data;
};

export const useEditSurvey = (id: string) => {
  const router = useRouter();

  // データ取得
  const {
    data: survey,
    isLoading,
    isError,
    error,
  } = useCustomizedSWR(`/api/survey/${id}`, surveySchema);

  // データ更新
  const {
    trigger: update,
    isMutating: isUpdating,
    error: updateError,
    data: updated,
    reset: resetMutation,
  } = useSWRMutation<Survey, Error, string, unknown>(
    `/api/survey/${id}`,
    putUpdater,
  );

  const [submitError, setSubmitError] = useState<string | null>(null);

  // フォーム設定
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  // フォーム初期値の生成
  const defaults = useMemo(() => {
    if (!survey) return undefined;
    return {
      title: survey.title,
      description: survey.description ?? "",
      googleFormUrl: survey.googleFormUrl,
      questionCount: survey.questionCount,
      deadline: toLocalInputValue(survey.deadline ?? undefined),
      isActive: survey.isActive,
    } satisfies Partial<FormValues> as FormValues;
  }, [survey]);

  // フォーム初期値の設定
  useEffect(() => {
    if (defaults) form.reset(defaults);
  }, [defaults, form.reset]);

  // 送信処理
  const handleSubmit = useCallback(
    async (values: FormValues) => {
      setSubmitError(null);
      await update({
        ...values,
        deadline:
          typeof values.deadline === "string" && values.deadline.trim() === ""
            ? undefined
            : values.deadline,
      });
    },
    [update],
  );

  // 更新成功時の処理
  useEffect(() => {
    if (updated) {
      router.push(`/survey/${id}?updated=1`);
      resetMutation();
    }
  }, [updated, resetMutation, router, id]);

  // エラー処理
  useEffect(() => {
    if (updateError) setSubmitError(updateError.message);
  }, [updateError]);

  return {
    // フォーム関連
    form,
    handleSubmit,
    submitError,

    // データ取得関連
    survey,
    isLoading,
    isError,
    error,

    // 更新関連
    isUpdating,
  } as const;
};
