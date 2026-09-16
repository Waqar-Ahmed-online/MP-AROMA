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
      <header className="flex flex-col gap-4 border-b border-gold/10 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <nav className="flex flex-wrap gap-2 text-[0.65rem] tracking-[0.15em] sm:gap-2.5">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-sm border border-gold/30 px-3 py-1.5 text-parchment/85 transition-colors duration-200 hover:border-gold hover:bg-gold hover:text-ink"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <LogoutButton />
      </header>
      <main className="px-4 py-8 sm:px-6">{children}</main>
    </div>
  );
}