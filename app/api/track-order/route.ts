import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { getDb } from "@/lib/mongodb";

// Sirf digits rakhte hain taake "0300-1234567", "+92 300 1234567",
// "923001234567" waghera sab ek hi tarah compare ho sakein.
function normalizePhone(value: string): string {
  return (value || "").replace(/\D/g, "");
}

// +92 vs 0 prefix ka farq handle karne ke liye — akhri 9-10 digits compare
// karte hain (Pakistani mobile numbers ke liye kaafi hai).
function phonesMatch(a: string, b: string): boolean {
  const na = normalizePhone(a);
  const nb = normalizePhone(b);
  if (!na || !nb) return false;
  const tailLen = 9;
  return na.slice(-tailLen) === nb.slice(-tailLen);
}

export async function POST(req: Request) {
  let body: { orderId?: string; phone?: string };

  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const orderId = (body.orderId || "").trim();
  const phone = (body.phone || "").trim();

  if (!orderId || !phone) {
    return NextResponse.json(
      { error: "Order ID aur phone number dono required hain." },
      { status: 400 }
    );
  }

  let objectId: ObjectId;
  try {
    objectId = new ObjectId(orderId);
  } catch {
    return NextResponse.json(
      { error: "Order ID sahi nahi hai. Apna order confirmation email/message check karein." },
      { status: 400 }
    );
  }

  try {
    const db = await getDb();
    const order = await db.collection("orders").findOne({ _id: objectId });

    // Order na milay, ya phone match na kare — dono cases mein wahi generic
    // error dete hain (taake koi random order IDs try karke yeh na pata
    // laga sake ke konsa ID valid hai).
    if (!order || !phonesMatch(order.customer?.phone || "", phone)) {
      return NextResponse.json(
        { error: "Order nahi mila. Order ID aur phone number dobara check karein." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      ok: true,
      order: {
        id: String(order._id),
        status: order.status,
        createdAt: order.createdAt,
        items: order.items,
        subtotal: order.subtotal,
        shippingLabel: order.shippingLabel,
        shippingCost: order.shippingCost,
        total: order.total,
        customer: {
          firstName: order.customer?.firstName,
          lastName: order.customer?.lastName,
          address: order.customer?.address,
          apartment: order.customer?.apartment,
          city: order.customer?.city,
          postalCode: order.customer?.postalCode,
        },
      },
    });
  } catch (err) {
    console.error("Track order failed:", err);
    return NextResponse.json(
      { error: "Kuch masla ho gaya. Please thodi dair baad try karein." },
      { status: 500 }
    );
  }
}