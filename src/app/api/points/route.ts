import { auth } from "@/auth";
import type { ResBody } from "@/types/api";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { getUserPoints } from "../(Repository)/point";

export const GET = async () => {
  try {
    // 認証チェック
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return NextResponse.json<ResBody<undefined>>(
        { message: "Unauthorized" },
        { status: 401 },
      );
    }

    // ユーザーのポイント情報を取得
    const points = await getUserPoints(session.user.id);

    return NextResponse.json<ResBody<{ currentPoints: number }>>(
      { message: "Success", data: { currentPoints: points } },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json<ResBody<undefined>>(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
};
