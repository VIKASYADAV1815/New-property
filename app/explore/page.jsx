import PageHero from "@/components/common/PageHero";
import PageIntroBar from "@/components/common/PageIntroBar";
import CatalogLayout from "@/components/common/CatalogLayout";
import { Suspense } from "react";
import { exploreOptions } from "@/data/explore";
import { properties } from "@/data/properties";

export default function ExploreIndexPage() {
  const items = properties.slice(0, 6);
  return (
    <>
      <PageHero
        title="Explore"
        subtitle="Founder-led advisory: team, careers, contact and more"
        image="https://images.unsplash.com/photo-1515263487990-61b07816b324?q=80&w=1600&auto=format&fit=crop"
      />
      <PageIntroBar count={exploreOptions.length} caption="Explore site sections" />
      <Suspense fallback={<div className="max-w-350 mx-auto px-6 py-10">Loading explore listings…</div>}>
        <CatalogLayout items={items} />
      </Suspense>
    </>
  );
}
