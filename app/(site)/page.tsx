import Hero from "@/components/Hero";
import DiscoverByScent from "@/components/DiscoverByScent";
import BestSellers from "@/components/BestSellers";
import DiscoverySet from "@/components/DiscoverySet";
import Reviews from "@/components/Reviews";
import Newsletter from "@/components/Newsletter";
export const dynamic = "force-dynamic";
export const revalidate = 0;

export default function Home() {
  return (
    <>
      <Hero />
      <DiscoverByScent />
      <BestSellers />
      <DiscoverySet />
      <Reviews />
      <Newsletter />
    </>
  );
}