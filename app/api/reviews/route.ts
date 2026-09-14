import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";
import cloudinary from "@/lib/cloudinary";
import { ReviewMedia } from "@/types/product";

const MAX_FILES = 2; // customer ki marzi — 0, 1, ya 2 images/videos de sakta hai

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const quote = (formData.get("quote") as string | null)?.trim();
    const author = (formData.get("author") as string | null)?.trim();
    const rating = Number(formData.get("rating"));

    const files = formData
      .getAll("files")
      .filter((f): f is File => f instanceof File && f.size > 0)
      .slice(0, MAX_FILES);

    if (!quote || !rating || rating < 1 || rating > 5) {
      return NextResponse.json(
        { error: "Review text and a rating between 1-5 are required." },
        { status: 400 }
      );
    }

    const media: ReviewMedia[] = [];

    for (const file of files) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const base64 = `data:${file.type};base64,${buffer.toString("base64")}`;

      const result = await cloudinary.uploader.upload(base64, {
        folder: "mparoma/reviews",
        resource_type: "auto",
      });

      media.push({
        url: result.secure_url,
        type: result.resource_type === "video" ? "video" : "image",
      });
    }

    const db = await getDb();
    await db.collection("reviews").insertOne({
      quote,
      author: author || "Anonymous",
      rating,
      media,
      status: "pending",
      createdAt: new Date().toISOString(),
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Review submit failed:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}