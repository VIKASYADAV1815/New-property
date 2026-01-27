import PageHero from "@/components/common/PageHero";
import CommunityList from "@/components/community/CommunityList";
import PageIntroBar from "@/components/common/PageIntroBar";
import { communities } from "@/data/communities";

export default function CommunityIndexPage() {
  return (
    <>
      <PageHero
        title="Curated Property Opportunities"
        subtitle="Carefully evaluated properties selected based on location strength, developer credibility, and long-term value"
        image="https://images.unsplash.com/photo-1515263487990-61b07816b324?q=80&w=1600&auto=format&fit=crop"
      />
      <PageIntroBar count={communities.length} caption="Properties evaluated for long-term suitability" />
      <CommunityList />
    </>
  );
}
