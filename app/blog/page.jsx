import PageHero from "@/components/common/PageHero";
import PageIntroBar from "@/components/common/PageIntroBar";
import BlogMasonry from "@/components/blog/BlogMasonry";
import { blogs } from "@/data/blogs";

export default function BlogPage() {
  return (
    <>
      <PageHero
        title="Insights"
        subtitle="Real Estate Intelligence & Market Analysis"
        image="https://images.unsplash.com/photo-1580041065738-e72023775cdc?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      />
      <PageIntroBar count={blogs.length} caption="Educational insights on property evaluation, investment, and market trends" />
      <BlogMasonry />
    </>
  );
}
