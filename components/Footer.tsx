import Link from "next/link";
import { INSTAGRAM_URL, TIKTOK_URL, FACEBOOK_URL, CONTACT_EMAIL, CONTACT_PHONE } from "@/lib/socials";
import { WHATSAPP_NUMBER } from "@/lib/whatsapp";
import { FooterNewsletter } from "@/components/FooterNewsletter";
const quickLinks = [
  { label: "About Us", href: "/about" },
  { label: "Contact Us", href: "/contact" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Return & Refund Policy", href: "/return-refund" },
  { label: "Shipping Policy", href: "/shipping" },
  { label: "Terms of Service", href: "/terms" },
];

export default function Footer() {
  return (
    <footer className="border-t border-gold/10 bg-ink pb-8 pt-14">
      <div className="mx-auto max-w-content px-5 md:px-10">
        <div className="grid grid-cols-2 gap-10 lg:grid-cols-4">
          {/* CONTACT */}
          <div>
            <h3 className="text-xs tracking-[0.2em] text-parchment/70">
              CONTACT
            </h3>
            <div className="mt-3 h-px w-8 bg-gold/30" />
            <p className="mt-4 text-xs text-smoke">
              Email: {CONTACT_EMAIL}
            </p>
            <p className="mt-2 text-xs text-smoke">
              Phone: {CONTACT_PHONE}
            </p>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h3 className="text-xs tracking-[0.2em] text-parchment/70">
              QUICK LINKS
            </h3>
            <div className="mt-3 h-px w-8 bg-gold/30" />
            <ul className="mt-4 flex flex-col gap-2">
              {quickLinks.map((link) => (
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

          {/* LOGO + SOCIAL ICONS */}
          <div className="col-span-2 flex flex-col items-center justify-center lg:col-span-1">
            <span className="font-display text-2xl tracking-[0.18em] text-gold">
              MPAROMA
            </span>
            <div className="mt-5 flex gap-3">
              <SocialIcon  href={INSTAGRAM_URL} label="Instagram">
                <InstagramIcon />
              </SocialIcon>
              <SocialIcon href={TIKTOK_URL} label="TikTok">
                <TikTokIcon />
              </SocialIcon>
              <SocialIcon href={`https://wa.me/${WHATSAPP_NUMBER}`} label="WhatsApp">
                <WhatsAppIcon />
              </SocialIcon>
              <SocialIcon href={FACEBOOK_URL} label="Facebook">
                <FacebookIcon />
              </SocialIcon>
            </div>
          </div>

          {/* NEWSLETTER */}
          <div className="col-span-2 lg:col-span-1">
            <FooterNewsletter />
          </div>
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

function SocialIcon({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    
    <a  href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="flex h-9 w-9 items-center justify-center rounded-full border border-gold/25 text-parchment/80 transition-colors hover:border-gold hover:text-gold"
    >
      {children}
    </a>
  );
}

function InstagramIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function TikTokIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M16.5 2c.3 2.1 1.7 3.6 4 3.8v3.1c-1.4.1-2.7-.3-4-1.1v6.8c0 3.5-2.8 6.4-6.3 6.4S3.9 17.9 3.9 14.6c0-3.4 2.6-6.1 6-6.4v3.2c-1.6.2-2.8 1.5-2.8 3.2 0 1.8 1.5 3.2 3.3 3.2s3.3-1.4 3.3-3.2V2h2.8Z" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2a10 10 0 0 0-8.6 15L2 22l5.2-1.4A10 10 0 1 0 12 2Zm0 18a8 8 0 0 1-4.1-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8 8 0 1 1 12 20Zm4.4-5.9c-.2-.1-1.4-.7-1.6-.8-.2-.1-.4-.1-.5.1-.2.2-.6.8-.7.9-.1.2-.3.2-.5.1-.2-.1-1-.4-1.9-1.2-.7-.6-1.2-1.4-1.3-1.6-.1-.2 0-.4.1-.5l.4-.4c.1-.1.2-.2.2-.4s0-.3 0-.4c0-.1-.5-1.3-.7-1.7-.2-.5-.4-.4-.5-.4h-.5c-.2 0-.4.1-.6.3-.2.2-.8.8-.8 1.9s.8 2.2.9 2.4c.1.2 1.6 2.5 4 3.5.6.2 1 .4 1.3.5.6.2 1 .1 1.4-.1.4-.2 1.4-.6 1.6-1.1.2-.5.2-.9.1-1Z" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
      <path d="M13.5 21v-8h2.7l.4-3.1h-3.1V8c0-.9.2-1.5 1.6-1.5h1.6V3.7C15.9 3.6 15 3.5 13.9 3.5c-2.2 0-3.7 1.3-3.7 3.8v2.6H7.5V13H10.2v8h3.3Z" />
    </svg>
  );
}