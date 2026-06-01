import PageHero from "@/components/common/PageHero";
import PageIntroBar from "@/components/common/PageIntroBar";
import CommunityShowcase from "@/components/community/CommunityShowcase";
import api from "@/utils/api";
import { communities } from "@/data/communities";
import {
  getCityCandidatesFromSlug,
  mergeUniqueProperties,
  prettyCityFromSlug,
} from "@/utils/communityCity";

export async function generateStaticParams() {
  return communities.map((community) => ({
    slug: community.slug,
  }));
}

export default async function CommunityPage({ params }) {
  const { slug } = await params;
  if (!slug) {
    return <div>Community not found</div>;
  }
  const cityName = prettyCityFromSlug(slug);
  const cityCandidates = getCityCandidatesFromSlug(slug);
  let items = [];
  try {
    const groups = await Promise.all(
      cityCandidates.map(async (city) => {
        try {
          const { data } = await api.get(`/properties/city/${encodeURIComponent(city)}`);
          return Array.isArray(data?.items) ? data.items : [];
        } catch {
          return [];
        }
      })
    );
    items = mergeUniqueProperties(groups);
  } catch (err) {
    console.error(err);
  }
  const fallbackCommunity = {
    slug,
    name: cityName,
    projects: items.length,
    image: "https://images.unsplash.com/photo-1515263487990-61b07816b324?q=80&w=1600&auto=format&fit=crop",
  };
  return (
    <>
      <PageHero
        title={`Properties in ${fallbackCommunity.name}`}
        subtitle={`Curated property opportunities evaluated for location strength, developer credibility, and long-term value`}
        image={fallbackCommunity.image}
      />
      <PageIntroBar count={items.length} caption="Carefully evaluated properties" />
      <CommunityShowcase community={fallbackCommunity} items={items} />
    </>
  );
}