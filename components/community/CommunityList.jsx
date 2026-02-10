"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { usePathname } from "next/navigation";

/* ============================
   STATIC COMMUNITY DATA
   ============================ */
const STATIC_COMMUNITIES = [
  {
    slug: "gurgaon",
    name: "Gurgaon",
    image:
      "https://images.unsplash.com/photo-1460317442991-0ec209397118?q=80&w=1600&auto=format&fit=crop",
    description:
      "Premium high-rise residences, global business hubs, and luxury developments.",
  },
  {
    slug: "delhi",
    name: "Delhi",
    image:
      "https://images.unsplash.com/photo-1587474260584-136574528ed5?q=80&w=1600&auto=format&fit=crop",
    description:
      "Iconic neighborhoods, bungalows, and limited-edition luxury homes.",
  },
  {
    slug: "dehradun",
    name: "Dehradun",
    image:
      "https://i.pinimg.com/736x/26/69/2a/26692a44a6a5dffc8e5dd41f8991c275.jpg",
    description:
      "Green living with villas, plots, and serene mountain-facing residences.",
  },
];

export default function CommunityList() {
  const sectionRef = useRef(null);
  const pathname = usePathname();

  /* ============================
     GSAP ENTRY ANIMATION
     ============================ */
  useEffect(() => {
    if (!sectionRef.current) return;

    const raf = requestAnimationFrame(() => {
      const elements = sectionRef.current.querySelectorAll(".reveal");

      gsap.set(elements, { opacity: 0, y: 20 });

      gsap.to(elements, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: "power2.out",
      });
    });

    return () => cancelAnimationFrame(raf);
  }, [pathname]);

  return (
    <section ref={sectionRef} className="relative z-10 py-24 bg-white">
      <div className="max-w-350 mx-auto px-6">
        {/* Header */}
        <div className="flex items-end justify-between mb-10 reveal">
          <div>
            <span className="text-sm font-bold uppercase tracking-widest text-gray-500">
              Community
            </span>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
              Explore Communities
            </h1>
          </div>
        </div>

        {/* Community Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {STATIC_COMMUNITIES.map((c, idx) => (
            <motion.div
              key={c.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.08 * idx }}
              className="border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all bg-white"
            >
              {/* Image */}
              <div className="relative h-44 reveal">
                <Image
                  src={c.image}
                  alt={c.name}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-gray-900 tracking-tight">
                    {c.name}
                  </h3>
               
                </div>

                <p className="text-gray-500 text-sm mt-2">
                  {c.description}
                </p>

                <div className="mt-4">
                  <Link
                    href={`/community/${c.slug}`}
                    className="inline-block px-4 py-2 rounded-full border border-gray-300
                               text-sm font-bold transition-all
                               hover:bg-sky-500 hover:text-white hover:border-sky-500"
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
