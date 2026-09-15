import Link from "next/link";
import { getAboutSections } from "@/lib/data";
import DeleteAboutSectionButton from "@/components/admin/DeleteAboutSectionButton";

export default async function AdminAboutPage() {
  const sections = await getAboutSections();

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="font-display text-2xl tracking-[0.1em]">ABOUT PAGE SECTIONS</h1>
        <Link href="/admin/about/new"
          className="border border-gold px-4 py-2 text-xs tracking-[0.15em] text-gold hover:bg-gold hover:text-ink">
          + ADD SECTION
        </Link>
      </div>

      <div className="divide-y divide-gold/10 border border-gold/10">
        {sections.map((s) => (
          <div key={s.id} className="flex items-center gap-4 p-4">
            {s.image && <img src={s.image} alt={s.title} className="h-14 w-20 object-cover" />}
            <div className="flex-1">
              <p className="text-sm">{s.title}</p>
              <p className="text-xs text-smoke">Order: {s.order}</p>
            </div>
            <Link href={`/admin/about/${s.id}/edit`} className="text-xs text-gold hover:underline">
              EDIT
            </Link>
            <DeleteAboutSectionButton id={s.id} />
          </div>
        ))}
      </div>
    </div>
  );
}