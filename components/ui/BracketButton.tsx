import Link from "next/link";
import { cn } from "@/lib/cn";

interface BracketButtonProps {
  href: string;
  children: React.ReactNode;
  variant?: "outline" | "solid";
  className?: string;
}

const base =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap border px-4 py-2.5 font-body text-[0.62rem] tracking-[0.14em] uppercase transition-colors duration-200 sm:px-6 sm:py-3 sm:text-[0.72rem] sm:tracking-[0.22em]";

const variants = {
  outline:
    "border-gold/55 text-parchment hover:bg-gold hover:text-ink hover:border-gold",
  solid:
    "border-gold bg-gold text-ink hover:bg-transparent hover:text-parchment",
};

export default function BracketButton({
  href,
  children,
  variant = "outline",
  className,
}: BracketButtonProps) {
  return (
    <Link href={href} className={cn(base, variants[variant], className)}>
      <span aria-hidden>[</span>
      {children}
      <span aria-hidden>]</span>
    </Link>
  );
}