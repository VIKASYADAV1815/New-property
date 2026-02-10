"use client";
import { useState, useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import PropertyCard from "./PropertyCard";
import { ArrowLeft, ArrowRight } from "lucide-react";
import api from "@/utils/api";

export default function PropertyGrid() {
  const [isPaused, setIsPaused] = useState(false);
  const [properties, setProperties] = useState([]);
  const scrollRef = useRef(null);
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const { data } = await api.get("/properties");
        setProperties(Array.isArray(data) ? data : data?.items || []);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProperties();
  }, []);

  // Triple the properties to create seamless loop illusion
  const loopedProperties = [...properties, ...properties, ...properties];

  // Auto Scroll Effect
  useEffect(() => {
    const interval = setInterval(() => {
        if (!isPaused && scrollRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
            const oneThirdWidth = scrollWidth / 3;
            const firstChild = scrollRef.current.firstElementChild;
            const gap = parseInt(getComputedStyle(scrollRef.current).gap || getComputedStyle(scrollRef.current).columnGap || "24", 10);
            const step = (firstChild?.clientWidth || 360) + (isNaN(gap) ? 24 : gap);

            // If we are near the end of the second set, reset to the first set seamlessly
            if (scrollLeft >= oneThirdWidth * 2) {
                scrollRef.current.scrollTo({ left: scrollLeft - oneThirdWidth, behavior: "instant" });
                // Allow next tick to handle scroll to avoid any visual jerk
            } else {
                 scrollRef.current.scrollBy({ left: step, behavior: "smooth" });
            }
        }
    }, 4000); // Smooth swipe every 3 seconds

    return () => clearInterval(interval);
  }, [isPaused]);

  // Initial center position to allow scrolling both ways (start at middle set)
  useEffect(() => {
    if (scrollRef.current) {
        const { scrollWidth } = scrollRef.current;
        scrollRef.current.scrollTo({ left: scrollWidth / 3, behavior: "instant" });
    }
  }, [properties]);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const firstChild = scrollRef.current.firstElementChild;
      const gap = parseInt(getComputedStyle(scrollRef.current).gap || getComputedStyle(scrollRef.current).columnGap || "24", 10);
      const step = (firstChild?.clientWidth || 360) + (isNaN(gap) ? 24 : gap);
      const scrollAmount = direction === "left" ? -step : step;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section ref={sectionRef} className="py-16 md:py-24 bg-white relative z-10 overflow-hidden" onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)}>
      <div className="max-w-6xl mx-auto px-6">
        <motion.div 
          style={{ y }}
          className="mb-12 md:mb-16"
        >
            <div>
                <motion.h2 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-gray-900 font-sans tracking-tight"
                >
                    Curated Property Opportunities
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-lg md:text-xl text-gray-600 mb-6 max-w-3xl leading-relaxed"
                >
                    These are carefully evaluated property options selected based on location strength, developer credibility, construction quality, and long-term value.
                </motion.p>
                <div className="w-20 h-1 bg-sky-500 rounded-full" />
            </div>
        </motion.div>
        
        {/* Carousel Container */}
        <div className="relative">
          <div 
              ref={scrollRef}
              className="flex gap-4 md:gap-6 overflow-x-auto pb-12 snap-x snap-mandatory scrollbar-hide -mx-2 px-2 md:mx-0 md:px-0"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {loopedProperties.map((property, index) => (
              <div 
                key={`${property._id}-${index}`} 
                className="snap-center shrink-0"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
              >
                  <PropertyCard property={property} index={index % properties.length} />
              </div>
            ))}
          </div>
          
          {/* Navigation Buttons (Centered on sides) */}
          <button 
              onClick={() => scroll("left")}
              className="absolute left-0 top-1/2 -translate-y-1/2 p-4 rounded-full border border-gray-200 bg-white/40 backdrop-blur-md hover:bg-sky-500 hover:border-sky-500 hover:text-white transition-all duration-300 group shadow-sm hover:shadow-lg z-10"
          >
              <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
          </button>
          <button 
              onClick={() => scroll("right")}
              className="absolute right-0 top-1/2 -translate-y-1/2 p-4 rounded-full border border-gray-200 bg-white/40 backdrop-blur-md hover:bg-sky-500 hover:border-sky-500 hover:text-white transition-all duration-300 group shadow-sm hover:shadow-lg z-10"
          >
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </section>
  );
}