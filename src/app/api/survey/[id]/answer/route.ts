import { auth } from "@/auth";
import { surveyParamsSchema } from "@/schemas/api/survey";
import type { ResBody } from "@/types/api";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import {
  checkSurveyResponse,
  createSurveyResponse,
} from "../../../(Repository)/surveyResponse";

// 回答済みかチェック
export const GET = async (
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) => {
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

    const resolvedParams = await params;
    const paramsValidationResult = surveyParamsSchema.safeParse(resolvedParams);

    if (!paramsValidationResult.success) {
      return NextResponse.json<ResBody<undefined>>(
        { message: "Bad Request" },
        { status: 400 },
      );
    }

    const hasAnswered = await checkSurveyResponse(
      session.user.id,
      paramsValidationResult.data.id,
    );

    return NextResponse.json<ResBody<{ hasAnswered: boolean }>>(
      { message: "Success", data: { hasAnswered } },
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

// 回答完了を記録
export const POST = async (
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) => {
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

    const resolvedParams = await params;
    const paramsValidationResult = surveyParamsSchema.safeParse(resolvedParams);

    if (!paramsValidationResult.success) {
      return NextResponse.json<ResBody<undefined>>(
        { message: "Bad Request" },
        { status: 400 },
      );
    }

    // 既に回答済みかチェック
    const hasAnswered = await checkSurveyResponse(
      session.user.id,
      paramsValidationResult.data.id,
    );

    if (hasAnswered) {
      return NextResponse.json<ResBody<undefined>>(
        { message: "Already answered" },
        { status: 409 },
      );
    }

    const response = await createSurveyResponse(
      session.user.id,
      paramsValidationResult.data.id,
    );

    return NextResponse.json<ResBody<{ pointsEarned: number }>>(
      {
        message: "回答完了しました",
        data: { pointsEarned: response.pointsEarned },
      },
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
