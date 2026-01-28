"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";

const featured = [
    { title: "DLF Camellias", location: "Gurgaon", price: "₹ 40 Cr", image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?q=80&w=800&auto=format&fit=crop" },
    { title: "Godrej South Estate", location: "Okhla, Delhi", price: "₹ 5 Cr", image: "https://images.unsplash.com/photo-1595262493050-5b0f29ccf4b1?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { title: "Tata Primanti", location: "Gurgaon", price: "₹ 4.5 Cr", image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=800&auto=format&fit=crop" },
];

export default function FeaturedProjects() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, -30]);

  return (
    <section ref={sectionRef} className="py-16 md:py-24 bg-white overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Text Side */}
            <motion.div 
              style={{ y }}
              className="lg:col-span-4"
            >
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                >
                    <span className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-3 block">Curated Selection</span>
                    <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 font-sans tracking-tight leading-tight">
                        Curated Property Opportunities
                    </h2>
                    <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                        These are carefully evaluated property options selected based on location strength, developer credibility, construction quality, and long-term value.
                    </p>
                  <Link
  href="/community"
  className="inline-flex items-center gap-2 rounded-full bg-black px-5 py-4 text-xs font-semibold uppercase tracking-widest text-white
             transition-all duration-300
             hover:bg-sky-500 hover:shadow-md
             shadow-sm"
>
  View All Properties
  <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
</Link>

                </motion.div>
            </motion.div>

            {/* Grid Side */}
            <div className="lg:col-span-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {featured.map((item, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="group cursor-pointer"
                        >
                            <div className="relative h-75 rounded-xl overflow-hidden mb-4">
                                <Image 
                                    src={item.image} 
                                    alt={item.title} 
                                    fill 
                                    className="object-cover transition-transform duration-700 group-hover:scale-110" 
                                />
                                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
                                <div className="absolute top-4 left-4 bg-sky-500 text-white px-3 py-1 rounded text-[10px] font-bold uppercase tracking-wider">
                                    Off-Plan
                                </div>
                            </div>
                            <h3 className="font-bold text-lg text-gray-900 mb-1">{item.title}</h3>
                            <p className="text-sm text-gray-500 mb-2">{item.location}</p>
                            <p className="font-bold text-sky-600">{item.price}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
      </div>
    </section>
  );
}
