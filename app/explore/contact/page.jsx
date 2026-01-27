import PageHero from "@/components/common/PageHero";
import ContactLayout from "@/components/explore/ContactLayout";
import { exploreOptions } from "@/data/explore";

export default function ExploreContactPage() {
  const opt = exploreOptions.find((o) => o.slug === "contact");
  return (
    <>
      <PageHero title={opt?.title || "Contact Us"} subtitle={opt?.subtitle || "We’re here to help"} image={opt?.image} />
      <ContactLayout />
    </>
  );
}
