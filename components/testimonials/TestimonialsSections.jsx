"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Quote, Star, ShieldCheck, ChevronLeft, ChevronRight, ArrowRight, Users, Clock, CalendarCheck } from "lucide-react";

const allTestimonials = [
  {
    id: 1,
    name: "Rohit Sharma",
    location: "Portfolio Investor • Gurgaon",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop",
    text: "PropertySearch.in provided an honest evaluation that changed our entire perspective. Akshit's understanding of developer credibility helped us secure our future without the usual sales pressure.",
    focus: "Strategic Entry"
  },
  {
    id: 2,
    name: "Neha Singh",
    location: "Homeowner • Delhi NCR",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&auto=format&fit=crop",
    text: "The relationship-driven approach made all the difference. They took time to understand our requirement and provided decision support with transparency. We felt guided, not pressured.",
    focus: "Relationship-First"
  },
  {
    id: 3,
    name: "Priya Mehta",
    location: "New Delhi",
    text: "They didn't just show properties—they evaluated location strength and pricing logic to avoid short-term hype. Truly data-driven advisory.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=400&auto=format&fit=crop",
    focus: "Thorough Evaluation"
  },
  {
    id: 4,
    name: "Amit Kumar",
    location: "Gurgaon",
    text: "Market intelligence that treats real estate as a critical decision, not just a deal. Refreshing transparency in a crowded market.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=400&auto=format&fit=crop",
    focus: "Investment Guidance"
  },
  {
    id: 5,
    name: "Rajesh Verma",
    location: "Gurgaon",
    text: "Akshit's 20+ years of experience helped us evaluate properties from a developer's perspective. Invaluable technical insight.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop",
    focus: "Expert Experience"
  }
];

