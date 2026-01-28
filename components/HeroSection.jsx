"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import SearchForm from "./SearchForm";
import { useRef } from "react";

export default function HeroSection() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 50]);

  return (
    <section ref={sectionRef} className="sticky top-0 h-dvh min-h-200 flex flex-col items-center justify-center overflow-visible">
      <motion.div 
        style={{ y }}
        className="absolute inset-0 z-0 pointer-events-none"
      >
        <div className="absolute inset-0 bg-black/40 z-10" />
        <div className="absolute inset-0 bg-linear-to-b from-black/50 via-transparent to-black/30 z-10" />
        <Image
          src="https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2560&auto=format&fit=crop"
          alt="Hero Background"
          fill
          className="object-cover"
          priority
        />
      </motion.div>

      <div className="relative z-20 w-full max-w-7xl mx-auto px-6 text-center text-white pt-20 md:pt-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1 className="text-3xl md:text-5xl lg:text-6xl xl:text-6xl font-bold tracking-tight mb-6 drop-shadow-2xl leading-tight px-4">
            Real Estate Guidance <br className="hidden md:block" />
            <span className="text-sky-500">Built on Experience</span>, <br className="hidden md:block" />
            <span className="font-light italic font-serif">Not Hype</span>
          </h1>
        </motion.div>

        <motion.p
          className="text-sm md:text-base lg:text-lg text-white/90 mb-8 md:mb-10 max-w-3xl mx-auto font-light drop-shadow-md leading-relaxed px-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          PropertySearch.in is a founder-led real estate advisory platform led by <span className="text-sky-400 font-semibold">Akshit Kapoor</span>, bringing over 20 years of hands-on experience across residential projects, builder floors, plotted developments, and buyer advisory.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <SearchForm />
        </motion.div>
      </div>
    </section>
  );
}
