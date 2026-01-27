import PageHero from "@/components/common/PageHero";
import ServicesSections from "@/components/services/ServicesSections";

export default function ServicesPage() {
  return (
    <>
      <PageHero
        title="Services"
        subtitle="Comprehensive Property Advisory Across All Formats"
        image="https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1600&auto=format&fit=crop"
      />
      <ServicesSections />
    </>
  );
}

