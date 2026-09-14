import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { getDb } from "@/lib/mongodb";
import { requireAdmin } from "@/lib/auth";

// Approve (or revert to pending) a review.
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await requireAdmin(req);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const db = await getDb();
  await db.collection("reviews").updateOne(
    { _id: new ObjectId(params.id) },
    { $set: { status: body.status } }
  );
  return NextResponse.json({ success: true });
}

// Reject a pending review, or remove an approved one.
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await requireAdmin(req);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const db = await getDb();
  await db.collection("reviews").deleteOne({ _id: new ObjectId(params.id) });
  return NextResponse.json({ success: true });
}