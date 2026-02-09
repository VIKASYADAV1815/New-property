import Image from "next/image";
import { notFound } from "next/navigation";
import BlogDetailClient from "@/components/blog/BlogDetailClient";
import api from "@/utils/api";

async function getBlog(id) {
  try {
    const res = await api.get(`/blogs/${id}`);
    return res.data.blog;
  } catch {
    return null;
  }
}

async function getRelatedBlogs() {
  try {
    const res = await api.get("/blogs");
    return res.data.blogs || [];
  } catch {
    return [];
  }
}

export default async function BlogDetailByIdPage({ params }) {
  // ✅ THIS IS THE FIX
  const { id } = await params;

  const blog = await getBlog(id);
  if (!blog) notFound();

  const allBlogs = await getRelatedBlogs();
  const related = allBlogs
    .filter((b) => b._id !== blog._id)
    .slice(0, 3);

  return (
    <section className="bg-white">
      <div className="relative h-[40vh] md:h-[55vh]">
        <Image
          src={blog.image}
          alt={blog.title}
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute bottom-6 left-6 right-6 text-white">
          <div className="text-xs uppercase opacity-80">
            {new Date(blog.createdAt).toDateString()}
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mt-2">
            {blog.title}
          </h1>
        </div>
      </div>

      <BlogDetailClient blog={blog} related={related} />
    </section>
  );
}





