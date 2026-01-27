"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { Play, Quote } from "lucide-react";

export default function Testimonials() {
  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12 md:mb-16">
            <span className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-3 block">Testimonials</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 font-sans tracking-tight mb-4">Client Experiences</h2>
            <p className="text-lg md:text-xl text-gray-600">Trust, Clarity, and Informed Decisions</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Text Side */}
            <motion.div 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="order-2 lg:order-1"
            >
                <div className="mb-6">
                    <h3 className="text-xl md:text-2xl font-bold mb-2">Rohit Sharma</h3>
                    <p className="text-gray-500 text-sm uppercase tracking-wide">Gurgaon</p>
                </div>
                
                <div className="relative">
                    <Quote className="w-10 h-10 md:w-12 md:h-12 text-gray-200 absolute -top-4 -left-3 -z-10" />
                    <p className="text-gray-600 leading-relaxed text-base md:text-lg italic">
                        "PropertySearch.in provided honest evaluation and clear guidance throughout our property search. Akshit's deep understanding of developer credibility, construction quality, and long-term value helped us make an informed decision. The advisory approach, focused on transparency over aggressive selling, gave us confidence in our investment."
                    </p>
                </div>

                <div className="flex gap-2 mt-8">
                    <div className="w-3 h-3 rounded-full bg-sky-500 cursor-pointer" />
                    <div className="w-3 h-3 rounded-full bg-gray-300 cursor-pointer hover:bg-sky-200" />
                    <div className="w-3 h-3 rounded-full bg-gray-300 cursor-pointer hover:bg-sky-200" />
                </div>
            </motion.div>

            {/* Video/Image Side */}
            <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="order-1 lg:order-2 relative h-100 rounded-2xl overflow-hidden group cursor-pointer shadow-xl"
            >
                <Image
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop"
                    alt="Customer Testimonial"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
                
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 group-hover:scale-110 transition-transform duration-300">
                    <Play className="w-6 h-6 text-white fill-white ml-1" />
                </div>
            </motion.div>
        </div>
      </div>
    </section>
  );
}
