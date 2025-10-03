"use client";

import { HttpError } from "@/hooks/common/useCustomizedSWR";
import { reviveDates } from "@/lib/formatter";
import { createSurveyRequestSchema } from "@/schemas/api/create";
import { surveySchema } from "@/schemas/api/read";
import {
  type CreateSurveyFormValues,
  createSurveyFormSchema,
} from "@/schemas/form/survey";
import type { ResBody } from "@/types/api";
import type { Survey } from "@/types/api/survey";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import useSWRMutation from "swr/mutation";

// Survey作成用API関数
const createSurvey = async (
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

export const useNewSurveyPage = () => {
  const router = useRouter();

  // データ作成
  const {
    trigger: create,
    isMutating: isCreating,
    error,
    reset,
  } = useSWRMutation<Survey, Error, string, unknown>(
    "/api/survey",
    createSurvey,
  );

  // フォーム設定
  const form = useForm<CreateSurveyFormValues>({
    resolver: zodResolver(createSurveyFormSchema),
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
    async (values: CreateSurveyFormValues) => {
      try {
        const created = await create({
          ...values,
          deadline: values.deadline ?? undefined,
        });

        // 作成成功時の処理
        const id = created.id;
        if (id) {
          router.push(`/survey/${id}?created=1`);
        } else {
          router.push("/dashboard");
        }
        reset();
      } catch (error) {
        // エラー処理は自動的にSWRのerror状態に反映される
        console.error("Survey creation failed:", error);
      }
    },
    [create, router, reset],
  );

  return {
    form,
    handleSubmit,
    error,
    isCreating,
  } as const;
};
