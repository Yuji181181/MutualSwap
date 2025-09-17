import { auth } from "@/auth";
import type { ResBody } from "@/types/api";
import type { MypageSurveyList } from "@/types/api/survey";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { getMypageSurveys } from "../(Repository)/mypage";

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

    // 認証されたユーザーの投稿のみを取得
    const surveys = await getMypageSurveys(session.user.id);

    return NextResponse.json<ResBody<MypageSurveyList>>(
      { message: "Success", data: surveys },
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
