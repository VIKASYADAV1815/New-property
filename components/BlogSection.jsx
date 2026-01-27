"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { blogs } from "@/data/blogs";

const filters = ["All", "Trending News", "Area Guide", "Budget Homes", "Finance", "Investment", "Buying Guide", "Smart Home", "Lifestyle"];

export default function BlogSection() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredBlogs = activeFilter === "All" 
    ? blogs 
    : blogs.filter(blog => blog.tag === activeFilter);
  
  const displayBlogs = filteredBlogs.slice(0, 6);

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-10 md:mb-12 gap-6 md:gap-0">
            <div>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 font-sans tracking-tight mb-6">Insights & Market Intelligence</h2>
                {/* Capsule Filters */}
                <div className="flex flex-wrap gap-3">
                    {filters.map((filter) => (
                        <button
                            key={filter}
                            onClick={() => setActiveFilter(filter)}
                            className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all border ${
                                activeFilter === filter 
                                ? "bg-sky-500 text-white border-sky-500" 
                                : "bg-white text-gray-500 border-gray-200 hover:border-sky-500 hover:text-sky-500"
                            }`}
                        >
                            {filter}
                        </button>
                    ))}
                </div>
            </div>
            
            <Link href="/blog" className="flex items-center gap-2 text-sm font-bold border border-gray-300 px-6 py-2 rounded-full hover:bg-sky-500 hover:text-white hover:border-sky-500 transition-all whitespace-nowrap">
                View All Blogs <ArrowRight className="w-4 h-4" />
            </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayBlogs.map((blog, idx) => (
            <Link key={blog.slug || blog.id || idx} href={`/blog/${blog.slug}`} className="group">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <div className="relative h-62.5 rounded-2xl overflow-hidden mb-6">
                  <Image
                    src={blog.image}
                    alt={blog.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4 bg-sky-500 text-white px-3 py-1 rounded text-[10px] font-bold uppercase tracking-wider">
                    {blog.tag}
                  </div>
                </div>
                <div className="flex items-center gap-2 mb-3 text-xs font-bold text-gray-400 uppercase tracking-wider">
                  <span>{blog.date}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 leading-snug group-hover:text-gray-600 transition-colors">
                  {blog.title}
                </h3>
                <span className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider border-b border-sky-500 pb-0.5 group-hover:border-gray-400 transition-colors">
                  Read Article <ArrowUpRight className="w-3 h-3" />
                </span>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
