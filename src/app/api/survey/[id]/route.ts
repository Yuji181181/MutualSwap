import type { DeleteSurveyResponse } from "@/types/api/survey";
import { type NextRequest, NextResponse } from "next/server";
import { deleteSurvey, getSurveyById } from "../../(Repository)/survey";

export async function DELETE(
  _request: NextRequest,
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

    // const session = await auth.api.getSession({ headers: await headers() });
    // if (!session?.user?.id) {
    //   return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    // }

    const surveyToDelete = await getSurveyById(surveyId);
    if (!surveyToDelete) {
      return NextResponse.json(
        { message: "Survey not found" },
        { status: 404 },
      );
    }
    // if (surveyToDelete.userId !== session.user.id) {
    //   return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    // }

    const survey = await deleteSurvey(surveyId);

    const deleteSurveyResponse: DeleteSurveyResponse = {
      id: survey.id,
      title: survey.title,
      description: survey.description,
      googleFormUrl: survey.googleFormUrl,
      questionCount: survey.questionCount,
      deadline: survey.deadline,
      isActive: survey.isActive,
      createdAt: survey.createdAt,
      updatedAt: survey.updatedAt,
      userId: survey.userId,
      message: "deleted successfully",
    };

    return NextResponse.json(deleteSurveyResponse, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
