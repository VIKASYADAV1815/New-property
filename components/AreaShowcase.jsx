"use client";
import { motion } from "framer-motion";
import Image from "next/image";

const areas = [
  { title: "Vasant Vihar", sub: "New Delhi", image: "https://images.unsplash.com/photo-1580041065738-e72023775cdc?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { title: "Golf Course Road", sub: "Gurgaon", image: "https://images.unsplash.com/photo-1574362848149-11496d93a7c7?q=80&w=1084&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { title: "Chanakyapuri", sub: "New Delhi", image: "https://images.unsplash.com/photo-1523192193543-6e7296d960e4?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
];

export default function AreaShowcase() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-350 mx-auto px-6">
        <div className="flex items-end justify-between mb-10">
          <div>
            <span className="text-sm font-bold uppercase tracking-widest text-gray-500">Areas</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 font-sans tracking-tight">Premium Neighborhoods</h2>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {areas.map((a, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative h-80 rounded-2xl overflow-hidden group shadow-md"
            >
              <Image
                src={a.image}
                alt={a.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 text-white">
                <h3 className="text-xl font-bold">{a.title}</h3>
                <p className="text-sm text-gray-200">{a.sub}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
