"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import PageHero from "@/components/common/PageHero";
import PageIntroBar from "@/components/common/PageIntroBar";
import CommunityShowcase from "@/components/community/CommunityShowcase";
import api from "@/utils/api";

const prettyCity = (slug) =>
  String(slug || "")
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join(" ");

export default function CommunityCityPage() {
  const searchParams = useSearchParams();
  const slug = searchParams.get("slug") || "";
  const cityName = useMemo(() => prettyCity(slug), [slug]);

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const load = async () => {
      if (!cityName) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const { data } = await api.get(`/properties/city/${encodeURIComponent(cityName)}`);
        if (!mounted) return;
        setItems(Array.isArray(data?.items) ? data.items : []);
      } catch {
        if (!mounted) return;
        setItems([]);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    load();
    return () => {
      mounted = false;
    };
  }, [cityName]);

  const fallbackCommunity = {
    slug,
    name: cityName || "Community",
    projects: items.length,
    image:
      "https://images.unsplash.com/photo-1515263487990-61b07816b324?q=80&w=1600&auto=format&fit=crop",
  };

  return (
    <>
      <PageHero
        title={cityName ? `Properties in ${cityName}` : "Community not found"}
        subtitle="Curated property opportunities evaluated for location strength, developer credibility, and long-term value"
        image={fallbackCommunity.image}
      />
      <PageIntroBar
        count={loading ? 0 : items.length}
        caption={loading ? "Loading properties..." : "Carefully evaluated properties"}
      />
      <CommunityShowcase community={fallbackCommunity} items={items} />
    </>
  );
}
