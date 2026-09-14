import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";
import { requireAdmin } from "@/lib/auth";

export async function PUT(req: NextRequest) {
  const session = await requireAdmin(req);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  delete body._id;

  const db = await getDb();
  await db.collection("discoverySet").updateOne({}, { $set: body }, { upsert: true });

  return NextResponse.json({ success: true });
}