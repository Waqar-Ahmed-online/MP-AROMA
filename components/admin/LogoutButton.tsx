"use client";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();
  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }
  return (
    <button onClick={handleLogout} className="text-xs tracking-[0.15em] text-smoke hover:text-gold">
      LOGOUT
    </button>
  );
}