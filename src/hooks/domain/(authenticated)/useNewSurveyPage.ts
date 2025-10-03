"use client";

import { createSurvey } from "@/lib/api/survey";
import {
  type CreateSurveyFormValues,
  createSurveyFormSchema,
} from "@/schemas/form/survey";
import type { Survey } from "@/types/api/survey";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import useSWRMutation from "swr/mutation";

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
