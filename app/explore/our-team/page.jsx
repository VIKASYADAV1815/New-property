import PageHero from "@/components/common/PageHero";
import TeamLayout from "@/components/explore/TeamLayout";
import { exploreOptions } from "@/data/explore";
import { blogs } from "@/data/blogs";

export default function ExploreTeamPage() {
  const opt = exploreOptions.find((o) => o.slug === "our-team");
  // Indian founder images from Unsplash
  const founderImages = [
    "https://images.unsplash.com/photo-1566753323558-f4e0952af115?q=80&w=1200&auto=format&fit=crop", // Indian businessman portrait
    "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1200&auto=format&fit=crop",     // Professional portrait
    "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?q=80&w=1200&auto=format&fit=crop",     // Corporate headshot
    "https://images.unsplash.com/photo-1547425260-1f002d3a1d83?q=80&w=1200&auto=format&fit=crop",     // Executive portrait
    "https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=1200&auto=format&fit=crop",  // Founder portrait
    "https://images.unsplash.com/photo-1531123897727-8f129e9bdb2e?q=80&w=1200&auto=format&fit=crop",  // Business profile
  ];
  const items = Array.from({ length: 6 }, (_, i) => ({
    id: `team-${i}`,
    title: `Advisor ${i + 1}`,
    image: founderImages[i],
    role: "Senior Consultant"
  }));
  
  return (
    <>
      <PageHero title={opt?.title || "Our Team"} subtitle={opt?.subtitle || "Experienced advisors guiding you"} image={opt?.image} />
      <TeamLayout items={items} />
    </>
  );
}
