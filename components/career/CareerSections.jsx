"use client";
import gsap from "gsap";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

export default function CareerSections() {
  const ref = useRef(null);
  useEffect(() => {
    if (!ref.current) return;
    gsap.from(ref.current.querySelectorAll(".reveal"), {
      opacity: 0,
      y: 20,
      duration: 0.8,
      stagger: 0.1,
    });
  }, []);
  return (
    <section ref={ref} className="py-24 bg-white">
      <div className="max-w-350 mx-auto px-6">
        <div className="mb-10 reveal">
          <span className="text-sm font-bold uppercase tracking-widest text-gray-500">Career</span>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 font-sans tracking-tight">Join Our Team</h1>
          <p className="text-gray-500 mt-2">Build luxury experiences with a passionate crew.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[1,2].map((i) => (
            <motion.div key={i} initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} className="border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all reveal p-6">
              <h3 className="text-lg font-bold text-gray-900">Role {i}</h3>
              <p className="text-gray-500 text-sm mt-1">Tell us about yourself and your aspirations.</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

