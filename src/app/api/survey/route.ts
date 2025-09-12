import type { ResBody } from "@/types/api";
import type { SurveyList } from "@/types/api/survey";
import { NextResponse } from "next/server";
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
