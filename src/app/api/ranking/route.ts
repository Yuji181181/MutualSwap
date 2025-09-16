import type { ResBody } from "@/types/api";
import type { userRankingResponse } from "@/types/api/survey";
import { NextResponse } from "next/server";
import { getUserRankingData } from "../(Repository)/user";

export async function GET() {
  try {
    const users = await getUserRankingData();
    return NextResponse.json<ResBody<userRankingResponse>>(
      { message: "User ranking data retrieved successfully", data: users },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json<ResBody<undefined>>(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
