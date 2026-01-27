import PageHero from "@/components/common/PageHero";
import AboutLayout from "@/components/explore/AboutLayout";
import { exploreOptions } from "@/data/explore";

export default function ExploreAboutPage() {
  const opt = exploreOptions.find((o) => o.slug === "about");
  return (
    <>
      <PageHero title={opt?.title || "About Us"} subtitle={opt?.subtitle || "Crafting luxury experiences"} image={opt?.image} />
      <AboutLayout />
    </>
  );
}
