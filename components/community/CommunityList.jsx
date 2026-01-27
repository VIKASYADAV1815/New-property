"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { communities } from "@/data/communities";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { usePathname } from "next/navigation";

export default function CommunityList() {
  const sectionRef = useRef(null);
  const pathname = usePathname();
  
  useEffect(() => {
    if (!sectionRef.current) return;
    
    // Use requestAnimationFrame to ensure DOM is ready
    const timer = requestAnimationFrame(() => {
      const elements = sectionRef.current.querySelectorAll(".reveal");
      
      // Set initial state
      gsap.set(elements, { opacity: 0, y: 20 });
      
      // Animate to visible state
      gsap.to(elements, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
      });
    });
    
    return () => cancelAnimationFrame(timer);
  }, [pathname]);

  return (
    <section ref={sectionRef} className="relative z-10 py-24 bg-white">
      <div className="max-w-350 mx-auto px-6">
        <div className="flex items-end justify-between mb-10 reveal" style={{ opacity: 0 }}>
          <div>
            <span className="text-sm font-bold uppercase tracking-widest text-gray-500">
              Community
            </span>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 font-sans tracking-tight">
              Explore Communities
            </h1>
          </div>
        </div>

        {/* Removed starter image grid to keep only clickable cards */}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {communities.map((c, idx) => (
            <motion.div
              key={c.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.05 * idx }}
              className="border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all"
            >
              <div className="relative h-44 reveal" style={{ opacity: 0 }}>
                <Image
                  src={c.image}
                  alt={c.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-gray-900 font-sans tracking-tight">
                    {c.name}
                  </h3>
                  <span className="text-xs font-bold text-sky-600">
                    {c.projects} Projects
                  </span>
                </div>
                <p className="text-gray-500 text-sm mt-2">
                  Discover premium residences and investment opportunities.
                </p>
                <div className="mt-4">
                  <Link
                    href={`/community/${c.slug}`}
                    className="inline-block px-4 py-2 rounded-full border border-gray-300 text-sm font-bold hover:bg-sky-500 hover:text-white hover:border-sky-500 transition-all"
                  >
                    View Community
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
