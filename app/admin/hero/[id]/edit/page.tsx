import { notFound } from "next/navigation";
import { getHeroSlideById } from "@/lib/data";
import HeroSlideForm from "@/components/admin/HeroSlideForm";
export const dynamic = "force-dynamic";
export const revalidate = 0;
export default async function EditHeroSlidePage({ params }: { params: { id: string } }) {
  const slide = await getHeroSlideById(params.id);
  if (!slide) notFound();

  return (
    <div>
      <h1 className="mb-6 font-display text-2xl tracking-[0.1em]">EDIT HERO SLIDE</h1>
      <HeroSlideForm initial={slide} />
    </div>
  );
}