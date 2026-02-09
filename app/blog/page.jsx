"use client";

import { useEffect, useState } from "react";
import PageHero from "@/components/common/PageHero";
import PageIntroBar from "@/components/common/PageIntroBar";
import BlogMasonry from "@/components/blog/BlogMasonry";
import api from "@/utils/api";

export default function BlogPage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadBlogs = async () => {
    try {
      setLoading(true);

      const { data } = await api.get("/blogs");
      console.log("Fetched blogs:", data);

      // ✅ BACKEND STRUCTURE FIX
      if (data?.success && Array.isArray(data.blogs)) {
        setBlogs(data.blogs);
      } else {
        setBlogs([]);
      }
    } catch (error) {
      console.error("Failed to load blogs", error);
      setBlogs([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBlogs();
  }, []);

  return (
    <>
      <PageHero
        title="Insights"
        subtitle="Real Estate Intelligence & Market Analysis"
        image="https://images.unsplash.com/photo-1580041065738-e72023775cdc?q=80&w=1170&auto=format&fit=crop"
      />

      <PageIntroBar
        count={blogs.length}
        caption="Educational insights on property evaluation, investment, and market trends"
      />

      <BlogMasonry blogs={blogs} loading={loading} />
    </>
  );
}
