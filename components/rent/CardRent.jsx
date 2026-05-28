"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import gsap from "gsap";
import { useEffect, useRef } from "react";

const rentalCards = [
  { title: "1 BHK Compact Home", location: "Dehradun", price: "₹ 18,000/mo", bhk: "1 BHK" },
  { title: "2 BHK Family Rental", location: "Gurgaon", price: "₹ 42,000/mo", bhk: "2 BHK" },
  { title: "3 BHK Furnished Apartment", location: "Delhi", price: "₹ 85,000/mo", bhk: "3 BHK" },
];

export default function CardRent() {
  const ref = useRef(null);
  useEffect(() => {
    if (!ref.current) return;
    gsap.from(ref.current.querySelectorAll(".reveal"), {
      opacity: 0,
      y: 20,
      duration: 0.8,
      stagger: 0.1,
    });
  }, []);
  return (
    <section ref={ref} className="py-24 bg-white">
      <div className="max-w-350 mx-auto px-6">
        <div className="mb-10 reveal">
          <span className="text-sm font-bold uppercase tracking-widest text-gray-500">Rent</span>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 font-sans tracking-tight">Rent Apartments</h1>
          <p className="text-gray-500 mt-2">Find 1 BHK, 2 BHK, 3 BHK and fully furnished apartment rentals in top communities.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {rentalCards.map((item) => (
            <motion.div key={item.title} initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} className="border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all reveal">
              <div className="relative h-40">
                <Image src="https://images.unsplash.com/photo-1523217582562-09d0def993a6?q=80&w=1200&auto=format&fit=crop" alt="Rental" fill className="object-cover" />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-sky-50 text-sky-700 border border-sky-100">{item.bhk}</span>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-gray-50 text-gray-700 border border-gray-200">Rental</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900">{item.title}</h3>
                <p className="text-gray-500 text-sm mt-1">{item.location} • {item.price}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

