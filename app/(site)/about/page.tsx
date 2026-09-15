import { getAboutSections } from "@/lib/data";

export default async function AboutPage() {
  const sections = await getAboutSections();

  return (
    <div>
      <div className="border-b border-gold/10 bg-ink-soft py-10 text-center">
        <h1 className="font-display text-3xl tracking-[0.1em] text-parchment">About Us</h1>
      </div>

      <div className="mx-auto max-w-content space-y-20 px-5 py-16 md:px-10">
        {sections.map((s) => (
          <div
            key={s.id}
            className={`flex flex-col items-center gap-10 md:flex-row md:gap-16 ${
              s.imagePosition === "left" ? "md:flex-row-reverse" : ""
            }`}
          >
            <div className="w-full md:w-1/2">
              <h2 className="font-display text-4xl text-parchment">{s.title}</h2>
              <div className="mt-4 flex items-center gap-3">
                <span className="h-px w-8 bg-gold/40" />
                <p className="text-xs tracking-[0.25em] text-smoke">{s.eyebrow}</p>
              </div>
              <p className="mt-6 text-base leading-relaxed text-smoke">{s.description}</p>
            </div>

            {s.image && (
              <div className="w-full md:w-1/2">
                <img
                  src={s.image}
                  alt={s.title}
                  className="aspect-[3/2] w-full rounded-sm object-cover"
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
