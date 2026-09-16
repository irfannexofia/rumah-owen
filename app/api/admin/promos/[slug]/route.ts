import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { deletePromoPage, getPromoPage, updatePromoPage } from "@/lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(_: Request, { params }: { params: Promise<{ slug: string }> }) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { slug } = await params;
  const item = getPromoPage(slug, true);
  if (!item) return NextResponse.json({ message: "Not found" }, { status: 404 });
  return NextResponse.json({ item });
}

export async function PUT(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { slug } = await params;
  const body = await request.json();
  if (!body.title || !body.content || typeof body.content !== "object") {
    return NextResponse.json({ message: "title and content object are required" }, { status: 400 });
  }

  const changes = updatePromoPage(slug, {
    title: body.title,
    isPublished: Boolean(body.isPublished),
    content: body.content
  });
  if (!changes) return NextResponse.json({ message: "Not found" }, { status: 404 });
  return NextResponse.json({ ok: true });
}

export async function DELETE(_: Request, { params }: { params: Promise<{ slug: string }> }) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { slug } = await params;
  const changes = deletePromoPage(slug);
  if (!changes) return NextResponse.json({ message: "Not found" }, { status: 404 });
  return NextResponse.json({ ok: true });
}



