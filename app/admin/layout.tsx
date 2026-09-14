import Link from "next/link";
import LogoutButton from "@/components/admin/LogoutButton";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-ink text-parchment">
      <header className="flex items-center justify-between border-b border-gold/10 px-6 py-4">
       <nav className="flex gap-6 text-xs tracking-[0.15em]">
  <Link href="/admin">DASHBOARD</Link>
  <Link href="/admin/products">PRODUCTS</Link>
  <Link href="/admin/hero">HERO</Link>
  <Link href="/admin/scent-categories">SCENT CATEGORIES</Link>
  <Link href="/admin/discovery-set">DISCOVERY SET</Link>
  <Link href="/admin/reviews">REVIEWS</Link>
  <Link href="/admin/orders">ORDERS</Link>  
</nav>
        <LogoutButton />
      </header>
      <main className="px-6 py-8">{children}</main>
    </div>
  );
}