import Link from "next/link";
import { getVouchers } from "@/lib/data";
import DeleteVoucherButton from "@/components/admin/DeleteVoucherButton";
export const dynamic = "force-dynamic";
export const revalidate = 0;
export default async function AdminVouchersPage() {
  const vouchers = await getVouchers();

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="font-display text-2xl tracking-[0.1em]">VOUCHERS</h1>
        <Link href="/admin/vouchers/new"
          className="border border-gold px-4 py-2 text-xs tracking-[0.15em] text-gold hover:bg-gold hover:text-ink">
          + ADD VOUCHER
        </Link>
      </div>

      <div className="divide-y divide-gold/10 border border-gold/10">
        {vouchers.length === 0 && (
          <p className="p-4 text-sm text-smoke">Koi voucher nahi bana abhi.</p>
        )}
        {vouchers.map((v) => (
          <div key={v.id} className="flex items-center gap-4 p-4">
            <p className="flex-1 font-semibold text-gold">{v.code}</p>
            <p className="text-sm text-parchment">{v.percent}% OFF</p>
            <DeleteVoucherButton id={v.id} />
          </div>
        ))}
      </div>
    </div>
  );
}