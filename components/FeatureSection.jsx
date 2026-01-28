"use client";
import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function FeatureSection() {
    const sectionRef = useRef(null);
    const textRef = useRef(null);

    useEffect(() => {
        const el = sectionRef.current;
        const text = textRef.current;
        
        // Split text animation context
        const ctx = gsap.context(() => {
            gsap.fromTo(text.children, 
                { opacity: 0, y: 50 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1.5,
                    stagger: 0.1,
                    ease: "power4.out",
                    scrollTrigger: {
                        trigger: el,
                        start: "top 75%",
                    }
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

 return (
  <section
    ref={sectionRef}
    className="relative py-16 md:py-48 px-6 bg-white overflow-hidden"
  >
    {/* Background Image bg2.png positioned bottom-left with smaller size */}
    <div className="absolute bottom-0 left-0 w-full h-1/2 opacity-30 pointer-events-none md:bottom-0 md:w-1/2">
      <Image
        src="/bg2.png"
        alt="Philosophy Background"
        fill
        className="object-cover"
      />
    </div>

    <div ref={textRef} className="max-w-7xl mx-auto relative h-full">
      {/* Top right content */}
      <div className="absolute top-0 right-0 max-w-md text-right z-10">
        <h3 className="text-xs md:text-sm font-bold tracking-[0.2em] uppercase text-gray-500">
          Our Philosophy
        </h3>

        <p className="text-xl md:text-3xl lg:text-4xl font-serif leading-tight text-gray-900 mt-3">
          We Treat Real Estate as a Decision, Not a Deal.
        </p>

        <p className="text-base md:text-xl lg:text-2xl font-serif leading-relaxed text-gray-600 mt-2">
          Evaluating property as a long-term life or investment decision.
        </p>
      </div>

      {/* Additional content between image and paragraphs, slightly toward image side */}
      <div className="absolute bottom-1/4 left-0 md:left-16 lg:left-60 max-w-xs text-left z-5 text-gray-700 hidden md:block transform -translate-y-4">
        <p className="text-base md:text-lg font-light leading-relaxed">
          Every space tells a story. We listen, analyze, and guide you toward
          choices that resonate with your future.
        </p>
      </div>

      {/* Spacer to give the section height */}
      <div className="h-64 md:h-80 w-full"></div>
    </div>
  </section>
);

}
