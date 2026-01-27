"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { FaWhatsapp, FaEnvelope } from "react-icons/fa";

export default function FloatingActions() {
  return (
    <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end gap-5 pointer-events-none">
        
        {/* Enquiry Now */}
        <Link href="/contact" className="pointer-events-auto" title="Enquiry Now">
          <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.1 }}
              className="group relative w-14 h-14 bg-black text-white rounded-full shadow-2xl flex items-center justify-center hover:bg-sky-500 hover:border-sky-500 transition-all hover:scale-110 border border-gray-700/50"
          >
              <FaEnvelope className="w-6 h-6" />
              <div className="absolute right-full mr-5 top-1/2 -translate-y-1/2 px-4 py-2 bg-black/90 backdrop-blur-md text-white text-xs font-bold rounded-xl opacity-0 group-hover:opacity-100 transition-all translate-x-2 group-hover:translate-x-0 whitespace-nowrap shadow-xl">
                  Schedule Consultation
              </div>
          </motion.div>
        </Link>

        {/* WhatsApp */}
        <a href="https://wa.me/?text=Hello%20I%20would%20like%20to%20discuss%20my%20property%20requirement" target="_blank" rel="noopener noreferrer" className="pointer-events-auto" title="WhatsApp">
          <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.2 }}
              className="group relative w-14 h-14 bg-[#25D366] text-white rounded-full shadow-2xl flex items-center justify-center hover:brightness-110 transition-all hover:scale-110 border border-[#20b85c]"
          >
              <FaWhatsapp className="w-8 h-8 fill-current" />
               <div className="absolute right-full mr-5 top-1/2 -translate-y-1/2 px-4 py-2 bg-black/90 backdrop-blur-md text-white text-xs font-bold rounded-xl opacity-0 group-hover:opacity-100 transition-all translate-x-2 group-hover:translate-x-0 whitespace-nowrap shadow-xl">
                  Discuss Your Requirement
              </div>
          </motion.div>
        </a>
    </div>
  );
}
