import BestSellers from "@/components/BestSellers";
export const dynamic = "force-dynamic";
export const revalidate = 0;
export const metadata = {
  title: "Best Sellers | MPAROMA",
};

export default function BestSellersPage() {
  return <BestSellers />;
}