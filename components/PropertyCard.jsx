"use client";
import { motion } from "framer-motion";
import { Bed, Calendar } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function PropertyCard({ property, index }) {
  const beds = Number(property?.beds);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="group relative bg-white rounded-xl overflow-hidden border border-gray-200 hover:shadow-md transition-all duration-500 hover:-translate-y-1 cursor-pointer shrink-0 w-85 md:w-95 h-full flex flex-col"
    >
      {/* Image Container */}
      <div className="relative h-40 md:h-62.5 overflow-hidden">
        <Image
          src={property.image}
          alt={property.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="p-6 flex-1 flex flex-col">
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
              <span>{Number.isFinite(beds) && beds > 0 ? `${beds} & ${beds + 1} Bedroom` : "Bedroom details on request"}</span>
            </div>
         </div>

        {/* Action Button */}
        <div className="border-t border-gray-100 pt-4 mt-auto">
             <Link
               href="/contact"
               className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-lg bg-sky-500 text-white hover:bg-sky-600 transition-all duration-300 text-xs font-bold uppercase tracking-wider shadow-md hover:shadow-lg"
             >
                <Calendar className="w-4 h-4" />
                Book a Meeting
             </Link>
        </div>
      </div>
    </motion.div>
  );
}
