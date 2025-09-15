import { auth } from "@/auth";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { getPointsHistory } from "../../(Repository)/point";

export async function GET(_request: Request) {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session?.user?.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const userId = session.user.id;
    const pointsHistory = await getPointsHistory(userId);
    return NextResponse.json(pointsHistory, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
