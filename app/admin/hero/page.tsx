import Link from "next/link";
import { getHeroSlides } from "@/lib/data";
import DeleteHeroSlideButton from "@/components/admin/DeleteHeroSlideButton";
export const dynamic = "force-dynamic";
export const revalidate = 0;
export default async function AdminHeroPage() {
  const slides = await getHeroSlides();

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="font-display text-2xl tracking-[0.1em]">HERO SLIDES</h1>
        <Link href="/admin/hero/new"
          className="border border-gold px-4 py-2 text-xs tracking-[0.15em] text-gold hover:bg-gold hover:text-ink">
          + ADD SLIDE
        </Link>
      </div>

      <div className="divide-y divide-gold/10 border border-gold/10">
        {slides.map((s) => (
          <div key={s.id} className="flex items-center gap-4 p-4">
            <img src={s.backgroundImage} alt={s.heading} className="h-14 w-20 object-cover" />
            <div className="flex-1">
              <p className="text-sm">{s.heading}</p>
              <p className="text-xs text-smoke">Order: {s.order}</p>
            </div>
            <Link href={`/admin/hero/${s.id}/edit`} className="text-xs text-gold hover:underline">
              EDIT
            </Link>
            <DeleteHeroSlideButton id={s.id} />
          </div>
        ))}
      </div>
    </div>
  );
}