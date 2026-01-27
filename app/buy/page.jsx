import PageHero from "@/components/common/PageHero";
import PageIntroBar from "@/components/common/PageIntroBar";
import CatalogLayout from "@/components/common/CatalogLayout";
import { Suspense } from "react";
import { properties } from "@/data/properties";

export default function BuyPage() {
  return (
    <>
      <PageHero
        title="Buy Luxury Properties"
        subtitle="Advisory-led, insight-driven selection across Delhi NCR"
        image="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1600&auto=format&fit=crop"
      />
      <PageIntroBar count={properties.length} caption="Browse handpicked luxury listings" />
      <Suspense fallback={<div className="max-w-350 mx-auto px-6 py-10">Loading listings…</div>}>
        <CatalogLayout items={properties} />
      </Suspense>
    </>
  );
}
