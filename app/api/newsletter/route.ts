import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";
import { sendNewsletterAdminEmail } from "@/lib/mail";
export async function POST(req: Request) {
  const { email } = await req.json();

  if (!email || typeof email !== "string") {
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  }

  try {
    const db = await getDb();
    await db
      .collection("newsletter_subscribers")
      .updateOne(
        { email },
        { $setOnInsert: { email, subscribedAt: new Date() } },
        { upsert: true }
      );
      sendNewsletterAdminEmail(email).catch((e) =>
  console.error("Newsletter admin email failed:", e)
);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Newsletter signup failed:", err);
    return NextResponse.json(
      { error: "Could not save subscription right now." },
      { status: 500 }
    );
  }
}
