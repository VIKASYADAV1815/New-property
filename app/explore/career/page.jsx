import PageHero from "@/components/common/PageHero";
import CareerLayout from "@/components/explore/CareerLayout";
import { exploreOptions } from "@/data/explore";

export default function ExploreCareerPage() {
  const opt = exploreOptions.find((o) => o.slug === "career");
  return (
    <>
      <PageHero title={opt?.title || "Careers"} subtitle={opt?.subtitle || "Build with a passionate crew"} image={opt?.image} />
      <CareerLayout />
    </>
  );
}
