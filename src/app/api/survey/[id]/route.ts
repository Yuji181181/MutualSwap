import { surveyParamsSchema } from "@/schemas/api/survey";
import { updateSurveyRequestSchema } from "@/schemas/api/update";
import type { ResBody } from "@/types/api";
import type { Survey } from "@/types/api/survey";
import { NextResponse } from "next/server";
import { getSurveyById } from "../../(Repository)/read";
import { updateSurvey } from "../../(Repository)/update";

export const GET = async (
  _request: Request, // requestは認証で使うかもなので_request
  { params }: { params: Promise<{ id: string }> },
) => {
  try {
    const resolvedParams = await params;

    // パラメータのバリデーション
    const validatedParams = surveyParamsSchema.parse(resolvedParams);

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
    const resolvedParams = await params;
    // UUIDのバリデーション
    const validatedParams = surveyParamsSchema.parse(resolvedParams);

    // 編集内容のバリデーション
    const body = await request.json();
    const validatedBody = updateSurveyRequestSchema.parse(body);

    const survey = await updateSurvey(validatedParams.id, validatedBody);

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
