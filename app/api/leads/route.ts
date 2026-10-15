import { neon } from "@neondatabase/serverless";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

const budgets = ["Rp800 juta – Rp2 miliar", "Rp2 – 5 miliar", "Rp5 – 10 miliar", "Rp10 – 30 miliar", "Rp30 – 90 miliar"];
const payments = ["KPR", "Cash / Cash Bertahap", "Belum menentukan"];

export async function POST(request: Request) {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) return NextResponse.json({ error: "Database belum dikonfigurasi." }, { status: 503 });

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Data form tidak valid." }, { status: 400 });
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const whatsapp = typeof body.whatsapp === "string" ? body.whatsapp.trim() : "";
  const budget = typeof body.budget === "string" ? body.budget : "";
  const payment = typeof body.payment === "string" ? body.payment : "";
  const source = typeof body.source === "string" ? body.source.trim().slice(0, 120) : "promo";
  if (!name || name.length > 120 || !/^\+?[0-9\s()-]{8,24}$/.test(whatsapp) || !budgets.includes(budget) || !payments.includes(payment)) {
    return NextResponse.json({ error: "Mohon periksa kembali data form." }, { status: 400 });
  }

  try {
    const sql = neon(databaseUrl);
    await sql`CREATE TABLE IF NOT EXISTS property_leads (
      id BIGSERIAL PRIMARY KEY,
      name VARCHAR(120) NOT NULL,
      whatsapp VARCHAR(24) NOT NULL,
      budget VARCHAR(64) NOT NULL,
      payment_plan VARCHAR(64) NOT NULL,
      source VARCHAR(120) NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )`;
    await sql`INSERT INTO property_leads (name, whatsapp, budget, payment_plan, source)
      VALUES (${name}, ${whatsapp}, ${budget}, ${payment}, ${source})`;
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Unable to save property lead", error instanceof Error ? error.message : "unknown error");
    return NextResponse.json({ error: "Data belum berhasil disimpan. Silakan coba lagi." }, { status: 500 });
  }
}
