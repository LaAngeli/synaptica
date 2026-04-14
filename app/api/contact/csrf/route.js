import { randomBytes } from "node:crypto";
import { NextResponse } from "next/server";

const CSRF_COOKIE_NAME = "contact_csrf";

export async function GET() {
  const csrfToken = randomBytes(24).toString("hex");
  const response = NextResponse.json({ csrfToken });

  response.cookies.set(CSRF_COOKIE_NAME, csrfToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60,
  });

  return response;
}
