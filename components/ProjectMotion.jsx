"use client";

import { motion, useMotionValue } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef } from "react";

const projects = [
  {
    title: "Camellias",
    location: "Gurgaon",
    image:
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "South Estate",
    location: "Delhi",
    image:
      "https://images.unsplash.com/photo-1524549207884-e7d1130ae2f3?q=80&w=687&auto=format&fit=crop",
  },
  {
    title: "Primanti",
    location: "Gurgaon",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Golf Links",
    location: "New Delhi",
    image:
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=1200&auto=format&fit=crop",
  },
];

export default function ProjectMotion() {
  const x = useMotionValue(0);
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const halfWidth = container.scrollWidth / 2;
    let animationFrame;

    const speed = 0.3; // px per frame (smooth + slow)

    const loop = () => {
      let currentX = x.get();
      currentX -= speed;

      // seamless wrap
      if (Math.abs(currentX) >= halfWidth) {
        currentX = 0;
      }

      x.set(currentX);
      animationFrame = requestAnimationFrame(loop);
    };

    animationFrame = requestAnimationFrame(loop);

    return () => cancelAnimationFrame(animationFrame);
  }, [x]);

  return (
    <section className="py-12 sm:py-16 md:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="mb-10">
          <span className="text-sm font-bold uppercase tracking-widest text-gray-500">
            Featured
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
            Curated Property Showcase
          </h2>
        </div>

        <div className="overflow-hidden rounded-2xl bg-white">
          <motion.div
            ref={containerRef}
            style={{ x }}
            drag="x"
            dragMomentum
            dragElastic={0.12}
            onDragEnd={() => {
              if (!containerRef.current) return;
              const halfWidth =
                containerRef.current.scrollWidth / 2;
              x.set(x.get() % halfWidth);
            }}
            className="flex gap-4 sm:gap-6 p-4 sm:p-6 cursor-grab active:cursor-grabbing will-change-transform"
          >
            {[...projects, ...projects].map((p, idx) => (
              <div
                key={idx}
                className="relative w-72 sm:w-80 h-40 sm:h-48 md:h-56 rounded-xl overflow-hidden shrink-0 shadow-sm"
              >
                <Image
                  src={p.image}
                  alt={p.title}
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-110"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/10 to-transparent" />
                <div className="absolute bottom-3 left-3 text-white">
                  <h3 className="font-bold">{p.title}</h3>
                  <p className="text-xs text-gray-200">
                    {p.location}
                  </p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
