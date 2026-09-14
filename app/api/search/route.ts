import { NextRequest, NextResponse } from "next/server";
import { getProducts } from "@/lib/data";

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get("q")?.trim().toLowerCase() || "";
  if (!q) return NextResponse.json({ results: [] });

  const products = await getProducts();
  const results = products.filter((p) =>
    `${p.name} ${p.inspiredBy ?? ""} ${p.category}`.toLowerCase().includes(q)
  );

  return NextResponse.json({ results });
}