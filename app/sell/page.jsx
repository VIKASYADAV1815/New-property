import PageHero from "@/components/common/PageHero";
import PageIntroBar from "@/components/common/PageIntroBar";
import CatalogLayout from "@/components/common/CatalogLayout";
import { Suspense } from "react";
import { properties } from "@/data/properties";

export default function SellPage() {
  return (
    <>
      <PageHero
        title="Sell Your Property"
        subtitle="Structured guidance and transparent valuation"
        image="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1600&auto=format&fit=crop"
      />
      <PageIntroBar count={properties.length} caption="Showcase properties similar to yours" />
      <Suspense fallback={<div className="max-w-350 mx-auto px-6 py-10">Loading listings…</div>}>
        <CatalogLayout items={properties} />
      </Suspense>
    </>
  );
}
