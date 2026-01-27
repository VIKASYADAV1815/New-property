import PageHero from "@/components/common/PageHero";
import CardTeam from "@/components/our-team/CardTeam";

export default function OurTeamPage() {
  return (
    <>
      <PageHero
        title="Our Team"
        subtitle="Experienced advisors guiding you"
        image="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1600&auto=format&fit=crop"
      />
      <CardTeam />
    </>
  );
}
