import PageHero from "@/components/common/PageHero";
import AboutSections from "@/components/about/AboutSections";

export default function AboutPage() {
  return (
    <>
      <PageHero
        title="About the Founder"
        subtitle="Akshit Kapoor's Journey in Real Estate"
        image="https://images.unsplash.com/photo-1523217582562-09d0def993a6?q=80&w=1600&auto=format&fit=crop"
      />
      <AboutSections />
    </>
  );
}
