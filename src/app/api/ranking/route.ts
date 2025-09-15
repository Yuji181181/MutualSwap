import { NextResponse } from "next/server";
import { getUserRankingData } from "../(Repository)/user";

export async function GET() {
  try {
    const users = await getUserRankingData();
    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
