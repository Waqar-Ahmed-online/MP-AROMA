import Link from "next/link";

const columns = [
  {
    title: "Navigation",
    links: [
      { label: "Collections", href: "/collection" },
      { label: "The Scent Finder", href: "/scent-finder" },
     { label: "Perfume Testers", href: "/perfume-testers" },
    ],
  },
  {
    title: "Collection",
    links: [
      { label: "Best Sellers", href: "/best-sellers" },
      { label: "The Scent Finder", href: "/scent-finder" },
      { label: "Reviews", href: "/reviews" },
    ],
  },
  {
    title: "Contact",
    links: [
      { label: "Privacy policy", href: "/privacy" },
      { label: "Stores", href: "/stores" },
    ],
  },
  {
  title: "Contact",
  links: [
    { label: "Track Order", href: "/track-order" }, // <-- yeh line add karni hai
    { label: "Privacy policy", href: "/privacy" },
    { label: "Stores", href: "/stores" },
  ],
},
];

export default function Footer() {
  return (
    <footer className="bg-ink pb-8 pt-14">
      <div className="mx-auto max-w-content px-5 md:px-10">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          <div className="col-span-2 sm:col-span-1">
            <span className="font-display text-2xl tracking-[0.18em] text-parchment">
              MPAROMA
            </span>
            <p className="mt-2 text-[0.65rem] tracking-[0.25em] text-smoke">
              MAISON DE PARFUM
            </p>
            <p className="mt-4 text-xs text-smoke">
              MPAroma@gmail.com
            </p>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="text-xs tracking-[0.15em] text-parchment/70">
                {col.title}
              </h3>
              <ul className="mt-3 flex flex-col gap-2">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-xs text-smoke transition-colors hover:text-gold"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-gold/10 pt-6 sm:flex-row">
          <p className="text-[0.65rem] text-smoke">
            © {new Date().getFullYear()} MPAROMA. All rights reserved.
          </p>
          <div className="flex gap-3 text-[0.6rem] tracking-[0.15em] text-smoke">
            <span className="border border-gold/15 px-2 py-1">COD</span>
            <span className="border border-gold/15 px-2 py-1">CARD</span>
            <span className="border border-gold/15 px-2 py-1">EASYPAISA</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
