import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { createPromoPage, listPromoPages } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.json({ items: listPromoPages() });
}

export async function POST(request: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  if (!body.slug || !body.title || !body.content || typeof body.content !== "object") {
    return NextResponse.json({ message: "slug, title, and content object are required" }, { status: 400 });
  }

  try {
    createPromoPage({
      slug: body.slug,
      title: body.title,
      isPublished: Boolean(body.isPublished),
      content: body.content
    });
    return NextResponse.json({ ok: true }, { status: 201 });
  } catch {
    return NextResponse.json({ message: "Promo slug already exists or payload is invalid" }, { status: 400 });
  }
}
