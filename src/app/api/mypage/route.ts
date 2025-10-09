import { auth } from "@/auth";
import type { ResBody } from "@/types/api";
import type { MypageData } from "@/types/api/survey";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { getMypageData } from "../(Repository)/mypage";

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

    // 認証されたユーザーの投稿とユーザー情報を取得
    const data = await getMypageData(session.user.id);

    return NextResponse.json<ResBody<MypageData>>(
      { message: "Success", data },
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
