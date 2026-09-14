"use client";
import { useRouter } from "next/navigation";

export default function DeleteHeroSlideButton({ id }: { id: string }) {
  const router = useRouter();
  async function handleDelete() {
    if (!confirm("Yeh slide delete karna hai?")) return;
    await fetch(`/api/admin/hero/${id}`, { method: "DELETE" });
    router.refresh();
  }
  return (
    <button onClick={handleDelete} className="text-xs text-red-400 hover:underline">
      DELETE
    </button>
  );
}