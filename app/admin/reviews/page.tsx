import { getDb } from "@/lib/mongodb";
import ReviewApprovalList from "@/components/admin/ReviewApprovalList";
import { Review } from "@/types/product";
export const dynamic = "force-dynamic";
export const revalidate = 0;
export default async function AdminReviewsPage() {
  let reviews: Review[] = [];

  try {
    const db = await getDb();
    const docs = await db.collection("reviews").find({}).sort({ createdAt: -1 }).toArray();
    reviews = docs.map(({ _id, ...rest }) => ({ id: String(_id), ...rest })) as Review[];
  } catch {
    reviews = [];
  }

  return (
    <div>
      <h1 className="font-display text-2xl tracking-[0.1em] text-parchment">REVIEWS</h1>
      <p className="mt-2 text-sm text-smoke">
        Naye customer reviews yahan pending mein aayenge — approve karte hi wo
        /reviews page par live ho jayenge.
      </p>
      <ReviewApprovalList reviews={reviews} />
    </div>
  );
}