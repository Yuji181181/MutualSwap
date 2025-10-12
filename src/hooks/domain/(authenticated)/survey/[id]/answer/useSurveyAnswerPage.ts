"use client";

import { useCustomizedSWR } from "@/hooks/common/useCustomizedSWR";
import { surveySchema } from "@/schemas/api/read";
import { surveyAnswerStatusSchema } from "@/schemas/api/surveyAnswer";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export const useSurveyAnswerPage = (props: { id: string }) => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const hasOpenedFormRef = useRef(false);

  // アンケート情報を取得
  const {
    data: survey,
    isLoading: isSurveyLoading,
    isError: isSurveyError,
  } = useCustomizedSWR(`/api/survey/${props.id}`, surveySchema);

  // 回答済みかチェック
  const {
    data: answerStatus,
    isLoading: isStatusLoading,
    isError: isStatusError,
    mutate: mutateStatus,
  } = useCustomizedSWR(
    `/api/survey/${props.id}/answer`,
    surveyAnswerStatusSchema,
  );

  const hasAnswered = answerStatus?.hasAnswered ?? false;
  const isLoading = isSurveyLoading || isStatusLoading;

  // Googleフォームを別タブで開く（1回だけ、開発モードでも1回のみ）
  useEffect(() => {
    if (survey && !hasOpenedFormRef.current && !isLoading && !hasAnswered) {
      window.open(survey.googleFormUrl, "_blank");
      hasOpenedFormRef.current = true;
    }
  }, [survey, isLoading, hasAnswered]);

  // 回答完了処理
  const handleComplete = async () => {
    setIsSubmitting(true);

    try {
      const response = await fetch(`/api/survey/${props.id}/answer`, {
        method: "POST",
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        alert(
          `${data.message}\n${data.data.pointsEarned}ポイント獲得しました！`,
        );
        router.push("/dashboard");
      } else if (response.status === 409) {
        alert("既に回答済みです");
        router.push("/dashboard");
      } else {
        alert("エラーが発生しました");
      }
    } catch (error) {
      console.error("Failed to submit answer", error);
      alert("エラーが発生しました");
    } finally {
      setIsSubmitting(false);
    }
  };

  // フォームを再度開く
  const handleReopenForm = () => {
    if (survey) {
      window.open(survey.googleFormUrl, "_blank");
    }
  };

  // キャンセル
  const handleCancel = () => {
    router.back();
  };

  return {
    survey,
    hasAnswered,
    isLoading: isSurveyLoading || isStatusLoading,
    isError: isSurveyError || isStatusError,
    isSubmitting,
    handleComplete,
    handleReopenForm,
    handleCancel,
    mutateStatus,
  } as const;
};
