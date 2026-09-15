import { CONTACT_EMAIL, INSTAGRAM_URL, TIKTOK_URL, FACEBOOK_URL, } from "@/lib/socials";
import ContactForm from "@/components/ContactForm";

export default function ContactPage() {
  return (
    <div>
      <div className="border-b border-gold/10 bg-ink-soft py-10 text-center">
        <h1 className="font-display text-3xl tracking-[0.1em] text-parchment">Contact Us</h1>
      </div>

      <div className="mx-auto max-w-content px-5 py-16 md:px-10">
        {/* Top: Get in touch + image */}
        <div className="flex flex-col overflow-hidden border border-gold/10 md:flex-row">
          <div className="flex-1 bg-ink-soft p-8 md:p-12">
            <p className="text-xs tracking-[0.25em] text-gold">GET IN TOUCH</p>
            <div className="mt-3 h-px w-10 bg-gold/40" />

            <p className="mt-6 text-sm leading-relaxed text-smoke">
              We&apos;re here to help. Have questions about MPAROMA fragrances?
              Our friendly support team is ready to assist you with orders,
              product inquiries, and customer support. Contact us anytime for
              a smooth and satisfying shopping experience.
            </p>

            
            <a  href={`mailto:${CONTACT_EMAIL}`}
              className="mt-8 inline-block border-b border-parchment text-xl text-parchment"
            >
              {CONTACT_EMAIL}
            </a>

            <p className="mt-10 text-xs tracking-[0.25em] text-gold">FOLLOW US</p>
            <div className="mt-3 h-px w-10 bg-gold/40" />
            <div className="mt-4 flex gap-3">
              <SocialLink href={TIKTOK_URL} label="TikTok"><TikTokIcon /></SocialLink>
              <SocialLink href={INSTAGRAM_URL} label="Instagram"><InstagramIcon /></SocialLink>
              <SocialLink href={FACEBOOK_URL} label="Facebook"><FacebookIcon /></SocialLink>
             
            </div>
          </div>

          <div className="flex-1">
            <img
              src="/images/contact-banner.jpg"
              alt="MPAROMA"
              className="h-full min-h-[400px] w-full object-cover"
            />
          </div>
        </div>

        {/* Bottom: form */}
        <div className="mt-16">
          <ContactForm />
        </div>
      </div>
    </div>
  );
}

function SocialLink({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  return (
    
     <a href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="flex h-9 w-9 items-center justify-center rounded-full border border-gold/25 text-parchment/80 transition-colors hover:border-gold hover:text-gold"
    >
      {children}
    </a>
  );
}

function TikTokIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M16.5 2c.3 2.1 1.7 3.6 4 3.8v3.1c-1.4.1-2.7-.3-4-1.1v6.8c0 3.5-2.8 6.4-6.3 6.4S3.9 17.9 3.9 14.6c0-3.4 2.6-6.1 6-6.4v3.2c-1.6.2-2.8 1.5-2.8 3.2 0 1.8 1.5 3.2 3.3 3.2s3.3-1.4 3.3-3.2V2h2.8Z" />
    </svg>
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
function FacebookIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
      <path d="M13.5 21v-8h2.7l.4-3.1h-3.1V8c0-.9.2-1.5 1.6-1.5h1.6V3.7C15.9 3.6 15 3.5 13.9 3.5c-2.2 0-3.7 1.3-3.7 3.8v2.6H7.5V13H10.2v8h3.3Z" />
    </svg>
  );
}