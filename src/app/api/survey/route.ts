import { createSurveyRequestSchema } from "@/schemas/api/survey";
import type { ResBody } from "@/types/api";
import type { CreateSurveyResponse, SurveyList } from "@/types/api/survey";
import { NextResponse } from "next/server";
import { createSurvey } from "../(Repository)/create";
import { getSurveys } from "../(Repository)/survey";

export const GET = async () => {
  try {
    const surveys = await getSurveys();

    return NextResponse.json<ResBody<SurveyList>>(
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

export const POST = async (request: Request) => {
  try {
    // 認証チェック（テスト用に一時的にコメントアウト）
    // const session = await auth.api.getSession({
    //   headers: await headers(),
    // });

    // if (!session?.user) {
    //   return NextResponse.json<ResBody<undefined>>(
    //     { message: "Unauthorized" },
    //     { status: 401 }
    //   );
    // }

    // リクエストボディのバリデーション
    const body = await request.json();
    const validatedBody = createSurveyRequestSchema.parse(body);

    // deadlineが文字列の場合はDateオブジェクトに変換
    const createData = {
      ...validatedBody,
      deadline: validatedBody.deadline
        ? new Date(validatedBody.deadline)
        : undefined,
    };

    // テスト用の固定ユーザーID (UUID形式)
    const survey = await createSurvey(
      "eda1423b-90e6-498e-a1cd-f1e8eee0725f",
      createData,
    ); //本当は session.user.id を使う

    return NextResponse.json<ResBody<CreateSurveyResponse>>(
      { message: "Survey created successfully", data: survey },
      { status: 201 },
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json<ResBody<undefined>>(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
};
