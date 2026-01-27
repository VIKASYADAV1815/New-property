import PageHero from "@/components/common/PageHero";
import PageIntroBar from "@/components/common/PageIntroBar";
import CatalogLayout from "@/components/common/CatalogLayout";
import { Suspense } from "react";
import { properties } from "@/data/properties";

export default function RentPage() {
  return (
    <>
      <PageHero
        title="Rent Luxury Properties"
        subtitle="Right-fit rentals backed by clarity and evaluation"
        image="https://images.unsplash.com/photo-1523217582562-09d0def993a6?q=80&w=1600&auto=format&fit=crop"
      />
      <PageIntroBar count={properties.length} caption="Explore premium rentals" />
      <Suspense fallback={<div className="max-w-350 mx-auto px-6 py-10">Loading rentals…</div>}>
        <CatalogLayout items={properties} />
      </Suspense>
    </>
  );
}
