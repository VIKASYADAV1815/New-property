"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function PageHero({ title, subtitle, image }) {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const isCommunity = pathname.startsWith("/community");
  return (
    <section className={isHome ? "relative min-h-screen bg-black text-white overflow-hidden pt-20" : "relative min-h-[70vh] bg-black text-white overflow-hidden pt-20"}>

      {/* Background */}
      <motion.div
        initial={{ scale: 1.08 }}
        whileInView={{ scale: 1 }}
        transition={{ duration: 1.6, ease: "easeOut" }}
        className="absolute inset-0"
      >
        <Image
          src={image}
          alt={title}
          fill
          priority
          className="object-cover brightness-[0.85] contrast-[1.1] saturate-[1.1]"
        />

        {/* Slight black overlay for readability (lighter on community pages) */}
        <div className={isCommunity ? "absolute inset-0 bg-black/25" : "absolute inset-0 bg-black/35"} />

        {/* Gradient overlay from bottom-left for professional look */}
        <div className={isCommunity ? "absolute inset-0 bg-linear-to-tr from-black/60 via-black/25 to-transparent" : "absolute inset-0 bg-linear-to-tr from-black/75 via-black/35 to-transparent"} />

        {/* Additional bottom gradient for text area */}
        <div className={isCommunity ? "absolute inset-0 bg-linear-to-t from-black/70 via-black/40 to-transparent" : "absolute inset-0 bg-linear-to-t from-black/85 via-black/55 to-transparent"} />
      </motion.div>

      {/* Content - Positioned at left bottom */}
      <div className={isHome ? "relative z-10 max-w-7xl mx-auto px-6 min-h-screen flex flex-col justify-end pb-16" : "relative z-10 max-w-7xl mx-auto px-6 min-h-[70vh] flex flex-col justify-end pb-16"}>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="max-w-3xl"
        >
          <motion.h1
            className={isCommunity ? "relative text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight leading-tight mb-3" : "relative text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight leading-tight mb-4"}
          >
            <span className="relative z-10">{title}</span>
          </motion.h1>

          {subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className={isCommunity ? "text-sm md:text-base lg:text-lg text-white/90 leading-relaxed font-light max-w-2xl" : "text-sm md:text-base lg:text-lg text-white/95 leading-relaxed font-light"}
            >
              {subtitle}
            </motion.p>
          )}
        </motion.div>
      </div>

    </section>
  );
}
