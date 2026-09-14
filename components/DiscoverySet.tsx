import BracketButton from "@/components/ui/BracketButton";
import ImgWithFallback from "@/components/ui/ImgWithFallback";
import { getDiscoverySetContent } from "@/lib/data";

export default async function DiscoverySet() {
  const content = await getDiscoverySetContent();

  return (
    <section className="relative overflow-hidden border-b border-gold/10 bg-ink">
      <div className="relative flex min-h-[420px] items-center justify-center sm:min-h-[520px] md:min-h-[620px]">
        <ImgWithFallback
          src={content.backgroundImage}
          alt={content.heading}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-ink/55" />

        <div className="relative z-10 mx-5 flex max-w-lg flex-col items-center gap-4 rounded-sm border border-gold/30 bg-ink/50 px-8 py-10 text-center backdrop-blur-sm sm:px-12 sm:py-12">
          <p className="text-[0.65rem] tracking-[0.3em] text-smoke">
            THE DISCOVERY SET
          </p>
          <h2 className="font-display text-3xl tracking-[0.06em] text-parchment sm:text-4xl md:text-5xl">
            {content.heading}
          </h2>
          <p className="text-sm tracking-[0.1em] text-gold">
            {content.subtitle} &nbsp;•&nbsp; {content.priceLabel}
          </p>
          <BracketButton href={content.ctaHref} variant="solid" className="mt-2">
            {content.ctaLabel}
          </BracketButton>
        </div>
      </div>
    </section>
  );
}