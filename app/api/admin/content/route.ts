import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { createContentBlock, listContentBlocks } from "@/lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.json({ items: listContentBlocks() });
}

export async function POST(request: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  if (!body.key || !body.title || !body.content || typeof body.content !== "object") {
    return NextResponse.json({ message: "key, title, and content object are required" }, { status: 400 });
  }

  try {
    createContentBlock({ key: body.key, title: body.title, content: body.content });
    return NextResponse.json({ ok: true }, { status: 201 });
  } catch {
    return NextResponse.json({ message: "Content key already exists or payload is invalid" }, { status: 400 });
  }
}



