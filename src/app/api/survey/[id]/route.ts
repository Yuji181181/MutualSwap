import { auth } from "@/auth";
import type { ResBody } from "@/types/api";
import type { DeleteSurveyResponse } from "@/types/api/survey";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { deleteSurvey } from "../../(Repository)/deleteSurvey";
import { getSurveyById } from "../../(Repository)/survey";

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const surveyId = (await params).id;
    if (!surveyId) {
      return NextResponse.json(
        { message: "Survey ID is required" },
        { status: 400 },
      );
    }

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
