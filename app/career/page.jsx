import PageHero from "@/components/common/PageHero";
import CareerSections from "@/components/career/CareerSections";

export default function CareerPage() {
  return (
    <>
      <PageHero
        title="Careers"
        subtitle="Build with a passionate crew"
        image="https://images.unsplash.com/photo-1523217582562-09d0def993a6?q=80&w=1600&auto=format&fit=crop"
      />
      <CareerSections />
    </>
  );
}
