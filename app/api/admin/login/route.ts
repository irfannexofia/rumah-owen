import { NextResponse } from "next/server";
import { createSession, verifyCredentials } from "@/lib/auth";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const { username, password } = await request.json();

  if (!verifyCredentials(username, password)) {
    return NextResponse.json({ message: "Invalid username or password" }, { status: 401 });
  }

  await createSession();
  return NextResponse.json({ ok: true });
}



