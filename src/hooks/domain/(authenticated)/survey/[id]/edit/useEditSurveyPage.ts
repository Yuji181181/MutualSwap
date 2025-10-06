"use client";

import { HttpError, useCustomizedSWR } from "@/hooks/common/useCustomizedSWR";
import { reviveDates, toLocalInputValue } from "@/lib/formatter";
import { deleteSurveyResponseSchema } from "@/schemas/api/deleteSurvey";
import { surveySchema } from "@/schemas/api/read";
import { updateSurveyRequestSchema } from "@/schemas/api/update";
import {
  type UpdateSurveyFormValues,
  updateSurveyFormSchema,
} from "@/schemas/form/survey";
import type { ResBody } from "@/types/api";
import type { DeleteSurveyResponse, Survey } from "@/types/api/survey";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import useSWRMutation from "swr/mutation";

// Survey更新用API関数
const updateSurvey = async (
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

// Survey 削除用API関数
const deleteSurvey = async (url: string): Promise<DeleteSurveyResponse> => {
  const res = await fetch(url, {
    method: "DELETE",
    credentials: "include",
  });
  if (!res.ok) {
    const text = await res.text();
    throw new HttpError(res.status, res.statusText, url, text);
  }
  const json = (await res.json()) as ResBody<unknown>;
  const revived = reviveDates(json.data);
  const verified = deleteSurveyResponseSchema.safeParse(revived);
  if (!verified.success) {
    throw new Error("サーバーレスポンスの形式が不正です。");
  }
  return verified.data;
};

export const useEditSurveyPage = (id: string) => {
  const router = useRouter();
  // 削除実行後（リダイレクト待ち）であることを示すフラグ。
  // これがtrueの間は404などのエラー表示を抑制してフラッシュを防ぐ。
  const [hasDeleted, setHasDeleted] = useState(false);

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

  // フォーム設定
  const form = useForm<UpdateSurveyFormValues>({
    resolver: zodResolver(updateSurveyFormSchema),
    values: defaults,
  });

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
      // 先にフラグを立てて以後の再検証による404エラー描画を抑制
      setHasDeleted(true);
      await remove();
      router.push(`/dashboard?deleted=${id}`);
    } catch (error) {
      console.error("Survey delete failed:", error);
      // 失敗したらフラグを戻す（再度操作できるように）
      setHasDeleted(false);
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
    hasDeleted,
  } as const;
};
