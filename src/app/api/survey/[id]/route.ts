import {
  surveyParamsSchema,
  updateSurveyRequestSchema,
} from "@/schemas/api/survey";
import type { ResBody } from "@/types/api";
import type { Survey, UpdateSurveyResponse } from "@/types/api/survey";
import { NextResponse } from "next/server";
import { getSurveyById } from "../../(Repository)/read";
import { updateSurvey } from "../../(Repository)/update";

export const GET = async (
  _request: Request, // requestは認証で使うかもなので_request
  { params }: { params: Promise<{ id: string }> },
) => {
  try {
    // paramsはPromiseなのでawaitで解決
    const resolvedParams = await params;
    // パラメータのバリデーション
    const validatedParams = surveyParamsSchema.parse(resolvedParams);

    // 投稿詳細を取得
    const survey = await getSurveyById(validatedParams.id);

    if (!survey) {
      return NextResponse.json<ResBody<undefined>>(
        { message: "Survey not found" },
        { status: 404 },
      );
    }

    return NextResponse.json<ResBody<Survey>>(
      { message: "Success", data: survey },
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

export const PUT = async (
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) => {
  try {
    // paramsはPromiseなのでawaitで解決
    const resolvedParams = await params;
    // UUIDのバリデーション
    const validatedParams = surveyParamsSchema.parse(resolvedParams);

    // 編集内容のバリデーション
    const body = await request.json();
    const validatedBody = updateSurveyRequestSchema.parse(body);

    const updateData = {
      ...validatedBody,
      deadline: validatedBody.deadline
        ? new Date(validatedBody.deadline)
        : undefined,
    };

    const survey = await updateSurvey(validatedParams.id, updateData);

    return NextResponse.json<ResBody<UpdateSurveyResponse>>(
      { message: "Success", data: survey },
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
