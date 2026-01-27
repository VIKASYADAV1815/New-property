"use client";
import { motion } from "framer-motion";
import Image from "next/image";

const projects = [
  { title: "Camellias", location: "Gurgaon", image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?q=80&w=1200&auto=format&fit=crop" },
  { title: "South Estate", location: "Delhi", image: "https://images.unsplash.com/photo-1524549207884-e7d1130ae2f3?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { title: "Primanti", location: "Gurgaon", image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1200&auto=format&fit=crop" },
  { title: "Golf Links", location: "New Delhi", image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=1200&auto=format&fit=crop" },
];

export default function ProjectMotion() {
  return (
    <section className="py-12 sm:py-16 md:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-8 sm:mb-10">
          <div>
            <span className="text-sm font-bold uppercase tracking-widest text-gray-500">Featured</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 font-sans tracking-tight">Curated Property Showcase</h2>
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white">
          <motion.div
            initial={{ x: 0 }}
            animate={{ x: ["0%", "-50%"] }}
            transition={{ repeat: Infinity, repeatType: "loop", duration: 20, ease: "linear" }}
            className="flex gap-4 sm:gap-6 p-4 sm:p-6 will-change-transform"
          >
            {[...projects, ...projects].map((p, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.03 }}
                className="relative w-72 sm:w-80 h-40 sm:h-48 md:h-55 rounded-xl overflow-hidden group cursor-pointer shadow-sm shrink-0"
              >
                <Image
                  src={p.image}
                  alt={p.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <h3 className="font-bold text-base sm:text-lg">{p.title}</h3>
                  <p className="text-xs text-gray-200">{p.location}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
