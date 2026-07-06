import { NextResponse } from "next/server";
import { getGoogleReviews } from "../../../lib/google-reviews";

export const revalidate = 21600; // 6h

export async function GET() {
  const data = await getGoogleReviews();

  return NextResponse.json(data, {
    headers: {
      "Cache-Control": "public, s-maxage=21600, stale-while-revalidate=86400",
    },
  });
}
