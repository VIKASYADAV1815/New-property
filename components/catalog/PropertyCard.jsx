"use client";
import { motion } from "framer-motion";
import Image from "next/image";

export default function PropertyCard({ item, onSelect }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group cursor-pointer"
      onClick={() => onSelect(item)}
    >
      <div className="relative h-52 md:h-56 rounded-2xl overflow-hidden mb-3 shadow-sm">
        <Image
          src={item.image}
          alt={item.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {item.tag && (
          <div className="absolute top-3 left-3 bg-sky-500 text-white px-3 py-1 rounded text-[10px] font-bold uppercase tracking-wider">
            {item.tag}
          </div>
        )}
      </div>
      <div className="px-1">
        <h3 className="font-bold text-base md:text-lg text-gray-900 mb-0.5">{item.title}</h3>
        {item.location && <p className="text-xs md:text-sm text-gray-500 mb-2">{item.location}</p>}
        <div className="flex items-center justify-between">
          {item.price ? (
            <p className="font-bold text-sky-600">{item.price}</p>
          ) : (
            <p className="text-xs text-gray-500">{item.date || ""}</p>
          )}
          <span className="text-xs text-gray-500">{item.rating || "★ 4.7/5"}</span>
        </div>
      </div>
    </motion.div>
  );
}
