"use client";
import gsap from "gsap";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function ContactSections() {
  const ref = useRef(null);
  const pathname = usePathname();
  
  useEffect(() => {
    if (!ref.current) return;
    
    // Use requestAnimationFrame to ensure DOM is ready
    const timer = requestAnimationFrame(() => {
      const elements = ref.current.querySelectorAll(".reveal");
      
      // Set initial state
      gsap.set(elements, { opacity: 0, y: 20 });
      
      // Animate to visible state
      gsap.to(elements, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
      });
    });
    
    return () => cancelAnimationFrame(timer);
  }, [pathname]);
  return (
    <section ref={ref} className="relative z-10 py-16 md:py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-12 md:mb-16 reveal" style={{ opacity: 0 }}>
          <span className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-3 block">Contact Us</span>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 font-sans tracking-tight mb-4">Let's Discuss Your Property Requirement</h1>
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed">Schedule a consultation with our advisory team</p>
        </div>

        <div className="reveal mb-12" style={{ opacity: 0 }}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-start">
            <div className="lg:col-span-2">
              <div className="text-gray-700 leading-relaxed bg-gray-50 border border-gray-100 rounded-2xl p-6 md:p-8 lg:p-10">
                <p>PropertySearch.in is a founder-led real estate advisory platform established by Akshit Kapoor, built on experience, market intelligence, and long-term vision.</p>
                <p className="mt-3">With over 20 years of hands-on involvement in real estate and construction, Akshit Kapoor has worked closely with residential projects across multiple formats—ranging from builder floors and independent houses to group housing apartments, plotted developments, villas, and mixed-use residential projects.</p>
                <p className="mt-3">PropertySearch.in was created to move beyond typical brokerage practices and offer structured, trustworthy, and insight-driven property guidance.</p>
                <p className="mt-3">His experience includes working with developer-led apartment projects such as Bilaz Apartments, along with several other residential developments—giving him a clear understanding of how projects are planned, priced, positioned, and delivered on-ground.</p>
                <p className="mt-3">This exposure allows PropertySearch.in to evaluate projects not just as listings, but as real assets with long-term implications.</p>
              </div>
            </div>
            <div className="lg:col-span-1">
              <div className="relative h-72 md:h-80 rounded-2xl overflow-hidden border border-gray-200 bg-gray-100">
                <Image
                  src="https://images.unsplash.com/photo-1566753323558-f4e0952af115?q=80&w=1200&auto=format&fit=crop"
                  alt="Founder Portrait"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="mt-4">
                <p className="text-sm font-bold text-gray-900">Akshit Kapoor</p>
                <p className="text-xs text-gray-500 mt-1">Founder, PropertySearch.in</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-8">
          <motion.div initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} className="border border-gray-200 rounded-2xl p-6 lg:p-8 bg-white reveal">
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">Founder's Experience</h3>
            <ul className="text-gray-600 space-y-3 list-disc list-inside leading-relaxed">
              <li>Residential apartments and group housing</li>
              <li>Builder floors and independent residences</li>
              <li>Premium and mid-segment housing</li>
              <li>Plotted developments and land parcels</li>
              <li>Project planning, execution, and buyer advisory</li>
            </ul>
            <p className="mt-4 text-gray-600 leading-relaxed">Experience with developer-led apartment projects such as Bilaz Apartments and other developments—understanding planning, pricing, positioning, and on-ground delivery.</p>
          </motion.div>

          <motion.div initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} className="border border-gray-200 rounded-2xl p-6 lg:p-8 bg-white reveal">
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">What We Deal In</h3>
            <ul className="text-gray-600 space-y-3 list-disc list-inside leading-relaxed">
              <li>Residential apartments & group housing</li>
              <li>Builder floors (1–3 BHK and beyond)</li>
              <li>Independent houses and villas</li>
              <li>Residential plots and land investments</li>
              <li>Select under-construction and ready-to-move</li>
            </ul>
            <p className="mt-4 text-gray-600 leading-relaxed">Each property is assessed on location strength, developer credibility, construction quality, pricing logic, and future usability.</p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          <motion.div initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} className="border border-gray-200 rounded-2xl p-6 lg:p-8 bg-white reveal">
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">Our Advisory Philosophy</h3>
            <ul className="text-gray-600 space-y-3 list-disc list-inside leading-relaxed">
              <li>Honest evaluation over aggressive selling</li>
              <li>Market clarity over exaggerated claims</li>
              <li>Long-term suitability over short-term hype</li>
            </ul>
            <p className="mt-4 text-gray-600 leading-relaxed">Whether personal residence or investment asset, the focus remains on right-fit properties backed by logic and transparency.</p>
          </motion.div>

          <motion.div initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} className="border border-gray-200 rounded-2xl p-6 lg:p-8 bg-white reveal">
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">Vision of the Founder</h3>
            <ul className="text-gray-600 space-y-3 list-disc list-inside leading-relaxed">
              <li>Create a reputation rooted in integrity and insight</li>
              <li>Bridge the gap between developers and end-users responsibly</li>
              <li>Elevate advisory standards through knowledge and trust</li>
            </ul>
            <p className="mt-4 text-gray-600 leading-relaxed">PropertySearch.in aims to grow as a relationship-driven brand, not a volume-driven portal.</p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mt-12">
          <motion.div initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} className="border border-gray-200 rounded-2xl overflow-hidden shadow-sm transition-all reveal p-6 lg:p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-2">Office</h3>
            <p className="text-gray-600 mt-1">Golf Course Road, Gurugram • hello@propertysearch.in</p>
          </motion.div>
          <motion.div initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} className="border border-gray-200 rounded-2xl overflow-hidden shadow-sm transition-all reveal p-6 lg:p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-2">Contact</h3>
            <p className="text-gray-600 mt-1">+91 98765 43210 • Mon–Sat, 9am–7pm</p>
          </motion.div>
        </div>
        
        <div className="mt-12 md:mt-16 reveal" style={{ opacity: 0 }}>
          <div className="max-w-2xl mx-auto bg-white p-6 md:p-8 lg:p-10 rounded-2xl border border-gray-200 shadow-sm">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 md:mb-8">Send a Message</h3>
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5 uppercase tracking-wide">First Name</label>
                  <input type="text" className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5 uppercase tracking-wide">Last Name</label>
                  <input type="text" className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all text-sm" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5 uppercase tracking-wide">Email</label>
                <input type="email" className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all text-sm" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5 uppercase tracking-wide">Budget Range</label>
                  <select className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all bg-white text-sm">
                    <option>Select Budget Range</option>
                    <option>Under ₹ 1 Cr</option>
                    <option>₹ 1 Cr - ₹ 3 Cr</option>
                    <option>₹ 3 Cr - ₹ 5 Cr</option>
                    <option>₹ 5 Cr - ₹ 10 Cr</option>
                    <option>Above ₹ 10 Cr</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5 uppercase tracking-wide">Buying For</label>
                  <select className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all bg-white text-sm">
                    <option>Select Purpose</option>
                    <option>Self Use</option>
                    <option>Investment</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5 uppercase tracking-wide">Message</label>
                <textarea rows={4} className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all text-sm resize-none" />
              </div>
              <button type="submit" className="w-full py-3 bg-black text-white font-bold rounded-lg hover:bg-gray-800 transition-all text-sm">
                Schedule Consultation
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
