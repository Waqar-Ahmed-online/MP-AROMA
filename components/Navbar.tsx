"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import SearchOverlay from "@/components/SearchOverlay";
const navLinks = [
   { label: "HOME", href: "/" },
  { label: "COLLECTION", href: "/collection" },
  { label: "BEST SELLERS", href: "/best-sellers" },
  { label: "THE SCENT FINDER", href: "/scent-finder" },
  { label: "PERFUME TESTERS", href: "/perfume-testers" },
  { label: "REVIEWS", href: "/reviews" },
   { label: "TRACK ORDER", href: "/track-order" },

];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { cartCount } = useCart();
  const [searchOpen, setSearchOpen] = useState(false);
  return (
    <>
    <header className="sticky top-0 z-40 w-full border-b border-gold/15 bg-ink/95 backdrop-blur">
      <div className="mx-auto flex max-w-content items-center justify-between px-5 py-4 md:px-10">
     <Link href="/" className="flex items-center">
  <Image
    src="/images/logo.png"
    alt="MPAROMA"
    width={220}
    height={55}
    className="h-9 w-auto md:h-11"
    priority
  />
</Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-body text-[0.72rem] tracking-[0.15em] text-parchment/85 transition-colors hover:text-gold"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-5">
          <button
            aria-label="Search"
            onClick={() => setSearchOpen(true)}
            className="hidden text-parchment/85 transition-colors hover:text-gold sm:block">
            <SearchIcon />
          </button>
          <button
            aria-label="Wishlist"
            className="hidden text-parchment/85 transition-colors hover:text-gold sm:block"
          >
            <HeartIcon />
          </button>
          <Link
            href="/cart"
            aria-label="Cart"
            className="flex items-center gap-1 text-parchment/85 transition-colors hover:text-gold"
          >
            <BagIcon />
            <span className="font-body text-xs">({cartCount})</span>
          </Link>
          <button
            aria-label="Toggle menu"
            className="text-parchment lg:hidden"
            onClick={() => setOpen((v) => !v)}
          >
            <MenuIcon open={open} />
          </button>
        </div>
      </div>

      {open && (
        <nav className="flex flex-col gap-1 border-t border-gold/15 bg-ink px-5 pb-6 pt-2 lg:hidden">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="py-3 font-body text-sm tracking-[0.12em] text-parchment/85 border-b border-gold/10 last:border-none"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
    <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}

function SearchIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="11" cy="11" r="7" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

function HeartIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8Z" />
    </svg>
  );
}

function BagIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M6 8h12l-1 12H7L6 8Z" />
      <path d="M9 8V6a3 3 0 0 1 6 0v2" />
    </svg>
  );
}

function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      {open ? (
        <path d="M6 6l12 12M18 6 6 18" />
      ) : (
        <path d="M3 6h18M3 12h18M3 18h18" />
      )}
    </svg>
  );
}