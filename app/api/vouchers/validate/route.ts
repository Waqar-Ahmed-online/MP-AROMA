import { NextResponse } from "next/server";
import { getVoucherByCode } from "@/lib/data";

export async function POST(req: Request) {
  const { code } = await req.json();
  if (!code) return NextResponse.json({ error: "Code required" }, { status: 400 });

  const voucher = await getVoucherByCode(code);
  if (!voucher) {
    return NextResponse.json({ error: "Invalid or expired code" }, { status: 404 });
  }

  return NextResponse.json({ code: voucher.code, percent: voucher.percent });
}