import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { getDb } from "@/lib/mongodb";
import { requireAdmin } from "@/lib/auth";

const ALLOWED_STATUSES = [
  "pending",
  "processing",
  "shipped",
  "delivered",
  "cancelled",
];

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await requireAdmin(req);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: { status?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (!body.status || !ALLOWED_STATUSES.includes(body.status)) {
    return NextResponse.json(
      { error: `Status must be one of: ${ALLOWED_STATUSES.join(", ")}` },
      { status: 400 }
    );
  }

  let objectId: ObjectId;
  try {
    objectId = new ObjectId(params.id);
  } catch {
    return NextResponse.json({ error: "Invalid order id." }, { status: 400 });
  }

  const db = await getDb();
  const result = await db
    .collection("orders")
    .updateOne({ _id: objectId }, { $set: { status: body.status } });

  if (result.matchedCount === 0) {
    return NextResponse.json({ error: "Order not found." }, { status: 404 });
  }

  return NextResponse.json({ success: true, status: body.status });
}
