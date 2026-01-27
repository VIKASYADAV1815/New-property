"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import gsap from "gsap";
import { useEffect, useRef } from "react";

export default function CardBlog() {
  const ref = useRef(null);
  useEffect(() => {
    if (!ref.current) return;
    gsap.from(ref.current.querySelectorAll(".reveal"), {
      opacity: 0,
      y: 20,
      duration: 0.8,
      stagger: 0.1,
    });
  }, []);
  return (
    <section ref={ref} className="py-24 bg-white">
      <div className="max-w-350 mx-auto px-6">
        <div className="mb-10 reveal">
          <span className="text-sm font-bold uppercase tracking-widest text-gray-500">Blog</span>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 font-sans tracking-tight">Insights & News</h1>
          <p className="text-gray-500 mt-2">Market updates and guides for buyers and investors.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1,2,3].map((i) => (
            <motion.article key={i} initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} className="border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all reveal">
              <div className="relative h-40">
                <Image src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1200&auto=format&fit=crop" alt="Blog" fill className="object-cover" />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-900">Luxury Trends {i}</h3>
                <p className="text-gray-500 text-sm mt-1">Exploring premium markets and investment strategies.</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

