"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { usePathname } from "next/navigation";
import { 
  Mail, 
  Phone, 
  MapPin, 
  ArrowRight, 
  ChevronDown, 
  Headphones, 
  ShieldCheck, 
  Quote,
  Clock,
  Send,
  Maximize2
} from "lucide-react";

export default function ContactSections() {
  const sectionRef = useRef(null);
  const pathname = usePathname();

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const elements = gsap.utils.toArray(".reveal");
      gsap.set(elements, { opacity: 0, y: 20 });
      gsap.to(elements, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [pathname]);

  return (
    <section ref={sectionRef} className="relative z-10 bg-white py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* ---------- HEADER ---------- */}
        <div className="mb-12 reveal">
          <span className="block text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-3">
            Inquiry & Support
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight tracking-tight">
            Ready to start your <br />
            <span className="text-gray-400 font-serif italic">Property Journey?</span>
          </h1>
        </div>

        {/* ---------- SERVICE COMMITMENT CARD ---------- */}
        <div className="mt-10 mb-16 reveal">
          <div className="rounded-2xl border border-gray-200 bg-linear-to-br from-white to-gray-50 p-8 md:p-10 shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
              <div className="lg:col-span-1">
                <Quote className="w-6 h-6 text-gray-300 mb-4" />
                <div className="text-xl md:text-2xl font-serif italic text-gray-900 leading-relaxed">
                  "Our goal isn't just to close a deal, but to ensure you have the data and peace of mind to make the right move."
                </div>
                <div className="mt-6">
                  <div className="text-sm font-bold text-gray-900">Service Standards</div>
                  <div className="text-xs text-gray-500">PropertySearch Advisory Team</div>
                </div>
              </div>

              <div className="lg:col-span-2">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { label: "Response Time", val: "< 2hr", sub: "During Business Hours" },
                    { label: "Client Rating", val: "4.9/5", sub: "Based on 500+ Reviews" },
                    { label: "Market Access", val: "Direct", sub: "No Middlemen Fees" }
                  ].map((stat, i) => (
                    <div key={i} className="rounded-xl border border-gray-200 bg-white p-5">
                      <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{stat.label}</div>
                      <div className="text-2xl font-bold text-gray-900 mt-1">{stat.val}</div>
                      <div className="text-[11px] text-gray-500 mt-1">{stat.sub}</div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="rounded-xl border border-gray-200 bg-white p-6">
                    <div className="flex items-center gap-2 text-xs font-bold text-gray-900 uppercase tracking-widest mb-4">
                      <Headphones className="w-4 h-4 text-gray-400" /> Support Desk
                    </div>
                    <ul className="text-sm text-gray-600 space-y-3">
                      <li className="flex gap-3"><span className="w-1.5 h-1.5 rounded-full bg-gray-300 mt-1.5" /> Virtual Property Tours</li>
                      <li className="flex gap-3"><span className="w-1.5 h-1.5 rounded-full bg-gray-300 mt-1.5" /> Documentation Assistance</li>
                    </ul>
                  </div>
                  <div className="rounded-xl border border-gray-200 bg-white p-6">
                    <div className="flex items-center gap-2 text-xs font-bold text-gray-900 uppercase tracking-widest mb-4">
                      <ShieldCheck className="w-4 h-4 text-gray-400" /> Reliability
                    </div>
                    <p className="text-sm text-gray-500 leading-relaxed">
                      Every inquiry is handled by a senior advisor. We ensure 100% privacy and zero spam calls.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ---------- FORM & CONTACT DETAILS ---------- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch reveal">
          
          {/* Form Side - Using flex-col h-full to eliminate space */}
          <div className="lg:col-span-7 rounded-2xl border border-gray-200 bg-linear-to-br from-white to-gray-50 p-8 md:p-10 shadow-sm flex flex-col h-full">
            <h3 className="text-xl font-bold text-gray-900 mb-8 flex items-center gap-2">
              <Send className="w-5 h-5" /> Detailed Inquiry
            </h3>
            <form className="space-y-6 grow flex flex-col">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase text-gray-400 ml-1">Your Name</label>
                  <input type="text" placeholder="John Doe" className="w-full px-5 py-3 rounded-xl border border-gray-200 bg-white text-sm outline-none focus:border-black transition" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase text-gray-400 ml-1">Email</label>
                  <input type="email" placeholder="john@example.com" className="w-full px-5 py-3 rounded-xl border border-gray-200 bg-white text-sm outline-none focus:border-black transition" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase text-gray-400 ml-1">Property Interest</label>
                  <div className="relative">
                    <select className="w-full appearance-none px-5 py-3 rounded-xl border border-gray-200 bg-white text-sm outline-none cursor-pointer">
                      <option>Luxury Residential</option>
                      <option>Commercial Office</option>
                      <option>Retail Space</option>
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase text-gray-400 ml-1">Best Time to Call</label>
                  <div className="relative">
                    <select className="w-full appearance-none px-5 py-3 rounded-xl border border-gray-200 bg-white text-sm outline-none cursor-pointer">
                      <option>Morning (9am - 12pm)</option>
                      <option>Afternoon (1pm - 5pm)</option>
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  </div>
                </div>
              </div>

              <div className="space-y-1.5 grow flex flex-col">
                <label className="text-[10px] font-bold uppercase text-gray-400 ml-1">Requirements</label>
                <textarea placeholder="Tell us about location, size, or specific amenities..." className="w-full px-5 py-3 rounded-xl border border-gray-200 bg-white text-sm outline-none resize-none focus:border-black transition grow min-h-30" />
              </div>

              <button className="w-full py-4 rounded-xl bg-gray-900 text-white font-bold text-sm hover:bg-black transition-all flex items-center justify-center gap-2 group mt-4">
                Send Request
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          </div>

          {/* Details & Map Side */}
          <div className="lg:col-span-5 flex flex-col gap-6 h-full">
            {/* Map Integration */}
            <div className="rounded-2xl border border-gray-200 bg-white p-2 shadow-sm overflow-hidden group h-55 relative shrink-0">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3508.318465451671!2d77.0898!3d28.4394!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d18e800000001%3A0x0!2zMjjCsDI2JzIyLjEiTiA3N8KwMDUnMjMuMyJF!5e0!3m2!1sen!2sin!4v1600000000000"
                className="w-full h-full rounded-xl grayscale-[0.6] contrast-[1.1] group-hover:grayscale-0 transition-all duration-700"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
              />
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-6 grow">
              <h4 className="text-xs font-bold text-gray-900 uppercase tracking-widest mb-6">Reach Us Directly</h4>
              <div className="space-y-5">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center border border-gray-100 text-gray-400 shrink-0"><MapPin className="w-5 h-5" /></div>
                  <div>
                    <div className="text-[10px] font-bold uppercase text-gray-400">Head Office</div>
                    <div className="text-sm font-medium text-gray-900 mt-0.5">Golf Course Road, DLF Phase 5, Gurgaon</div>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center border border-gray-100 text-gray-400 shrink-0"><Phone className="w-5 h-5" /></div>
                  <div>
                    <div className="text-[10px] font-bold uppercase text-gray-400">Phone</div>
                    <div className="text-sm font-medium text-gray-900 mt-0.5">+91 98765 43210</div>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center border border-gray-100 text-gray-400 shrink-0"><Mail className="w-5 h-5" /></div>
                  <div>
                    <div className="text-[10px] font-bold uppercase text-gray-400">Email</div>
                    <div className="text-sm font-medium text-gray-900 mt-0.5">hello@propertysearch.in</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-2xl bg-gray-900 p-6 text-white relative overflow-hidden shrink-0">
              <Clock className="absolute -right-4 -top-4 w-20 h-20 text-white/5 rotate-12" />
              <h4 className="font-bold mb-1 text-base">Operational Hours</h4>
              <p className="text-[11px] text-gray-400 mb-4 leading-relaxed">Mon to Sat (9:00 AM - 7:00 PM).</p>
              <button className="w-full py-2.5 rounded-lg bg-white/10 hover:bg-white/20 border border-white/10 text-white font-bold text-[10px] uppercase tracking-widest transition">
                Request a Callback
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
