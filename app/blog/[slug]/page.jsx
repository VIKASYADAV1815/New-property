import Image from "next/image";
import { notFound } from "next/navigation";
import { blogs } from "@/data/blogs";
import BlogDetailClient from "@/components/blog/BlogDetailClient";

export async function generateStaticParams() {
  return blogs.map((b) => ({ slug: b.slug }));
}

export default function BlogDetailBySlugPage({ params }) {
  const { slug } = params || {};
  const key = decodeURIComponent(String(slug || ""));
  const blog =
    blogs.find((b) => String(b.slug) === key) ||
    {
      id: `fallback-${key}`,
      slug: key,
      title: key.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
      date: "January 24, 2026",
      tag: "Article",
      image:
        "https://images.unsplash.com/photo-1496568816309-51d7c20e3b21?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      rating: "★ 4.6/5",
    };

  const related = blogs.filter((b) => b.slug !== blog.slug).slice(0, 3);

  return (
    <section className="bg-white">
      {/* Responsive hero image container */}
      <div className="relative h-[30vh] xs:h-[36vh] sm:h-[40vh] md:h-[52vh]">
        <Image
          src={blog.image}
          alt={blog.title}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/30 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4 xs:bottom-5 xs:left-5 xs:right-5 sm:bottom-6 sm:left-6 sm:right-6">
          {/* Meta row: stacked on xs, inline on sm+ */}
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[10px] xs:text-xs font-bold text-white/80 uppercase tracking-wider">
            <span>{blog.tag}</span>
            <span className="hidden xs:inline">•</span>
            <span>{blog.date}</span>
            <span className="hidden xs:inline">•</span>
            <span>{blog.rating || "★ 4.7/5"}</span>
          </div>
          {/* Title: smaller on xs, default on sm+ */}
          <h1 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl font-bold text-white mt-2">
            {blog.title}
          </h1>
        </div>
      </div>

      <BlogDetailClient blog={blog} related={related} />
    </section>
  );
}
