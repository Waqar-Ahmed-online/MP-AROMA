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

  // Order ka MAUJOODA status nikal lo — sirf tabhi stock minus karni hai
  // jab status pehli dafa "delivered" mein ja raha ho (dobara delivered
  // pe click karne se dobara stock minus na ho).
  const existingOrder = await db.collection("orders").findOne({ _id: objectId });
  if (!existingOrder) {
    return NextResponse.json({ error: "Order not found." }, { status: 404 });
  }

  await db
    .collection("orders")
    .updateOne({ _id: objectId }, { $set: { status: body.status } });

  if (body.status === "delivered" && existingOrder.status !== "delivered") {
    const items: { id: string; quantity: number }[] = existingOrder.items || [];

    await Promise.all(
      items.map((item) => {
        let productObjectId: ObjectId;
        try {
          productObjectId = new ObjectId(item.id);
        } catch {
          return Promise.resolve(); // invalid/mock id ho to skip kar do
        }
        return db.collection("products").updateOne(
          { _id: productObjectId },
          [
            {
              $set: {
                stock: {
                  $max: [0, { $subtract: [{ $ifNull: ["$stock", 0] }, item.quantity] }],
                },
              },
            },
          ]
        );
      })
    );
  }

  return NextResponse.json({ success: true, status: body.status });
}