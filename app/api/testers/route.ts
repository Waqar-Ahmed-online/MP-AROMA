import { NextResponse } from "next/server";
import { getTesters } from "@/lib/data";

export async function GET() {
  const testers = await getTesters();

  const filtered = testers.filter(
    (t) => t.category === "men" || t.category === "women" || t.category === "unisex"
  );

  return NextResponse.json({ testers: filtered });
}