import {
  surveyParamsSchema,
  updateSurveyRequestSchema,
} from "@/schemas/api/survey";
import type { ResBody } from "@/types/api";
import type { UpdateSurveyResponse } from "@/types/api/survey";
import { NextResponse } from "next/server";
import { updateSurvey } from "../../(Repository)/update";

export const PUT = async (
  request: Request,
  { params }: { params: { id: string } },
) => {
  try {
    // UUIDのバリデーション
    const validatedParams = surveyParamsSchema.parse(params);

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
