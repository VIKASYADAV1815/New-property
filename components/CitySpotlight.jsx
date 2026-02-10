"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { MapPin, ArrowRight } from "lucide-react";

export default function CitySpotlight() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-end justify-between mb-10 md:mb-12">
          <div>
            <span className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-3 block">Our Focus Areas</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 font-sans tracking-tight">Delhi, Gurgaon & Dehradun Market Expertise</h2>
          </div>

        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Link href="/community/delhi" className="lg:col-span-2">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 relative h-105 rounded-2xl overflow-hidden group shadow-lg"
          >
            <Image
              src="https://images.unsplash.com/photo-1515263487990-61b07816b324?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="New Delhi Skyline"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-md text-gray-900 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-2">
              <MapPin className="w-3 h-3" /> New Delhi
            </div>
            <div className="absolute bottom-8 left-8 right-8 text-white">
              <h3 className="text-2xl font-bold mb-2">Lutyens, Vasant Vihar, Golf Links</h3>
              <p className="text-sm text-gray-300">Iconic bungalows, embassies, and central Delhi living with premium civic amenities.</p>
            </div>
          </motion.div>
          </Link>

          <Link href="/community/gurgaon">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative h-105 rounded-2xl overflow-hidden group shadow-lg"
          >
            <Image
              src="https://images.unsplash.com/photo-1460317442991-0ec209397118?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Gurgaon Cyber City"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-md text-gray-900 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-2">
              <MapPin className="w-3 h-3" /> Gurgaon
            </div>
            <div className="absolute bottom-8 left-8 right-8 text-white">
              <h3 className="text-2xl font-bold mb-2">Golf Course Road, Cyber City, MG Road</h3>
              <p className="text-sm text-gray-300">Premium high-rises, business districts, and vibrant lifestyle destinations.</p>
            </div>
          </motion.div>
          </Link>
          
          <Link href="/community/dehradun" className="lg:col-span-3">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-3 relative h-105 rounded-2xl overflow-hidden group shadow-lg"
          >
            <Image
              src="https://i.pinimg.com/736x/26/69/2a/26692a44a6a5dffc8e5dd41f8991c275.jpg"
              alt="Dehradun Foothills"
              fill
              className="object-cover group-hover:scale-102 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-md text-gray-900 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-2">
              <MapPin className="w-3 h-3" /> Dehradun
            </div>
            <div className="absolute bottom-8 left-8 right-8 text-white">
              <h3 className="text-2xl font-bold mb-2">Sahastradhara Road, Rajpur Road</h3>
              <p className="text-sm text-gray-300">Green residential pockets with serene mountain views and calm lifestyle.</p>
            </div>
          </motion.div>
          </Link>
        </div>
      </div>
    </section>
  );
}
