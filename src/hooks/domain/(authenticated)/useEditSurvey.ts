"use client";

import { useCustomizedSWR } from "@/hooks/common/useCustomizedSWR";
import { deleteSurvey, updateSurvey } from "@/lib/api/survey";
import { toLocalInputValue } from "@/lib/formatter";
import { surveySchema } from "@/schemas/api/read";
import {
  type UpdateSurveyFormValues,
  updateSurveyFormSchema,
} from "@/schemas/form/survey";
import type { Survey } from "@/types/api/survey";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import useSWRMutation from "swr/mutation";

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
    reset: resetMutation,
  } = useSWRMutation<Survey, Error, string, unknown>(
    `/api/survey/${id}`,
    updateSurvey,
  );

  // データ削除
  const {
    trigger: remove,
    isMutating: isDeleting,
    error: deleteError,
  } = useSWRMutation(`/api/survey/${id}`, async (url: string) =>
    deleteSurvey(url),
  );

  // フォーム設定
  const form = useForm<UpdateSurveyFormValues>({
    resolver: zodResolver(updateSurveyFormSchema),
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
    } satisfies Partial<UpdateSurveyFormValues> as UpdateSurveyFormValues;
  }, [survey]);

  // フォーム初期値の設定
  useEffect(() => {
    if (defaults) form.reset(defaults);
  }, [defaults, form.reset]);

  // 送信処理
  const handleSubmit = useCallback(
    async (values: UpdateSurveyFormValues) => {
      try {
        await update({
          ...values,
          deadline:
            typeof values.deadline === "string" && values.deadline.trim() === ""
              ? undefined
              : values.deadline,
        });

        // 更新成功時の処理
        router.push(`/survey/${id}?updated=1`);
        resetMutation();
      } catch (error) {
        // エラー処理は自動的にSWRのerror状態に反映される
        console.error("Survey update failed:", error);
      }
    },
    [update, router, id, resetMutation],
  );

  const handleDelete = useCallback(async () => {
    try {
      await remove();
      router.push(`/dashboard?deleted=${id}`);
    } catch (error) {
      console.error("Survey delete failed:", error);
    }
  }, [remove, router, id]);

  return {
    // フォーム関連
    form,
    handleSubmit,

    // データ取得関連
    survey,
    isLoading,
    isError,
    error,

    // 更新関連
    isUpdating,
    updateError,
    // 削除関連
    handleDelete,
    isDeleting,
    deleteError,
  } as const;
};
