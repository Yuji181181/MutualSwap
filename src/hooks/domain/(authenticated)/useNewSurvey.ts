"use client";

import { HttpError } from "@/hooks/common/useCustomizedSWR";
import { normalizeDeadlineToISO, reviveDates } from "@/lib/formatter";
import { createSurveyRequestSchema } from "@/schemas/api/create";
import { surveySchema } from "@/schemas/api/read";
import type { ResBody } from "@/types/api";
import type { Survey } from "@/types/api/survey";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useSWRMutation from "swr/mutation";
import { z } from "zod";

const formSchema = createSurveyRequestSchema.extend({
  deadline: z
    .preprocess((v) => normalizeDeadlineToISO(v), z.string().datetime())
    .optional(),
});

type FormValues = z.infer<typeof formSchema>;

// API作成関数
const postCreator = async (
  url: string,
  { arg }: { arg: unknown },
): Promise<Survey> => {
  const parsed = createSurveyRequestSchema.safeParse(arg);
  if (!parsed.success) {
    throw new Error("入力値が不正です。フォームを確認してください。");
  }

  const res = await fetch(url, {
    method: "POST",
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

export const useNewSurvey = () => {
  const router = useRouter();

  // データ作成
  const {
    trigger: create,
    isMutating: isCreating,
    error,
    data: created,
    reset,
  } = useSWRMutation<Survey, Error, string, unknown>(
    "/api/survey",
    postCreator,
  );

  const [submitError, setSubmitError] = useState<string | null>(null);

  // フォーム設定
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      googleFormUrl: "",
      questionCount: 1,
      deadline: undefined,
    },
  });

  // 送信処理
  const handleSubmit = useCallback(
    async (values: FormValues) => {
      setSubmitError(null);
      await create({
        ...values,
        deadline: values.deadline ?? undefined,
      });
    },
    [create],
  );

  // 作成成功時の処理
  useEffect(() => {
    if (!created) return;
    const id = created.id;
    if (id) {
      router.push(`/survey/${id}?created=1`);
    } else {
      router.push("/dashboard");
    }
    reset();
  }, [created, reset, router]);

  // エラー処理
  useEffect(() => {
    if (error) setSubmitError(error.message);
  }, [error]);

  return {
    form,
    handleSubmit,
    submitError,
    isCreating,
  } as const;
};
