import { getDiscoverySetContent } from "@/lib/data";
import DiscoverySetForm from "@/components/admin/DiscoverySetForm";
export const dynamic = "force-dynamic";
export const revalidate = 0;
export default async function AdminDiscoverySetPage() {
  const content = await getDiscoverySetContent();
  return (
    <div>
      <h1 className="mb-6 font-display text-2xl tracking-[0.1em]">DISCOVERY SET</h1>
      <DiscoverySetForm initial={content} />
    </div>
  );
}