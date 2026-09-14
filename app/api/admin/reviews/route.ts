import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";
import { requireAdmin } from "@/lib/auth";

export async function GET(req: NextRequest) {
  const session = await requireAdmin(req);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const db = await getDb();
  const docs = await db
    .collection("reviews")
    .find({})
    .sort({ createdAt: -1 })
    .toArray();

  const reviews = docs.map(({ _id, ...rest }) => ({ id: String(_id), ...rest }));
  return NextResponse.json(reviews);
}