"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const propertyTypes = [
  { name: "Residential Apartments & Group Housing", description: "Evaluated for location, developer track record, and long-term value", image: "https://images.unsplash.com/photo-1580041065738-e72023775cdc?q=80&w=1170&auto=format&fit=crop" },
  { name: "Builder Floors & Independent Homes", description: "Assessed for construction quality, pricing logic, and usability", image: "https://images.unsplash.com/photo-1574362848149-11496d93a7c7?q=80&w=1084&auto=format&fit=crop" },
  { name: "Villas & Premium Residences", description: "Curated based on location strength and developer credibility", image: "https://images.unsplash.com/photo-1523192193543-6e7296d960e4?q=80&w=1170&auto=format&fit=crop" },
  { name: "Plots & Land Investments", description: "Evaluated for future development potential and location advantages", image: "https://images.unsplash.com/photo-1580041065738-e72023775cdc?q=80&w=1170&auto=format&fit=crop" },
];

export default function BentoGrid() {
  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-12 md:mb-16">
          <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-gray-900 font-sans tracking-tight"
          >
              Property Types We Evaluate
          </motion.h2>
          <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-lg md:text-xl text-gray-600 max-w-3xl leading-relaxed"
          >
              Our advisory covers multiple property formats, each assessed for location strength, developer credibility, construction quality, pricing logic, and long-term usability.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            {/* Large Card (Left) */}
            <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="lg:col-span-1 bg-white rounded-2xl overflow-hidden relative min-h-100up cursor-pointer shadow-sm hover:shadow-xl transition-all"
            >
                <Image 
                    src="https://images.unsplash.com/photo-1523192193543-6e7296d960e4?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="DLF"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />
                
                <div className="absolute top-8 left-1/2 -translate-x-1/2 bg-white px-6 py-3 rounded-lg shadow-lg">
                    <span className="font-bold text-xl tracking-widest text-sky-600">Apartments</span>
                </div>

                <div className="absolute bottom-8 left-8 right-8 text-center text-white">
                    <h3 className="text-2xl font-bold mb-2">Residential Apartments & Group Housing</h3>
                    <p className="text-sm text-gray-300 mb-4 line-clamp-3">
                        We evaluate apartments and group housing projects based on location strength, developer credibility, construction quality, pricing logic, and long-term value—not just surface appeal.
                    </p>
                    <div className="text-center mb-6">
                         <span className="font-bold text-xl">Expert</span>
                         <span className="block text-xs text-gray-400">Evaluation & Guidance</span>
                    </div>
                    <Link href="/contact" className="bg-sky-500 text-white px-6 py-2 rounded-full text-sm font-bold hover:bg-sky-600 transition-colors w-full block text-center">
                        Discuss Your Requirement →
                    </Link>
                </div>
            </motion.div>

            {/* Grid Cards (Right) */}
            <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                {propertyTypes.map((type, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.1 }}
                        className="bg-white rounded-2xl p-8 flex flex-col items-center text-center justify-between border border-gray-100 hover:shadow-lg transition-all group"
                    >
                        <div className="relative overflow-hidden rounded-xl w-full min-h-60">
                            <Image
                              src={type.image}
                              alt={type.name}
                              fill
                              className="object-cover transition-transform duration-700 group-hover:scale-105 grayscale group-hover:grayscale-0"
                            />
                            <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/30 to-transparent" />
                            <div className="absolute bottom-4 left-4 right-4 text-white text-left">
                                <h3 className="font-bold text-lg mb-1">{type.name}</h3>
                                <p className="text-gray-200 text-sm mb-4">{type.description}</p>
                                <Link href="/contact" className="border border-white/40 text-white px-6 py-2 rounded-md text-xs font-bold uppercase tracking-wider hover:bg-white hover:text-black transition-all inline-block">
                                    Get Guidance →
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>

         <div className="mt-12 text-center flex justify-end">
            <Link href="/contact" className="flex items-center gap-2 text-sm font-bold text-gray-900 border border-gray-300 px-6 py-3 rounded-full hover:bg-sky-500 hover:text-white hover:border-sky-500 transition-all">
                Discuss Your Requirement <ArrowRight className="w-4 h-4" />
            </Link>
        </div>
      </div>
    </section>
  );
}
