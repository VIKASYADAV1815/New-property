import PageHero from "@/components/common/PageHero";
import HowWeWorkSections from "@/components/how-we-work/HowWeWorkSections";

export default function HowWeWorkPage() {
  return (
    <>
      <PageHero
        title="How We Work"
        subtitle="Our Advisory Process & Evaluation Methodology"
        image="https://images.unsplash.com/photo-1523217582562-09d0def993a6?q=80&w=1600&auto=format&fit=crop"
      />
      <HowWeWorkSections />
    </>
  );
}

