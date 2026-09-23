"use client";

import { useState } from "react";

const MAX_FILES = 2;

export default function ReviewForm() {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  const [rating, setRating] = useState(5);
  const [files, setFiles] = useState<File[]>([]);
  const [fileError, setFileError] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const selected = Array.from(e.target.files || []);
    if (selected.length > MAX_FILES) {
      setFileError(`You can upload a maximum of ${MAX_FILES} images/videos.`);
      setFiles(selected.slice(0, MAX_FILES));
      return;
    }
    setFileError(null);
    setFiles(selected);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!quote.trim()) return;
    setStatus("loading");

    const formData = new FormData();
    formData.append("quote", quote);
    formData.append("author", author);
    formData.append("rating", String(rating));
    files.forEach((file) => formData.append("files", file));

    try {
      const res = await fetch("/api/reviews", { method: "POST", body: formData });
      if (!res.ok) throw new Error("Submit failed");
      setStatus("done");
      setQuote("");
      setAuthor("");
      setRating(5);
      setFiles([]);
    } catch {
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <div className="mx-auto mt-10 max-w-lg border border-gold/20 bg-ink-soft/40 p-6 text-center">
        <p className="text-sm text-gold">Thank you! Your review has been submitted successfully.</p>
        <p className="mt-1 text-xs text-smoke">
         Once approved, it will appear on this page.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto mt-10 max-w-lg space-y-4 border border-gold/10 bg-ink-soft/40 p-6"
    >
      <h3 className="text-center font-display text-xl tracking-[0.08em] text-parchment">
       Write your review.
      </h3>

      <label className="block text-xs tracking-[0.1em] text-smoke">
        Your Name (optional)
        <input
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className="mt-1 w-full border border-gold/20 bg-ink px-3 py-2 text-sm text-parchment outline-none focus:border-gold"
        />
      </label>

      <label className="block text-xs tracking-[0.1em] text-smoke">
        Rating
        <select
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          className="mt-1 w-full border border-gold/20 bg-ink px-3 py-2 text-sm text-parchment outline-none focus:border-gold"
        >
          {[5, 4, 3, 2, 1].map((n) => (
            <option key={n} value={n}>
              {n} Stars
            </option>
          ))}
        </select>
      </label>

      <label className="block text-xs tracking-[0.1em] text-smoke">
        Your Review
        <textarea
          required
          value={quote}
          onChange={(e) => setQuote(e.target.value)}
          rows={4}
          className="mt-1 w-full border border-gold/20 bg-ink px-3 py-2 text-sm text-parchment outline-none focus:border-gold"
        />
      </label>

      <label className="block text-xs tracking-[0.1em] text-smoke">
       Photos or Videos (optional — you can upload 1 or 2)
        <input
          type="file"
          accept="image/*,video/*"
          multiple
          onChange={handleFileChange}
          className="mt-1 block w-full text-xs text-smoke"
        />
      </label>
      {files.length > 0 && (
        <p className="text-[0.7rem] text-smoke">{files.length} file(s) selected</p>
      )}
      {fileError && <p className="text-xs text-red-400">{fileError}</p>}

      {status === "error" && (
        <p className="text-xs text-red-400">Kuch ghalat ho gaya, dobara try karein.</p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full border border-gold bg-gold px-6 py-2.5 text-xs tracking-[0.2em] text-ink transition-colors hover:bg-transparent hover:text-parchment disabled:opacity-60"
      >
        {status === "loading" ? "SUBMITTING..." : "SUBMIT REVIEW"}
      </button>
    </form>
  );
}