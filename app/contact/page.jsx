import PageHero from "@/components/common/PageHero";
import ContactSections from "@/components/contact/ContactSections";

export default function ContactPage() {
  return (
    <>
      <PageHero
        title="Let's Discuss Your Property Requirement"
        subtitle="Schedule a consultation with our advisory team"
        image="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1600&auto=format&fit=crop"
      />
      <ContactSections />
    </>
  );
}
