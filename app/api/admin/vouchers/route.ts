import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";
import { requireAdmin } from "@/lib/auth";

export async function POST(req: NextRequest) {
  const session = await requireAdmin(req);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const code = String(body.code || "").trim().toUpperCase();
  const percent = Number(body.percent);

  if (!code || !percent || percent <= 0 || percent > 100) {
    return NextResponse.json({ error: "Valid code and percent (1-100) required" }, { status: 400 });
  }

  const db = await getDb();
  const existing = await db.collection("vouchers").findOne({ code });
  if (existing) {
    return NextResponse.json({ error: "This code already exists" }, { status: 400 });
  }

  const result = await db.collection("vouchers").insertOne({ code, percent });
  return NextResponse.json({ id: result.insertedId });
}