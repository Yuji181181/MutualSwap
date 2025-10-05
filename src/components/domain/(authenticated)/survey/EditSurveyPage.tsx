"use client";

import { SurveyFormSkeleton } from "@/components/domain/(authenticated)/survey/SurveyFormSkeleton";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
import { useEditSurveyPage } from "@/hooks/domain/(authenticated)/useEditSurveyPage";
import { useRouter } from "next/navigation";
import type React from "react";
import { useState } from "react";

export const EditSurveyPage: React.FC<{ id: string }> = (props) => {
  const router = useRouter();
  const {
    form,
    handleSubmit: onSubmit,
    error: submitError,
    survey,
    isLoading,
    isError,
    error,
    isUpdating,
    handleDelete,
    isDeleting,
    deleteError,
    hasDeleted,
  } = useEditSurveyPage(props.id);
  const [confirmingDelete, setConfirmingDelete] = useState(false);

  // 削除後の再検証で404が返り瞬間的にエラーカードが表示されるフラッシュを
  // hasDeletedフラグで抑制する。
  if (isError && !hasDeleted) {
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

  // hasDeleted時（削除成功後リダイレクト待ち）もスケルトンを出して静的に見せる
  if (isLoading || !survey || hasDeleted) {
    return (
      <main className="container mx-auto px-4 py-8">
        <SurveyFormSkeleton />
      </main>
    );
  }

  if (isUpdating || isDeleting) {
    return (
      <main className="container mx-auto px-4 py-8">
        <SurveyFormSkeleton />
      </main>
    );
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <Card className="mx-auto w-full max-w-2xl">
        <CardHeader>
          <CardTitle>投稿を編集</CardTitle>
          <CardDescription>内容を更新して保存してください。</CardDescription>
          <CardAction>
            <Button
              type="button"
              variant="destructive"
              disabled={isDeleting || isUpdating}
              onClick={() => setConfirmingDelete(true)}
            >
              削除する
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
              {submitError && (
                <div className="rounded-md border border-destructive/30 bg-destructive/10 p-3 text-destructive text-sm">
                  {submitError.message}
                </div>
              )}
              {deleteError && (
                <div className="rounded-md border border-destructive/30 bg-destructive/10 p-3 text-destructive text-sm">
                  {deleteError.message}
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
      <Dialog open={confirmingDelete} onOpenChange={setConfirmingDelete}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>削除の確認</DialogTitle>
            <DialogDescription>
              本当にこの投稿を削除しますか？
              <br />
              この操作は取り消せません。
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setConfirmingDelete(false)}
              disabled={isDeleting}
            >
              キャンセル
            </Button>
            <Button
              type="button"
              variant="destructive"
              disabled={isDeleting}
              onClick={() => {
                void handleDelete();
              }}
            >
              {isDeleting ? "削除中..." : "完全に削除する"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </main>
  );
};

export default EditSurveyPage;
