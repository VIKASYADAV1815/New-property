import PageHero from "@/components/common/PageHero";
import TestimonialsSections from "@/components/testimonials/TestimonialsSections";

export default function TestimonialsPage() {
  return (
    <>
      <PageHero
        title="Testimonials"
        subtitle="Client Experiences: Trust, Clarity, and Informed Decisions"
        image="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1600&auto=format&fit=crop"
      />
      <TestimonialsSections />
    </>
  );
}

