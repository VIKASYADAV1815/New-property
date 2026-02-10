import PageHero from "@/components/common/PageHero";
import PageIntroBar from "@/components/common/PageIntroBar";
import CommunityShowcase from "@/components/community/CommunityShowcase";
import api from "@/utils/api";

export default async function CommunityPage({ params }) {
  const { slug } = await params;
  if (!slug) {
    return <div>Community not found</div>;
  }
  const cityName = slug.charAt(0).toUpperCase() + slug.slice(1);
  let items = [];
  try {
    const { data } = await api.get(`/properties/city/${cityName}`);
    items = data?.items || [];
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