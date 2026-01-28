"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import gsap from "gsap";
import { useEffect, useRef } from "react";

export default function CardTeam() {
  const ref = useRef(null);
  useEffect(() => {
    if (!ref.current) return;
    const timer = requestAnimationFrame(() => {
      const elements = ref.current.querySelectorAll(".reveal");
      gsap.set(elements, { opacity: 0, y: 20 });
      gsap.to(elements, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
      });
    });
    return () => cancelAnimationFrame(timer);
  }, []);
  return (
    <section ref={ref} className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-12 md:mb-16">
          <span className="text-sm font-bold uppercase tracking-widest text-gray-500">Our Team</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 font-sans tracking-tight">Advisory-Led. Domain Specialists.</h2>
          <p className="text-gray-600 mt-3 md:text-lg max-w-2xl">A founder-led advisory supported by specialists across Delhi NCR. We combine market intelligence, project experience, and client-first guidance.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-start mb-16 reveal">
          <div className="lg:col-span-2">
            <div className="bg-gray-50 border border-gray-100 rounded-2xl p-6 md:p-8">
              <p className="text-gray-700">We operate as an advisory, not a listing portal. Every recommendation is evaluated for location strength, developer credibility, construction quality, pricing logic, and long-term suitability.</p>
              <p className="text-gray-700 mt-3">The team brings experience across builder floors, apartments, villas, plotted land, and select under-construction projects.</p>
            </div>
          </div>
          <div className="lg:col-span-1">
            <div className="relative h-64 md:h-72 rounded-2xl overflow-hidden border border-gray-200 bg-gray-100">
              <Image
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1600&auto=format&fit=crop"
                alt="Advisory team"
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="mt-4">
              <p className="text-sm font-bold text-gray-900">Advisory Team</p>
              <p className="text-xs text-gray-500 mt-1">Delhi • Gurugram</p>
            </div>
          </div>
        </div>

        <div className="mb-8 md:mb-12 reveal">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900">Meet the Advisors</h3>
          <p className="text-gray-600 mt-2">Specialists across micro-markets and project formats.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { id: 1, name: "Amit Verma", role: "Senior Consultant", image: "https://images.unsplash.com/photo-1589386417686-0d34b5903d23?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", desc: "Luxury residential • South Delhi • Buyer advisory" },
            { id: 2, name: "Riya Sharma", role: "Market Analyst", image: "https://images.unsplash.com/photo-1590650213165-c1fef80648c4?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", desc: "Pricing logic • Data-backed insights • Negotiation" },
            { id: 3, name: "Rahul Mehta", role: "Investment Advisor", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=1200&auto=format&fit=crop", desc: "Portfolio strategy • Capital appreciation • Rentals" },
            { id: 4, name: "Neha Gupta", role: "Transactions Lead", image: "https://images.unsplash.com/photo-1590649880765-91b1956b8276?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", desc: "Legal diligence • RERA compliance • Documentation" },
            { id: 5, name: "Karan Singh", role: "Property Specialist", image: "https://images.unsplash.com/photo-1544717297-fa95b6ee9643?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", desc: "Builder floors • Ready-to-move • Micro-market fit" },
            { id: 6, name: "Ananya Rao", role: "Project Advisor", image: "https://images.unsplash.com/photo-1562071707-7249ab429b2a?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", desc: "Under-construction • Developer credibility • Timelines" },
          ].map((m) => (
            <motion.div key={m.id} initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} className="border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all reveal">
              <div className="relative h-44">
                <Image src={m.image} alt={m.name} fill className="object-cover" />
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <h4 className="text-lg font-bold text-gray-900">{m.name}</h4>
                  <span className="text-xs font-bold text-sky-600">{m.role}</span>
                </div>
                <p className="text-gray-600 text-sm mt-2">{m.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mt-16">
          <motion.div initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} className="border border-gray-200 rounded-2xl p-6 lg:p-8 bg-white reveal">
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">Core Expertise</h3>
            <ul className="text-gray-600 space-y-3 list-disc list-inside leading-relaxed">
              <li>Builder floors, apartments, villas, plotted land</li>
              <li>Developer credibility and construction quality checks</li>
              <li>Pricing logic, negotiation, and acquisition strategy</li>
              <li>RERA compliance and transaction documentation</li>
              <li>Long-term suitability and exit clarity</li>
            </ul>
          </motion.div>
          <motion.div initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} className="border border-gray-200 rounded-2xl p-6 lg:p-8 bg-white reveal">
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">Advisory Approach</h3>
            <ul className="text-gray-600 space-y-3 list-disc list-inside leading-relaxed">
              <li>Requirement capture and shortlist creation</li>
              <li>On-ground evaluation and comparative analysis</li>
              <li>Risk assessment and developer checks</li>
              <li>Price reasoning and negotiation strategy</li>
              <li>Transaction closure with documentation support</li>
            </ul>
          </motion.div>
        </div>

        <div className="mt-16 reveal">
          <div className="rounded-2xl border border-gray-200 p-6 md:p-8 bg-gray-50">
            <h3 className="text-xl md:text-2xl font-bold text-gray-900">Get Advisory-Led Guidance</h3>
            <p className="text-gray-600 mt-2">Share your requirement and we will shortlist right-fit options aligned to your goals. No redirects—everything happens on this page.</p>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              <input type="text" placeholder="Name" className="px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-500 text-sm" />
              <input type="email" placeholder="Email" className="px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-500 text-sm" />
              <input type="text" placeholder="Budget • Location" className="px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-500 text-sm" />
            </div>
            <button className="mt-4 px-6 py-3 rounded-lg bg-black text-white text-sm font-bold hover:bg-gray-800">Request Shortlist</button>
          </div>
        </div>
      </div>
    </section>
  );
}
