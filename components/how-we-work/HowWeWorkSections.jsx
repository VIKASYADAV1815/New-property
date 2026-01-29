"use client";

import { motion } from "framer-motion";
import { 
  Search, FileCheck, MapPin, TrendingUp, 
  Handshake, ShieldCheck, Zap, Target, 
  BarChart3, Globe, ArrowRight
} from "lucide-react";

const processSteps = [
  {
    icon: Search,
    title: "Requirement Discovery",
    description: "Deep-dive into specific needs, budget, and location preferences to define a search strategy.",
    count: "01"
  },
  {
    icon: FileCheck,
    title: "Market Shortlisting",
    description: "Filtering properties based on developer track record, pricing logic, and actual value.",
    count: "02"
  },
  {
    icon: MapPin,
    title: "Project Analysis",
    description: "On-ground site visits to analyze construction quality and future usability beyond aesthetics.",
    count: "03"
  },
  {
    icon: TrendingUp,
    title: "Decision Support",
    description: "Transparent, data-backed guidance to finalize an asset that secures your capital.",
    count: "04"
  }
];

const evaluationCriteria = [
  { title: "Location", icon: MapPin },
  { title: "Developer", icon: ShieldCheck },
  { title: "Quality", icon: Zap },
  { title: "Pricing", icon: BarChart3 },
  { title: "Usability", icon: Target },
  { title: "Timing", icon: Globe }
];

export default function HowWeWorkSections() {
  return (
    <section className="relative py-16 md:py-24 bg-white text-slate-900 overflow-hidden font-sans">
      
      <div className="max-w-7xl mx-auto px-6">
        
        {/* ---------- HEADER: ARCHITECTURAL STYLE ---------- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-20">
          <div className="lg:col-span-8">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-10 h-[2px] bg-blue-600" />
              <span className="text-[10px] font-black uppercase tracking-[0.5em] text-blue-600">The Methodology</span>
            </div>
            <h2 className="text-5xl md:text-8xl font-bold tracking-tighter leading-[0.9]">
              Strategic <span className="font-light text-slate-400">Selection</span>
            </h2>
          </div>
          <div className="lg:col-span-4 flex items-end">
            <p className="text-slate-500 text-sm md:text-base border-l-2 border-slate-200 pl-6 py-2">
              Our framework ensures capital security through data-backed site analysis and developer auditing.
            </p>
          </div>
        </div>

        {/* ---------- PROCESS STEPS: BENTO GRID ---------- */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-px bg-slate-100 border border-slate-100 rounded-3xl overflow-hidden mb-24 shadow-sm">
          {processSteps.map((step, idx) => (
            <div key={idx} className="bg-white p-8 md:p-10 hover:bg-slate-50 transition-all group">
              <div className="flex flex-col h-full">
                <span className="text-[10px] font-bold text-blue-600 mb-8 flex items-center gap-2 tracking-widest">
                  PHASE {step.count}
                </span>
                <step.icon className="w-7 h-7 text-slate-900 mb-6 group-hover:text-blue-600 transition-colors duration-300" />
                <h3 className="text-base font-bold uppercase tracking-tight mb-4">{step.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* ---------- REDESIGNED AUDIT PARAMETERS: MINIMALIST WHITE UI ---------- */}
        <div className="mb-32">
          <div className="flex flex-col md:flex-row justify-between items-baseline mb-12 border-b border-slate-100 pb-6 gap-4">
            <div>
              <h3 className="text-xl font-bold tracking-tight text-slate-900">Audit Parameters</h3>
              <p className="text-slate-400 text-xs mt-1 uppercase tracking-widest font-medium">6-Point Verification Grid</p>
            </div>
            <div className="text-[10px] font-bold text-blue-600 uppercase tracking-[0.2em] px-3 py-1 bg-blue-50 rounded">
              Precision Grade A
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-y-12">
            {evaluationCriteria.map((item, i) => (
              <div key={i} className="flex flex-col items-center md:items-start px-4 border-r border-slate-50 last:border-0 group">
                <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center mb-5 group-hover:bg-blue-600 group-hover:shadow-lg group-hover:shadow-blue-200 transition-all duration-300">
                  <item.icon className="w-5 h-5 text-slate-400 group-hover:text-white transition-colors" />
                </div>
                <span className="text-[11px] font-black uppercase tracking-widest text-slate-800 group-hover:text-blue-600 transition-colors">
                  {item.title}
                </span>
                <div className="w-0 h-[2px] bg-blue-600 mt-2 group-hover:w-8 transition-all duration-500" />
              </div>
            ))}
          </div>
        </div>

        {/* ---------- CTA SECTION: ORIGINAL DESIGN / REDUCED HEIGHT ---------- */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative bg-white border border-gray-200 rounded-[2rem] md:rounded-[3rem] p-8 md:p-14 text-center overflow-hidden"
        >
          <div
            className="absolute inset-0 bg-cover bg-center opacity-30 md:opacity-40 grayscale pointer-events-none"
            style={{ backgroundImage: "url('/bg2.webp')" }}
          />
          <div className="relative z-10">
           
            <h3 className="text-2xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight leading-tight">
              Ready to Begin Your <br className="hidden md:block" /> Property Journey?
            </h3>
            <p className="text-gray-600 mb-8 max-w-xl mx-auto text-sm md:text-lg font-light">
              Schedule a consultation with our advisory team to discuss your property requirement.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center gap-3 bg-black text-white px-8 py-4 md:px-10 md:py-5 rounded-full text-xs md:text-sm font-bold uppercase tracking-widest hover:bg-sky-600 transition-all shadow-xl active:scale-95"
            >
              Consultation <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </motion.div>

      </div>
    </section>
  );
}