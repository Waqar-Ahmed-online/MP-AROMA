import { NextResponse } from "next/server";
import { sendContactAdminEmail } from "@/lib/mail";

export async function POST(req: Request) {
  const { name, email, message } = await req.json();

  if (!name || !email || !message) {
    return NextResponse.json({ error: "All fields required" }, { status: 400 });
  }

  try {
    await sendContactAdminEmail({ name, email, message });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact form email failed:", err);
    return NextResponse.json({ error: "Could not send message" }, { status: 500 });
  }
}