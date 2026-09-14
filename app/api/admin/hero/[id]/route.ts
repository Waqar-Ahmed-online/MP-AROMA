import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { getDb } from "@/lib/mongodb";
import { requireAdmin } from "@/lib/auth";

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await requireAdmin(req);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  if (!ObjectId.isValid(params.id)) {
    return NextResponse.json({ error: "Invalid slide id" }, { status: 400 });
  }

  const body = await req.json();
  delete body._id;
  const db = await getDb();
  await db.collection("heroSlides").updateOne({ _id: new ObjectId(params.id) }, { $set: body });
  return NextResponse.json({ success: true });
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await requireAdmin(req);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  if (!ObjectId.isValid(params.id)) {
    return NextResponse.json({ error: "Invalid slide id" }, { status: 400 });
  }

  const db = await getDb();
  await db.collection("heroSlides").deleteOne({ _id: new ObjectId(params.id) });
  return NextResponse.json({ success: true });
}