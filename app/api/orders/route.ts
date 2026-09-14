import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";
import {
  sendAdminOrderEmail,
  sendCustomerOrderEmail,
  OrderEmailItem,
} from "@/lib/mail";

interface OrderItemInput {
  id: string;
  name: string;
  quantity: number;
  priceRs: number;
  selectedTesters?: string[];
}

interface OrderRequestBody {
  items: OrderItemInput[];
  subtotal: number;
  shippingMethod: string;
  shippingLabel: string;
  shippingCost: number;
  total: number;
  customer: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    apartment?: string;
    city: string;
    postalCode?: string;
  };
  note?: string;
}

export async function GET() {
  return NextResponse.json({ message: "Orders API is live." });
}

export async function POST(req: Request) {
  let body: OrderRequestBody;

  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (!body?.items?.length || !body.customer?.email) {
    return NextResponse.json(
      { error: "Order must include items and a customer email." },
      { status: 400 }
    );
  }

  try {
    const db = await getDb();
    const orderDoc = {
      items: body.items,
      subtotal: body.subtotal,
      shippingMethod: body.shippingMethod,
      shippingLabel: body.shippingLabel,
      shippingCost: body.shippingCost,
      total: body.total,
      customer: body.customer,
      note: body.note || "",
      status: "pending",
      createdAt: new Date(),
    };

    const result = await db.collection("orders").insertOne(orderDoc);
    const orderId = result.insertedId.toString();

    // Order pehle hi DB mein save ho chuka hai — ab admin aur customer dono ko
    // email bhejte hain. Dono independent try/catch mein hain taake agar ek
    // fail ho (e.g. customer ka email galat ho) to doosra phir bhi chala jaye,
    // aur order "failed" na dikhaya jaye sirf email ki wajah se.
    const emailItems: OrderEmailItem[] = body.items.map((i) => ({
      name: i.name,
      quantity: i.quantity,
      priceRs: i.priceRs,
    }));

    const emailPayload = {
      orderId,
      items: emailItems,
      subtotal: body.subtotal,
      shippingLabel: body.shippingLabel,
      shippingCost: body.shippingCost,
      total: body.total,
      customer: body.customer,
      note: body.note,
    };

    let adminEmailSent = false;
    let customerEmailSent = false;

    try {
      await sendAdminOrderEmail(emailPayload);
      adminEmailSent = true;
    } catch (emailErr) {
      console.error("Order saved but admin email failed to send:", emailErr);
    }

    try {
      await sendCustomerOrderEmail(emailPayload);
      customerEmailSent = true;
    } catch (emailErr) {
      console.error("Order saved but customer email failed to send:", emailErr);
    }

    return NextResponse.json({
      ok: true,
      orderId,
      adminEmailSent,
      customerEmailSent,
    });
  } catch (err) {
    console.error("Order creation failed:", err);
    return NextResponse.json(
      { error: "Could not place your order right now. Please try again." },
      { status: 500 }
    );
  }
}
