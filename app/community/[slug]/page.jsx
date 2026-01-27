import PageHero from "@/components/common/PageHero";
import PageIntroBar from "@/components/common/PageIntroBar";
import CatalogLayout from "@/components/common/CatalogLayout";
import CommunityShowcase from "@/components/community/CommunityShowcase";
import { communities } from "@/data/communities";
import { properties } from "@/data/properties";

export default function CommunityPage({ params }) {
  const community = communities.find((c) => c.slug === params.slug);
  const rawSlug = params?.slug || "community";
  const fallbackCommunity = community || {
    slug: rawSlug,
    name: rawSlug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
    projects: 0,
    image:
      "https://images.unsplash.com/photo-1515263487990-61b07816b324?q=80&w=1600&auto=format&fit=crop",
  };
  const key = (fallbackCommunity.name || "").toLowerCase();
  const items = properties.filter((p) =>
    `${p.location} ${p.title}`.toLowerCase().includes(key)
  ).length
    ? properties.filter((p) =>
        `${p.location} ${p.title}`.toLowerCase().includes(key)
      )
    : properties.map((p, idx) => ({
        ...p,
        id: `${fallbackCommunity.slug}-${p.id}-${idx}`,
      }));
  return (
    <>
      <PageHero
        title={`Properties in ${fallbackCommunity.name}`}
        subtitle={`Curated property opportunities evaluated for location strength, developer credibility, and long-term value`}
        image={fallbackCommunity.image}
      />
      <PageIntroBar count={items.length} caption="Carefully evaluated properties" />
      <CommunityShowcase community={fallbackCommunity} />
    </>
  );
}

export async function generateStaticParams() {
  return communities.map((c) => ({ slug: c.slug }));
}
