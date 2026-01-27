"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { communities } from "@/data/communities";

const residences = [
  {
    title: "Trump Towers",
    location: "Gurgaon",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1600&auto=format&fit=crop",
    price: "₹ 5.5 Cr",
    developer: "M3M"
  },
  {
    title: "Oberoi Sky City",
    location: "Borivali East, Mumbai",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1600&auto=format&fit=crop",
    price: "₹ 3.8 Cr",
    developer: "Oberoi Realty"
  }
];

export default function BrandedResidences() {
  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-350 mx-auto px-6">
        <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 font-sans tracking-tight"
        >
            Premium Property Evaluations
        </motion.h2>
        <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-gray-500 mb-12 max-w-2xl"
        >
            Selected premium properties evaluated for location strength, developer credibility, and long-term value.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {residences.map((item, idx) => {
                const match = communities.find((c) =>
                  String(item.location).toLowerCase().includes(c.name.toLowerCase())
                );
                const href = match ? `/community/${match.slug}` : "/community";
                return (
                <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.2 }}
                    className="group relative h-100 md:h-125 rounded-2xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500"
                >
                    <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent" />
                    
                    <div className="absolute top-6 left-6 bg-sky-500/90 backdrop-blur-md border border-sky-400/50 text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
                        {item.developer}
                    </div>

                    <div className="absolute bottom-8 left-8 right-8 text-white">
                        <div className="flex justify-between items-end mb-4">
                            <div>
                                <h3 className="text-3xl font-bold mb-2">{item.title}</h3>
                                <p className="text-gray-300 font-medium text-lg">{item.location}</p>
                            </div>
                            <div className="text-right hidden md:block">
                                <p className="text-sm text-gray-400 uppercase tracking-widest mb-1">Starting From</p>
                                <p className="text-2xl font-bold">{item.price}</p>
                            </div>
                        </div>
                        
                        <div className="h-0 group-hover:h-12 overflow-hidden transition-all duration-500">
                             <Link href={href} className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest hover:text-sky-400 transition-colors">
                                View Details <ArrowRight className="w-4 h-4" />
                             </Link>
                        </div>
                    </div>
                </motion.div>
            );
            })}
        </div>
      </div>
    </section>
  );
}
