import { auth } from "@/auth";
import type { ResBody } from "@/types/api";
import type { MypageResponse } from "@/types/api/survey";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { getMypageData } from "../(Repository)/mypage";

export const GET = async () => {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return NextResponse.json<ResBody<undefined>>(
        { message: "Unauthorized" },
        { status: 401 },
      );
    }

    const result = await getMypageData(session.user.id);

    if (!result) {
      return NextResponse.json<ResBody<MypageResponse>>(
        {
          message: "Success",
          data: {
            user: null,
            surveys: [],
          },
        },
        { status: 200 },
      );
    }

    return NextResponse.json<ResBody<MypageResponse>>(
      { message: "Success", data: result },
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
