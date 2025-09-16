import { auth } from "@/auth";
import { surveyParamsSchema } from "@/schemas/api/survey";
import type { ResBody } from "@/types/api";
import type { DeleteSurveyResponse } from "@/types/api/survey";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { deleteSurvey, getSurveyById } from "../(Repository)/survey";

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const resolvedParams = await params;
    const paramsValidationResult = surveyParamsSchema.safeParse(resolvedParams);
    if (!paramsValidationResult.success) {
      return NextResponse.json(
        {
          message: "Invalid input",
          errors: paramsValidationResult.error.flatten().fieldErrors,
        },
        { status: 400 },
      );
    }
    const surveyId = resolvedParams.id;

    const session = await auth.api.getSession({ headers: await headers() });
    if (!session?.user?.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const surveyToDelete = await getSurveyById(surveyId);
    if (!surveyToDelete) {
      return NextResponse.json(
        { message: "Survey not found" },
        { status: 404 },
      );
    }
    if (surveyToDelete.userId !== session.user.id) {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    const survey = await deleteSurvey(surveyId);

    return NextResponse.json<ResBody<DeleteSurveyResponse>>(
      { message: "Survey deleted successfully", data: survey },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json<ResBody<undefined>>(
      { message: "Server error" },
      { status: 500 },
    );
  }
}