export default function TestimonialsSection() {
  const [data, setData] = useState(allTestimonials);
  const timerRef = useRef(null);

  // Function to clear and restart the 5s timer
  const resetTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      rotateNext();
    }, 5000);
  }, []);

  const rotateNext = useCallback(() => {
    setData((prev) => {
      const newData = [...prev];
      const first = newData.shift();
      if (first) newData.push(first);
      return newData;
    });
  }, []);

  const rotatePrev = useCallback(() => {
    resetTimer(); // Reset on manual interaction
    setData((prev) => {
      const newData = [...prev];
      const last = newData.pop();
      if (last) newData.unshift(last);
      return newData;
    });
  }, [resetTimer]);

  const handleManualClick = (idx) => {
    resetTimer(); // Reset on manual interaction
    setData((prev) => {
      const newData = [...prev];
      // Move clicked item and everything before it to the end
      const movedItems = newData.splice(0, idx + 1);
      return [...newData, ...movedItems];
    });
  };

  // Initial timer setup
  useEffect(() => {
    resetTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [resetTimer]);

  const featured = data[0];
  const secondary = data.slice(1, 4);
  const smoothSpring = { type: "spring", stiffness: 260, damping: 28 };

  return (
    <section className="relative z-10 py-24 bg-white overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* ---------- ATTRACTIVE HEADER ---------- */}
        <div className="mb-16 text-center md:text-left">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 mb-4 justify-center md:justify-start"
          >
            <span className="h-0.5 w-6 bg-gray-900"></span>
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400">The Proof of Trust</span>
          </motion.div>
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 tracking-tight leading-[1.1]">
            Expertise meets <br />
            <span className="text-gray-400 font-serif italic">Unwavering Integrity.</span>
          </h2>
        </div>

        {/* ---------- TESTIMONIAL GRID ---------- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-2 mb-10 items-stretch">
          
          <div className="lg:col-span-7 relative flex h-full min-h-115">
            {/* Buttons */}
            <button onClick={rotatePrev} className="absolute -left-5.5 top-1/2 -translate-y-1/2 z-40 w-11 h-11 rounded-full bg-white border border-gray-100 shadow-xl flex items-center justify-center hover:bg-black hover:text-white transition-all active:scale-90">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button onClick={() => { rotateNext(); resetTimer(); }} className="absolute -right-5.5 top-1/2 -translate-y-1/2 z-40 w-11 h-11 rounded-full bg-white border border-gray-100 shadow-xl flex items-center justify-center hover:bg-black hover:text-white transition-all active:scale-90">
              <ChevronRight className="w-5 h-5" />
            </button>

            <AnimatePresence mode="wait">
              <motion.div
                key={featured.name}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={smoothSpring}
                className="w-full rounded-[2.5rem] border border-gray-100 bg-white p-10 shadow-2xl shadow-gray-200/30 flex flex-col justify-between"
              >
                <div>
                  <Quote className="w-10 h-10 text-gray-50 mb-8" />
                  <blockquote className="text-xl md:text-2xl font-serif italic text-gray-900 leading-relaxed">
                    "{featured.text}"
                  </blockquote>
                </div>
                <div className="flex items-center gap-4 pt-8 border-t border-gray-100 mt-8">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden border border-gray-100 shadow-sm">
                    <Image src={featured.image} alt={featured.name} fill className="object-cover" />
                  </div>
                  <div>
                    <h4 className="text-md font-bold text-gray-900 leading-none">{featured.name}</h4>
                    <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mt-1.5">{featured.location}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Side Cards */}
          <div className="lg:col-span-5 flex flex-col justify-center gap-4">
            {secondary.map((item, idx) => (
              <motion.div
                key={item.name}
                onClick={() => handleManualClick(idx)}
                layout
                className={`cursor-pointer rounded-2xl border p-5 transition-all duration-300 relative
                  ${idx === 1 
                    ? 'bg-white border-gray-200 shadow-[0_10px_25px_-5px_rgba(0,0,0,0.06)] scale-[1.01] z-10' 
                    : 'bg-gray-50/50 border-transparent opacity-40 hover:opacity-100 hover:bg-white'
                  }`}
              >
                <p className="text-[12px] text-gray-600 italic line-clamp-2 leading-snug">"{item.text}"</p>
                <div className="flex items-center justify-between mt-3">
                  <span className="text-[10px] font-bold text-gray-900">{item.name}</span>
                  <span className="text-[8px] font-extrabold px-2 py-0.5 bg-white border border-gray-100 rounded text-gray-400 uppercase tracking-widest">{item.focus}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ---------- REDESIGNED MINIMAL ADVISORY SECTION ---------- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* CTA Box */}
          <div className="bg-gray-50/50 border border-gray-100 rounded-4xl p-8 flex flex-col justify-center">
            <div className="flex items-center gap-2 mb-3 text-gray-400">
              <CalendarCheck className="w-3.5 h-3.5" />
              <span className="text-[9px] font-bold uppercase tracking-widest">Consultation Request</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6 tracking-tight">
              Start your <span className="text-gray-400 font-serif italic">Clean Evaluation.</span>
            </h3>
            <button className="flex items-center justify-center bg-gray-900 text-white px-8 py-4 rounded-xl font-bold text-[10px] uppercase tracking-widest hover:bg-black transition-all w-fit gap-4 group">
              Book Now <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Minimal Grid Stats */}
          <div className="grid grid-cols-2 gap-3">
            {[
              { val: "20+", label: "Years Exp", icon: Clock },
              { val: "500+", label: "Deals", icon: ShieldCheck },
              { val: "98%", label: "Success", icon: Star },
              { val: "120+", label: "Investors", icon: Users }
            ].map((stat, i) => (
              <div key={i} className="bg-white border border-gray-100 rounded-3xl p-5 flex flex-col justify-between hover:shadow-sm transition-all group">
                <stat.icon className="w-4 h-4 text-gray-300 group-hover:text-gray-900 transition-colors" />
                <div>
                  <div className="text-xl font-bold text-gray-900">{stat.val}</div>
                  <div className="text-[8px] font-bold text-gray-400 uppercase tracking-widest">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}