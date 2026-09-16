import { notFound } from "next/navigation";
import { getAboutSectionById } from "@/lib/data";
import AboutSectionForm from "@/components/admin/AboutSectionForm";
export const dynamic = "force-dynamic";
export const revalidate = 0;
export default async function EditAboutSectionPage({ params }: { params: { id: string } }) {
  const section = await getAboutSectionById(params.id);
  if (!section) notFound();

  return (
    <div>
      <h1 className="mb-6 font-display text-2xl tracking-[0.1em]">EDIT ABOUT SECTION</h1>
      <AboutSectionForm initial={section} />
    </div>
  );
}