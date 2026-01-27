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
        <section ref={sectionRef} className="relative py-16  md:py-48 px-6 bg-white overflow-hidden">
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
                 <div className="absolute top-0 right-0 max-w-md text-left z-10 -translate-x-5">
                     <h3 className="text-sm md:text-base font-bold tracking-[0.2em] uppercase text-gray-500">Our Philosophy</h3>
                     <p className="text-2xl md:text-4xl lg:text-5xl font-serif leading-tight text-gray-900 mt-4">
                         We Treat Real Estate as a Decision, Not a Deal.
                     </p>
                     <p className="text-lg md:text-2xl lg:text-3xl font-serif leading-relaxed text-gray-600 mt-2">
                         Evaluating property as a long-term life or investment decision.
                     </p>
                 </div>
                 {/* Spacer to give the section height */}
                 <div className="h-64 md:h-80 w-full"></div>
            </div>
        </section>
    );
}
