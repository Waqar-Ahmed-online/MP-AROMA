import Link from "next/link";
import { cn } from "@/lib/cn";

interface BracketButtonProps {
  href: string;
  children: React.ReactNode;
  variant?: "outline" | "solid";
  className?: string;
}

const base =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap border px-6 py-3 font-body text-[0.72rem] tracking-[0.22em] uppercase transition-colors duration-200";

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
