"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function BlogMasonry({ blogs = [], loading = false }) {
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 9;

  const [featuredIndex, setFeaturedIndex] = useState(0);
  const sidebarRef = useRef(null);

  const [activeFilter, setActiveFilter] = useState("All");
  const [email, setEmail] = useState("");
  const [toast, setToast] = useState(null);

  /* ================= FILTER + PAGINATION ================= */

  const filteredBlogs =
    activeFilter === "All"
      ? blogs
      : blogs.filter((b) => b.tag === activeFilter);

  const totalPages = Math.ceil(filteredBlogs.length / blogsPerPage);

  const paginatedBlogs = filteredBlogs.slice(
    (currentPage - 1) * blogsPerPage,
    currentPage * blogsPerPage
  );

  /* ================= EFFECTS ================= */

  useEffect(() => {
    const interval = setInterval(() => {
      setFeaturedIndex((prev) => (prev + 1) % 3);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  /* ================= HANDLERS ================= */

  const handleSubscribe = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setToast({ message: "Please enter a valid email address.", type: "error" });
      return;
    }
    setToast({ message: "Successfully subscribed!", type: "success" });
    setEmail("");
  };

  /* ================= STATIC SIDEBAR DATA ================= */

  const featuredProperties = [
    {
      title: "Palm Residency, Gurgaon",
      tag: "Luxury Villa",
      price: "₹4.2 Cr",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop",
    },
    {
      title: "Skyline Apartments, Delhi",
      tag: "Premium Flat",
      price: "₹2.8 Cr",
      image: "https://images.unsplash.com/photo-1705224981158-fc278e4d68fd?q=80&w=1170&auto=format&fit=crop",
    },
    {
      title: "The Palms, Dehradun",
      tag: "Modern Villa",
      price: "₹3.5 Cr",
      image: "https://images.unsplash.com/photo-1603261343604-0b907606ade0?q=80&w=1200&auto=format&fit=crop",
    },
  ];

  /* ================= UI ================= */

  return (
    <section className="py-12 bg-white">
      <div className="max-w-350 mx-auto px-6">
        <div className="lg:flex lg:gap-8">

          {/* ================= BLOG GRID ================= */}
          <div className="lg:flex-1">

            {loading && (
              <p className="text-center text-gray-500">Loading blogs...</p>
            )}

            {!loading && paginatedBlogs.length === 0 && (
              <p className="text-center text-gray-500">No blogs found.</p>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginatedBlogs.map((b, idx) => (
                <Link
                  key={b._id}
                 href={`/blog/${b._id}`}
                  className={idx % 5 === 0 ? "sm:col-span-2" : ""}
                >
                  <motion.article
                    className="relative rounded-2xl border border-gray-200 bg-white overflow-hidden group"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="relative h-44">
                      <Image
                        src={b.image}
                        alt={b.title}
                        fill
                        className="object-cover"
                      />
                      <span className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-sky-500 text-white px-4 py-2 rounded-full text-sm font-bold opacity-0 group-hover:opacity-100 transition">
                        Read More
                      </span>
                    </div>

                    <div className="p-4">
                      <div className="text-xs font-bold text-sky-600 uppercase">
                        {b.tag || "General"}
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 mt-1">
                        {b.title}
                      </h3>
                      <p className="text-xs text-gray-500 mt-1">
                        {b.createdAt
                          ? new Date(b.createdAt).toDateString()
                          : ""}
                      </p>
                      <p className="mt-3 text-xs text-gray-600 line-clamp-3">
                        {b.excerpt || "Read full article for insights"}
                      </p>
                    </div>
                  </motion.article>
                </Link>
              ))}
            </div>

            {/* ================= PAGINATION ================= */}
            {totalPages > 1 && (
              <div className="mt-6 flex justify-center gap-3">
                {Array.from({ length: totalPages }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`w-10 h-10 rounded-full border ${
                      currentPage === i + 1
                        ? "bg-sky-500 text-white border-sky-500"
                        : "border-gray-300"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ================= SIDEBAR ================= */}
          <aside className="lg:w-[320px]" ref={sidebarRef}>
            <div className="sticky top-24 flex flex-col gap-6">

              {/* TAG FILTER */}
              <div className="border rounded-2xl p-6">
                <h4 className="font-bold mb-4">Popular Tags</h4>
                <div className="flex flex-wrap gap-2">
                  {["All", "Trending News", "Area Guide", "Buying Guide"].map((t) => (
                    <button
                      key={t}
                      onClick={() => {
                        setActiveFilter(t);
                        setCurrentPage(1);
                      }}
                      className={`px-3 py-1 rounded-full border text-sm ${
                        activeFilter === t
                          ? "bg-sky-500 text-white"
                          : ""
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* NEWSLETTER */}
              <div className="border rounded-2xl p-6">
                <h4 className="font-bold mb-3">Newsletter</h4>
                <div className="flex gap-2">
                  <input
                    className="flex-1 border px-3 py-2 rounded-lg text-sm"
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <button
                    onClick={handleSubscribe}
                    className="bg-black text-white px-4 rounded-lg"
                  >
                    Subscribe
                  </button>
                </div>
              </div>

            </div>
          </aside>
        </div>
      </div>

      {/* ================= TOAST ================= */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="fixed bottom-10 left-1/2 -translate-x-1/2 bg-black text-white px-6 py-3 rounded-full"
          >
            {toast.message}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
