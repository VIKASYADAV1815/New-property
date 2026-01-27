"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import gsap from "gsap";
import { useEffect, useRef } from "react";

export default function CardTeam() {
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
          <span className="text-sm font-bold uppercase tracking-widest text-gray-500">Our Team</span>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 font-sans tracking-tight">Meet The Experts</h1>
          <p className="text-gray-500 mt-2">Experienced advisors guiding premium property decisions.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { id: 1, name: "Advisor 1", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1200&auto=format&fit=crop", description: "Luxury markets, RERA-compliance, investor relations." },
            { id: 2, name: "Advisor 2", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1200&auto=format&fit=crop", description: "Residential properties, market analysis, client relations." },
            { id: 3, name: "Advisor 3", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=1200&auto=format&fit=crop", description: "Commercial real estate, investment strategies, portfolio management." },
            { id: 4, name: "Advisor 4", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1200&auto=format&fit=crop", description: "Property valuation, legal compliance, transaction management." },
            { id: 5, name: "Advisor 5", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1200&auto=format&fit=crop", description: "Luxury residences, high-net-worth client services, exclusive listings." },
            { id: 6, name: "Advisor 6", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1200&auto=format&fit=crop", description: "New developments, off-plan properties, project marketing." },
          ].map((advisor) => (
            <motion.div key={advisor.id} initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} className="border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all reveal">
              <div className="relative h-40">
                <Image src={advisor.image} alt={advisor.name} fill className="object-cover" />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-900">{advisor.name}</h3>
                <p className="text-gray-500 text-sm mt-1">{advisor.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

