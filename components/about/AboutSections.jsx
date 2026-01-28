"use client";
import gsap from "gsap";
import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export default function AboutSections() {
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
          <span className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-3 block">About Us</span>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 font-sans tracking-tight mb-4">Founder-Led Advisory</h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl leading-relaxed">Real estate guidance rooted in experience, intelligence, and long-term vision.</p>
        </div>

        {/* Founder Statement — full paragraph in italic with founder image */}
        <div className="reveal" style={{ opacity: 0 }}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-start mb-16">
            <div className="lg:col-span-2 lg:sticky lg:top-24 lg:self-start">
              <div className="bg-gray-50 border border-gray-100 rounded-2xl p-6 md:p-8 lg:p-10">
                <p>About Us</p>
                <p className="mt-3">PropertySearch.in is a founder-led real estate advisory platform established by Akshit Kapoor, built on experience, market intelligence, and long-term vision.</p>
                <p className="mt-3">With over 20 years of hands-on involvement in real estate and construction, Akshit Kapoor has worked closely with residential projects across multiple formats—ranging from builder floors and independent houses to group housing apartments, plotted developments, villas, and mixed-use residential projects.</p>
                <p className="mt-3">PropertySearch.in was created to move beyond typical brokerage practices and offer structured, trustworthy, and insight-driven property guidance.</p>

                <p className="mt-6">Founder's Experience</p>
                <p className="mt-3">Akshit Kapoor's real estate journey spans:</p>
                <ul className="mt-3 list-disc list-inside space-y-1">
                  <li>Residential apartments and group housing projects</li>
                  <li>Builder floors and independent residences</li>
                  <li>Premium and mid-segment housing</li>
                  <li>Plotted developments and land parcels</li>
                  <li>Project planning, execution, and buyer advisory</li>
                </ul>
                <p className="mt-3">His experience includes working with developer-led apartment projects such as Bilaz Apartments, along with several other residential developments—giving him a clear understanding of how projects are planned, priced, positioned, and delivered on-ground.</p>
                <p className="mt-3">This exposure allows PropertySearch.in to evaluate projects not just as listings, but as real assets with long-term implications.</p>

                <p className="mt-6">What We Deal In</p>
                <p className="mt-3">PropertySearch.in is not restricted to one property format.</p>
                <p className="mt-3">We actively deal in:</p>
                <ul className="mt-3 list-disc list-inside space-y-1">
                  <li>Residential apartments & group housing projects</li>
                  <li>Builder floors (1 BHK to 3 BHK and beyond)</li>
                  <li>Independent houses and villas</li>
                  <li>Residential plots and land investments</li>
                  <li>Select under-construction and ready-to-move developments</li>
                </ul>
                <p className="mt-3">Each property is assessed on location strength, developer credibility, construction quality, pricing logic, and future usability—not just surface appeal.</p>

                <p className="mt-6">Our Advisory Philosophy</p>
                <p className="mt-3">At PropertySearch.in, real estate is treated as a decision, not a deal.</p>
                <p className="mt-3">Our approach is built on:</p>
                <ul className="mt-3 list-disc list-inside space-y-1">
                  <li>Honest evaluation over aggressive selling</li>
                  <li>Market clarity over exaggerated claims</li>
                  <li>Long-term suitability over short-term hype</li>
                </ul>
                <p className="mt-3">Whether the requirement is a personal residence or an investment asset, the focus remains on right-fit properties backed by logic and transparency.</p>

                <p className="mt-6">Vision of the Founder</p>
                <p className="mt-3">Akshit Kapoor envisions PropertySearch.in as a trusted real estate intelligence platform, where buyers, investors, and families feel guided with clarity and confidence.</p>
                <p className="mt-3">The long-term goal is to:</p>
                <ul className="mt-3 list-disc list-inside space-y-1">
                  <li>Create a reputation rooted in integrity and insight</li>
                  <li>Bridge the gap between developers and end-users responsibly</li>
                  <li>Elevate real estate advisory standards through knowledge, discipline, and trust</li>
                </ul>
                <p className="mt-3">PropertySearch.in aims to grow as a relationship-driven brand, not a volume-driven portal.</p>
              </div>
            </div>
            <div className="lg:col-span-1">
              <div className="relative h-64 md:h-80 lg:h-96 rounded-2xl overflow-hidden border border-gray-200 bg-gray-100">
                <Image
                  src="https://images.unsplash.com/photo-1566753323558-f4e0952af115?q=80&w=1200&auto=format&fit=crop"
                  alt="Founder Akshit Kapoor"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="mt-4">
                <p className="text-sm font-bold text-gray-900">Akshit Kapoor</p>
                <p className="text-xs text-gray-500 mt-1">Founder, PropertySearch.in</p>
              </div>
              
              {/* Additional Info Cards */}
              <div className="mt-6 space-y-3">
                <div className="border border-gray-200 rounded-xl p-4 bg-gray-50">
                  <div className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">Experience</div>
                  <div className="text-lg font-bold text-gray-900">20+ Years</div>
                  <div className="text-xs text-gray-600 mt-1">In Real Estate & Construction</div>
                </div>
                <div className="border border-gray-200 rounded-xl p-4 bg-gray-50">
                  <div className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">Projects</div>
                  <div className="text-lg font-bold text-gray-900">100+</div>
                  <div className="text-xs text-gray-600 mt-1">Residential Projects Delivered</div>
                </div>
                <div className="border border-gray-200 rounded-xl p-4 bg-gray-50">
                  <div className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">Expertise</div>
                  <div className="text-sm font-semibold text-gray-900">Multi-Format</div>
                  <div className="text-xs text-gray-600 mt-1">Apartments, Villas, Plots</div>
                </div>
                
                {/* bg1.png below Expertise */}
                <div className="relative w-full h-48 md:h-175 mt-6 lg:mt-40 opacity-20 pointer-events-none">
                  <Image src="/bg1.png" alt="Background" fill className="object-contain object-top" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sections aligned to the statement */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-8">
          <motion.div initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} className="border border-gray-200 rounded-2xl p-0 bg-white reveal relative overflow-hidden">
            <div className="absolute inset-0 opacity-80 pointer-events-none">
              <Image src="/bg9.avif" alt="Background" fill className="object-cover" />
            </div>
            <div className="relative z-10 p-6 lg:p-8">
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">Founder's Experience</h3>
              <ul className="text-gray-600 space-y-3 list-disc list-inside leading-relaxed">
                <li>Residential apartments and group housing projects</li>
                <li>Builder floors and independent residences</li>
                <li>Premium and mid-segment housing</li>
                <li>Plotted developments and land parcels</li>
                <li>Project planning, execution, and buyer advisory</li>
              </ul>
            </div>
          </motion.div>

          <motion.div initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} className="border border-gray-200 rounded-2xl p-0 bg-white reveal relative overflow-hidden">
            <div className="absolute inset-0 opacity-80 pointer-events-none">
              <Image src="/bg9.avif" alt="Background" fill className="object-cover" />
            </div>
            <div className="relative z-10 p-6 lg:p-8">
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">What We Deal In</h3>
              <ul className="text-gray-600 space-y-3 list-disc list-inside leading-relaxed">
                <li>Residential apartments & group housing projects</li>
                <li>Builder floors (1 BHK to 3 BHK and beyond)</li>
                <li>Independent houses and villas</li>
                <li>Residential plots and land investments</li>
                <li>Select under-construction and ready-to-move developments</li>
              </ul>
              <p className="mt-4 text-gray-600 leading-relaxed">Each property is assessed on location strength, developer credibility, construction quality, pricing logic, and future usability.</p>
            </div>
          </motion.div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          <motion.div initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} className="border border-gray-200 rounded-2xl p-0 bg-white reveal relative overflow-hidden">
            <div className="absolute inset-0 opacity-80 pointer-events-none">
              <Image src="/bg9.avif" alt="Background" fill className="object-cover" />
            </div>
            <div className="relative z-10 p-6 lg:p-8">
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">Our Advisory Philosophy</h3>
              <ul className="text-gray-600 space-y-3 list-disc list-inside leading-relaxed">
                <li>Honest evaluation over aggressive selling</li>
                <li>Market clarity over exaggerated claims</li>
                <li>Long-term suitability over short-term hype</li>
              </ul>
              <p className="mt-4 text-gray-600 leading-relaxed">For residence or investment, we recommend right-fit properties backed by logic and transparency.</p>
            </div>
          </motion.div>

          <motion.div initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} className="border border-gray-200 rounded-2xl p-0 bg-white reveal relative overflow-hidden">
            <div className="absolute inset-0 opacity-80 pointer-events-none">
              <Image src="/bg9.avif" alt="Background" fill className="object-cover" />
            </div>
            <div className="relative z-10 p-6 lg:p-8">
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">Vision of the Founder</h3>
              <ul className="text-gray-600 space-y-3 list-disc list-inside leading-relaxed">
                <li>Create a reputation rooted in integrity and insight</li>
                <li>Bridge the gap between developers and end-users responsibly</li>
                <li>Elevate advisory standards through knowledge, discipline, and trust</li>
              </ul>
              <p className="mt-4 text-gray-600 leading-relaxed">PropertySearch.in aims to grow as a relationship-driven brand, not a volume-driven portal.</p>
            </div>
          </motion.div>
        </div>

        <div className="mt-12 md:mt-16 reveal">
          <div className="rounded-3xl border border-gray-200 bg-linear-to-br from-white to-gray-50 p-8 md:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
              <div className="lg:col-span-1">
                <div className="text-xl md:text-2xl lg:text-3xl font-serif italic text-gray-900 leading-relaxed">
                  "Real estate is a long-term decision. Discipline, clarity, and trust guide every recommendation."
                </div>
                <div className="mt-6">
                  <div className="text-sm font-bold text-gray-900">Akshit Kapoor</div>
                  <div className="text-xs text-gray-500">Founder, PropertySearch.in</div>
                </div>
              </div>
              <div className="lg:col-span-2">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="rounded-2xl border border-gray-200 bg-white p-6">
                    <div className="text-xs font-bold text-gray-500 uppercase tracking-widest">Years Experience</div>
                    <div className="text-3xl font-bold text-gray-900 mt-2">20+</div>
                    <div className="text-xs text-gray-600 mt-1">Real Estate & Construction</div>
                  </div>
                  <div className="rounded-2xl border border-gray-200 bg-white p-6">
                    <div className="text-xs font-bold text-gray-500 uppercase tracking-widest">Projects Guided</div>
                    <div className="text-3xl font-bold text-gray-900 mt-2">100+</div>
                    <div className="text-xs text-gray-600 mt-1">Across Delhi NCR</div>
                  </div>
                  <div className="rounded-2xl border border-gray-200 bg-white p-6">
                    <div className="text-xs font-bold text-gray-500 uppercase tracking-widest">Core Focus</div>
                    <div className="text-3xl font-bold text-gray-900 mt-2">Advisory</div>
                    <div className="text-xs text-gray-600 mt-1">Clarity over hype</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="rounded-2xl border border-gray-200 bg-white p-6">
                <div className="text-sm font-bold text-gray-900">Milestones</div>
                <ul className="mt-3 text-sm text-gray-600 space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-sky-500 mt-2" />
                    <div>
                      <div className="font-semibold text-gray-900">Residential Depth</div>
                      <div>Work across apartments, builder floors, villas, and plots with hands-on project understanding.</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-sky-500 mt-2" />
                    <div>
                      <div className="font-semibold text-gray-900">Developer Interface</div>
                      <div>Experience with developer-led projects, pricing logic, and on-ground delivery.</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-sky-500 mt-2" />
                    <div>
                      <div className="font-semibold text-gray-900">Buyer Advisory</div>
                      <div>Right-fit guidance with transparent evaluation and long-term suitability.</div>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="rounded-2xl border border-gray-200 bg-white p-6">
                <div className="text-sm font-bold text-gray-900">Approach</div>
                <div className="mt-3 text-sm text-gray-600 leading-relaxed">
                  Every recommendation balances location strength, developer credibility, construction quality, pricing logic, and future usability. The objective is confidence and clarity, whether for residence or investment.
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="px-3 py-1 rounded-full border border-gray-200 text-xs font-bold text-gray-900">Integrity</span>
                  <span className="px-3 py-1 rounded-full border border-gray-200 text-xs font-bold text-gray-900">Clarity</span>
                  <span className="px-3 py-1 rounded-full border border-gray-200 text-xs font-bold text-gray-900">Discipline</span>
                  <span className="px-3 py-1 rounded-full border border-gray-200 text-xs font-bold text-gray-900">Trust</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
