"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { blogs } from "@/data/blogs";

export default function BlogMasonry() {
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 9; // adjust per page
  const [featuredIndex, setFeaturedIndex] = useState(0);
  const sidebarRef = useRef(null);
  
  const [activeFilter, setActiveFilter] = useState("All");
  const [email, setEmail] = useState("");
  const [toast, setToast] = useState(null);

  const filteredBlogs = activeFilter === "All" ? blogs : blogs.filter(b => b.tag === activeFilter);
  const totalPages = Math.ceil(filteredBlogs.length / blogsPerPage);
  const paginatedBlogs = filteredBlogs.slice((currentPage - 1) * blogsPerPage, currentPage * blogsPerPage);
  const [visibleBlogs, setVisibleBlogs] = useState(blogsPerPage);

  // Auto-rotate featured property every 5s
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

  const handleSubscribe = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        setToast({ message: "Please enter a valid email address.", type: "error" });
        return;
    }
    setToast({ message: "Successfully subscribed to newsletter!", type: "success" });
    setEmail("");
  };


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
      image: "https://images.unsplash.com/photo-1705224981158-fc278e4d68fd?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      title: "The Palms, Dehradun",
      tag: "Modern Villa",
      price: "₹3.5 Cr",
      image: "https://images.unsplash.com/photo-1603261343604-0b907606ade0?q=80&w=1200&auto=format&fit=crop",
    },
  ];

  return (
    <section className="py-12 bg-white">
      <div className="max-w-350 mx-auto px-6">
        <div className="lg:flex lg:gap-8">

          {/* Blog Grid */}
          <div className="lg:flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginatedBlogs.map((b, idx) => (
                <Link key={`${b.slug || b.id}-${idx}`} href={`/blog/${b.slug || b.id}`} className={idx % 5 === 0 ? "sm:col-span-2" : ""}>
                  <motion.article
                    className="relative rounded-2xl border border-gray-200 bg-white overflow-hidden group"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="relative h-44">
                      <Image src={b.image} alt={b.title} fill className="object-cover" />
                      <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        whileHover={{ opacity: 1, y: 0 }}
                        className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-sky-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg opacity-0 group-hover:opacity-100 transition-all"
                      >
                        Read More
                      </motion.span>
                    </div>
                    <div className="p-4">
                      <div className="text-xs font-bold text-sky-600 uppercase">{b.tag}</div>
                      <h3 className="text-lg font-bold text-gray-900 mt-1">{b.title}</h3>
                      <p className="text-xs text-gray-500 mt-1">{b.date}</p>
                      <div className="mt-3 text-xs text-gray-600 leading-relaxed">
                        Market insights, area guides, and RERA updates across Delhi NCR.
                      </div>
                    </div>
                  </motion.article>
                </Link>
              ))}
            </div>

            {/* Circular Pagination */}
            {totalPages > 1 && (
              <div className="mt-6 flex justify-center gap-3">
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`w-10 h-10 rounded-full flex items-center justify-center border transition-all ${
                      currentPage === i + 1
                        ? "bg-sky-500 text-white border-sky-500"
                        : "border-gray-300 text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside className="lg:w-[320px] shrink-0" ref={sidebarRef}>
            <div className="flex flex-col gap-6 sticky top-24">
              {/* Popular Tags */}
              <div className="rounded-2xl border border-gray-200 p-6 bg-white">
                <h4 className="text-xl font-bold text-gray-900 mb-4">Popular Tags</h4>
                <div className="flex flex-wrap gap-2">
                  {["All", "Trending News", "Area Guide", "Buying Guide", "Smart Home", "Lifestyle"].map((t) => (
                    <button
                      key={t}
                      onClick={() => { setActiveFilter(t); setCurrentPage(1); }}
                      className={`px-3 py-1 rounded-full border text-sm transition-colors ${
                        activeFilter === t 
                        ? "bg-sky-500 text-white border-sky-500" 
                        : "border-gray-200 hover:border-sky-500 hover:text-sky-600"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* Newsletter */}
              <div className="rounded-2xl border border-gray-200 p-6 bg-white">
                <h4 className="text-xl font-bold text-gray-900 mb-3">Newsletter</h4>
                <div className="flex gap-2">
                  <input
                    className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-sky-500"
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <button 
                    onClick={handleSubscribe}
                    className="px-4 py-2 rounded-lg bg-black text-white text-sm font-bold hover:bg-gray-800 transition-colors"
                  >
                    Subscribe
                  </button>
                </div>
              </div>

              {/* Auto-Rotating Featured Property */}
              <div className="rounded-2xl border border-gray-200 p-6 bg-white hover:shadow-lg transition">
                <h4 className="text-xl font-bold text-gray-900 mb-4">Featured Property</h4>
                <div className="relative h-36 rounded-lg overflow-hidden">
                  <Image
                    src={featuredProperties[featuredIndex].image}
                    alt={featuredProperties[featuredIndex].title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="mt-3">
                  <div className="text-xs font-bold uppercase text-sky-600">{featuredProperties[featuredIndex].tag}</div>
                  <h5 className="font-bold text-gray-900 mt-1">{featuredProperties[featuredIndex].title}</h5>
                  <p className="text-xs text-gray-500 mt-1">{featuredProperties[featuredIndex].price}</p>
                  <button className="mt-3 w-full text-sm font-bold border border-gray-300 rounded-lg py-2 hover:border-black hover:text-black transition">
                    View Property
                  </button>
                </div>
              </div>

              {/* Editor’s Pick */}
              <div className="rounded-2xl border border-gray-200 p-6 bg-white hover:shadow-lg transition">
                <h4 className="text-xl font-bold text-gray-900 mb-4">Editor’s Pick</h4>
                <div className="relative h-28 rounded-lg overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1616587896595-51352538155b?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="Editor's Pick"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="mt-3">
                  <h5 className="font-bold text-gray-900 text-sm">Top 5 Luxury Villas</h5>
                  <p className="text-xs text-gray-500 mt-1">Our curated selection for discerning buyers.</p>
                </div>
              </div>

              {/* Market Snapshot */}
              <div className="rounded-2xl border border-gray-200 p-6 bg-white hover:shadow-lg transition">
                <h4 className="text-xl font-bold text-gray-900 mb-4">Market Snapshot</h4>
                <p className="text-sm text-gray-500 leading-relaxed">
                  Delhi NCR Average Prices: ₹4.1 Cr <br />
                  ROI Trends: 7.8% <br />
                  New Listings This Month: 52
                </p>
              </div>
            </div>
          </aside>

        </div>
      </div>
      <AnimatePresence>
        {toast && (
            <motion.div
                initial={{ opacity: 0, y: 50, x: '-50%' }}
                animate={{ opacity: 1, y: 0, x: '-50%' }}
                exit={{ opacity: 0, y: 20, x: '-50%' }}
                className="fixed bottom-10 left-1/2 z-50 bg-gray-900 text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-3"
            >
                <div className={`rounded-full p-1 ${toast.type === 'error' ? 'bg-red-500' : 'bg-green-500'}`}>
                    {toast.type === 'error' ? (
                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    ) : (
                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                    )}
                </div>
                <span className="text-sm font-bold">{toast.message}</span>
                <button onClick={() => setToast(null)} className="ml-2 text-gray-400 hover:text-white">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
