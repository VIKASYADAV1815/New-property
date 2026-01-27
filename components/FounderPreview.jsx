"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useRef } from "react";

export default function FounderPreview() {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const { scrollYProgress: imageScroll } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  const imageY = useTransform(imageScroll, [0, 1], [0, -80]);

  return (
    <section ref={sectionRef} className="py-16 md:py-24 bg-gray-50 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Image Side - Sticky */}
          <motion.div
            ref={imageRef}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            style={{ y: imageY }}
            className="lg:sticky lg:top-24 relative h-96 lg:h-125 rounded-2xl overflow-hidden lg:self-start"
          >
            <Image
              src="https://images.unsplash.com/photo-1566753323558-f4e0952af115?q=80&w=1200&auto=format&fit=crop"
              alt="Akshit Kapoor, Founder"
              fill
              className="object-cover"
            />
          </motion.div>

          {/* Text Side - Scrolls */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:min-h-150"
          >
            <span className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-3 block">Meet the Founder</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 font-sans tracking-tight mb-6">
              Meet Akshit Kapoor
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-6">
              With over 20 years of hands-on experience in real estate and residential construction, Akshit Kapoor brings deep involvement in residential projects, understanding of planning, pricing, and on-ground execution.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              His experience spans residential apartments, builder floors, plotted developments, and villas—giving him a clear understanding of how projects are planned, priced, positioned, and delivered. This exposure allows PropertySearch.in to evaluate properties not just as listings, but as real assets with long-term implications.
            </p>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 bg-black text-white px-8 py-4 rounded-full text-sm font-bold uppercase tracking-wider hover:bg-sky-500 transition-all shadow-lg hover:shadow-xl group"
            >
              Learn More About the Founder <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

