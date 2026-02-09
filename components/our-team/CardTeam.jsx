"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import gsap from "gsap";
import { useEffect, useRef } from "react";
import { ArrowUpRight, ShieldCheck, Target, Zap, Fingerprint, MapPin } from "lucide-react";

export default function CardTeam() {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const elements = containerRef.current.querySelectorAll(".reveal");
    gsap.set(elements, { opacity: 0, y: 20 });
    gsap.to(elements, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      stagger: 0.08,
      ease: "power2.out",
    });
  }, []);

  const advisors = [
    { id: "01", name: "Amit Verma", role: "Consultant", image: "https://images.unsplash.com/photo-1589386417686-0d34b5903d23?q=80&w=400", desc: "Luxury • South Delhi" },
    { id: "02", name: "Riya Sharma", role: "Analyst", image: "https://images.unsplash.com/photo-1590650213165-c1fef80648c4?q=80&w=400", desc: "Pricing • Negotiation" },
    { id: "03", name: "Rahul Mehta", role: "Investments", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=400", desc: "Strategy • Rentals" },
    { id: "04", name: "Neha Gupta", role: "Transactions", image: "https://images.unsplash.com/photo-1590649880765-91b1956b8276?q=80&w=400", desc: "Legal • RERA" },
    { id: "05", name: "Karan Singh", role: "Specialist", image: "https://images.unsplash.com/photo-1544717297-fa95b6ee9643?q=80&w=400", desc: "Floors • Ready-move" },
    { id: "06", name: "Ananya Rao", role: "Projects", image: "https://images.unsplash.com/photo-1562071707-7249ab429b2a?q=80&w=400", desc: "Developer Audit" },
  ];

  return (
    <section ref={containerRef} className="py-20 bg-white text-gray-900 font-sans selection:bg-sky-600 selection:text-white">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* --- REFINED HEADER --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16 reveal border-b border-gray-100 pb-12">
          <div className="lg:col-span-7">
            <div className="flex items-center gap-2 mb-4">
                <Fingerprint className="w-4 h-4 text-sky-600" />
                <span className="text-[9px] font-black uppercase tracking-[0.3em] text-gray-400">Intelligence Team</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter leading-none uppercase">
              Advisory-Led. <br />
              <span className="text-gray-300 font-bold italic">Specialists.</span>
            </h2>
          </div>
          <div className="lg:col-span-5 flex flex-col justify-end">
            <p className="text-gray-500 text-base leading-relaxed max-w-md border-l-2 border-sky-600 pl-6">
              A bespoke consultancy decoding markets through data and developer solvency audits. No redirects—on-ground execution only.
            </p>
          </div>
        </div>

        {/* --- SLIM ADVISOR STRIP --- */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-12 reveal">
          {advisors.map((m) => (
            <div key={m.id} className="group relative">
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-gray-50 border border-gray-100 shadow-sm">
                <Image src={m.image} fill className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500" alt={m.name} />
                <div className="absolute inset-0 bg-linear-to-t from-gray-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-3 flex flex-col justify-end">
                  <p className="text-sky-400 text-[8px] font-bold uppercase tracking-widest">{m.role}</p>
                </div>
              </div>
              <div className="mt-3 px-1">
                <h4 className="text-xs font-black uppercase tracking-tight">{m.name}</h4>
                <p className="text-[10px] text-gray-400 mt-0.5 leading-tight">{m.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* --- COMPACT BENTO --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 reveal">
          
          <div className="lg:col-span-7 bg-gray-900 rounded-[2rem] p-8 md:p-10 text-white relative group overflow-hidden">
            <div className="flex justify-between items-center mb-10">
                <ShieldCheck className="w-8 h-8 text-sky-500" />
                <span className="text-[9px] font-mono text-gray-500 tracking-widest uppercase">Expertise_v4</span>
            </div>
            <h3 className="text-2xl font-black uppercase tracking-tighter mb-6">Asset Core</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                "Builder floors & Villas",
                "Developer Credibility",
                "Pricing Logic",
                "RERA & Compliance",
                "Exit Strategy"
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between p-3 border border-white/5 rounded-xl hover:bg-white/5 transition-colors group/item">
                  <span className="text-xs font-bold text-gray-400 group-hover/item:text-white transition-colors">{item}</span>
                  <Zap className="w-3 h-3 text-sky-500 opacity-0 group-hover/item:opacity-100 transition-opacity" />
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 bg-gray-50 border border-gray-200 rounded-[2rem] p-8 md:p-10 flex flex-col justify-between group">
            <div>
                <div className="flex justify-between items-center mb-10">
                    <Target className="w-8 h-8 text-gray-900" />
                    <MapPin className="w-4 h-4 text-gray-300" />
                </div>
                <h3 className="text-2xl font-black uppercase tracking-tighter mb-4">The Process</h3>
                <p className="text-gray-500 text-xs leading-relaxed max-w-xs mb-8">
                  End-to-end site evaluation and transaction management on a single platform.
                </p>
            </div>
            <div className="flex flex-wrap gap-2">
               {["Requirement", "Audit", "Risk", "Closure"].map((step, i) => (
                 <div key={i} className="px-4 py-2 bg-white rounded-full border border-gray-200 text-[10px] font-black uppercase tracking-tighter text-gray-700">
                    0{i+1}. {step}
                 </div>
               ))}
            </div>
          </div>

        </div>

        {/* --- FOOTER STRIP --- */}
        <div className="mt-12 flex justify-between items-center border-t border-gray-100 pt-6 text-[9px] font-black uppercase tracking-[0.2em] text-gray-400 reveal">
            <div className="flex gap-6">
                <span>Dehradun</span>
                <span>Delhi</span>
                <span>Gurgaon</span>
            </div>
            <div className="flex items-center gap-2">
                <div className="w-1 h-1 rounded-full bg-sky-600" />
                Live Advisory Collective
            </div>
        </div>

      </div>
    </section>
  );
}
