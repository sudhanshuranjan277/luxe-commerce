import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/sections/Hero";
import { CategoriesSection } from "@/components/sections/CategoriesSection";
import { FlashSale } from "@/components/sections/FlashSale";
import { TrendingSection } from "@/components/sections/TrendingSection";
import { CollectionsSection } from "@/components/sections/CollectionsSection";
import { WhyUs } from "@/components/sections/WhyUs";
import { Testimonials } from "@/components/sections/Testimonials";
import { InstagramGallery } from "@/components/sections/InstagramGallery";
import { Newsletter } from "@/components/sections/Newsletter";
import { BrandsStrip } from "@/components/sections/BrandsStrip";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <>
      <Hero />
      <BrandsStrip />
      <CategoriesSection />
      <FlashSale />
      <TrendingSection />
      <CollectionsSection />
      <WhyUs />
      <Testimonials />
      <InstagramGallery />
      <Newsletter />
    </>
  );
}
