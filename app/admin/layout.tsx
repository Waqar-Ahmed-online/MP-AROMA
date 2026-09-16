import Link from "next/link";
import LogoutButton from "@/components/admin/LogoutButton";

const navLinks = [
  { href: "/admin", label: "DASHBOARD" },
  { href: "/admin/products", label: "PRODUCTS" },
  { href: "/admin/hero", label: "HERO" },
  { href: "/admin/scent-categories", label: "SCENT CATEGORIES" },
  { href: "/admin/discovery-set", label: "DISCOVERY SET" },
  { href: "/admin/about", label: "ABOUT PAGE" },
  { href: "/admin/vouchers", label: "VOUCHERS" },
  { href: "/admin/reviews", label: "REVIEWS" },
  { href: "/admin/orders", label: "ORDERS" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-ink text-parchment">
      <header className="flex flex-col gap-6 border-b border-gold/10 px-4 py-6 sm:px-6">
        <div className="flex items-center justify-between">
          <p className="font-display text-sm tracking-[0.2em] text-gold">MPAROMA ADMIN</p>
          <LogoutButton />
        </div>

        <nav className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-md border border-gold/30 bg-ink-soft px-7 py-20 text-center text-2xl tracking-[0.12em] text-parchment transition-colors duration-200 hover:border-gold hover:bg-gold hover:text-ink"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </header>

      <main className="px-4 py-8 sm:px-6">{children}</main>
    </div>
  );
}