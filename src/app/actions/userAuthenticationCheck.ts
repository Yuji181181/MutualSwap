"use server";

import { auth } from "@/auth";
import { headers } from "next/headers";

/**
 * ユーザーが認証されているかどうかを確認する
 * 認証されていない場合はfalseを返す
 * 認証されている場合はユーザーのIDを返す
 */
export async function userAuthenticationCheck() {
  const session = await auth.api.getSession({
    headers: await headers(), // you need to pass the headers object.
  });

  if (!session) return false;

  return session.user.id;
}
