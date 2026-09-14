import { getHeroSlides } from "@/lib/data";
import HeroSlider from "@/components/HeroSlider";

export default async function Hero() {
  const slides = await getHeroSlides();
  return <HeroSlider slides={slides} />;
}