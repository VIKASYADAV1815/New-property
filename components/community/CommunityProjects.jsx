"use client";
import Image from "next/image";
import { communities } from "@/data/communities";
import { motion } from "framer-motion";
import gsap from "gsap";
import { useEffect, useRef } from "react";

export default function CommunityProjects({ slug }) {
  const community = communities.find((c) => c.slug === slug);
  const sectionRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    gsap.from(sectionRef.current.querySelectorAll(".reveal"), {
      opacity: 0,
      y: 20,
      duration: 0.8,
      stagger: 0.1,
      ease: "power2.out",
    });
  }, []);

  if (!community) return null;

  return (
    <section ref={sectionRef} className="py-24 bg-white">
      <div className="max-w-350 mx-auto px-6">
        <div className="mb-10 reveal">
          <span className="text-sm font-bold uppercase tracking-widest text-gray-500">
            Community
          </span>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 font-sans tracking-tight">
            {community.name}
          </h1>
          <p className="text-gray-500 mt-2">
            Showing featured projects and lifestyle highlights in {community.name}.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all reveal"
            >
              <div className="relative h-44">
                <Image
                  src={community.image}
                  alt={`${community.name} preview ${i}`}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-900 font-sans tracking-tight">
                  {community.name} Project {i}
                </h3>
                <p className="text-gray-500 text-sm mt-1">
                  Luxury residences with modern amenities and prime access.
                </p>
                <div className="mt-4">
                  <button className="px-4 py-2 rounded-full border border-gray-300 text-sm font-bold hover:bg-sky-500 hover:text-white hover:border-sky-500 transition-all">
                    View Details
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

