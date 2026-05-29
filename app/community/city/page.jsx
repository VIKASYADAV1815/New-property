import CommunityCityClient from "@/components/community/CommunityCityClient";

export default function CommunityCityPage({ searchParams }) {
  const slug = searchParams?.slug || "";
  return <CommunityCityClient slug={slug} />;
}
