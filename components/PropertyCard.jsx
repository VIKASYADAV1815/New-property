"use client";
import { motion } from "framer-motion";
import { Bed, Bath, Square, Calendar } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function PropertyCard({ property, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="group relative bg-white rounded-xl overflow-hidden border border-gray-200 hover:shadow-md transition-all duration-500 hover:-translate-y-1 cursor-pointer shrink-0 w-85 md:w-95"
    >
      {/* Image Container */}
      <div className="relative h-40 md:h-62.5 overflow-hidden">
        <Image
          src={property.image}
          alt={property.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        
        {/* Tag */}
        <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider shadow-sm text-sky-600">
          {property.tag || "VILLAS"}
        </div>
        
        {/* Developer Logo Placeholder */}
        <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md px-2 py-1 rounded-md shadow-sm">
            <span className="text-[10px] font-bold text-gray-800 tracking-widest">EMAAR</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="mb-4">
          <h3 className="text-lg font-bold text-gray-900 mb-1 font-sans tracking-tight">{property.title}</h3>
          <p className="text-xs text-gray-500 font-medium">{property.location}</p>
        </div>

        <div className="mb-6">
            <p className="text-sm font-bold text-gray-900">Starting From</p>
            <p className="text-xl font-bold text-gray-900">{property.price}</p>
        </div>

        {/* Specs Row */}
         <div className="flex items-center gap-4 text-xs text-gray-500 font-medium mb-6">
            <div className="flex items-center gap-1.5">
                 <Bed className="w-4 h-4 text-gray-400" />
                 <span>{property.beds} & {property.beds + 1} Bedroom</span>
            </div>
         </div>

        {/* Action Button */}
        <div className="flex justify-between items-center border-t border-gray-100 pt-4 mt-auto">
             <Link href="/contact" className="w-full">
               <span className="block w-full py-3 rounded-lg bg-sky-500 text-white hover:bg-sky-600 transition-all duration-300 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-md hover:shadow-lg">
                  <Calendar className="w-4 h-4" />
                  Book a Meeting
               </span>
             </Link>
        </div>
      </div>
    </motion.div>
  );
}
