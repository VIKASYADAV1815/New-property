"use client";

import { motion } from "framer-motion";
import { Compass, CheckCircle, Search, Headset } from "lucide-react";

const features = [
  {
    icon: Compass,
    title: "Expert Curation",
    desc: "Hand-picked properties evaluated for location, developer credibility, and long-term value.",
  },
  {
    icon: CheckCircle,
    title: "Verified Developers",
    desc: "We only work with trusted developers and verify project credentials before listing.",
  },
  {
    icon: Search,
    title: "Custom Search",
    desc: "Advanced filters and personalised alerts help you find the right property faster.",
  },
  {
    icon: Headset,
    title: "Concierge Support",
    desc: "Schedule consultations, site visits, and get dedicated assistance throughout the journey.",
  },
];

export default function ProjectMotion() {
  return (
    <section className="py-12 sm:py-16 md:py-24 bg-linear-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="mb-10 text-center">
          <span className="text-xs md:text-sm font-bold tracking-[0.2em] uppercase text-gray-500">
            Why PropertySearch
          </span>
          <h2 className="mt-2 text-2xl sm:text-3xl md:text-4xl font-serif leading-tight text-gray-900">
            Features That Make Finding Property Effortless
          </h2>
          <p className="mt-3 text-sm text-gray-600 max-w-2xl mx-auto font-serif leading-relaxed">
            From curated listings to personalised support, we combine technology and expertise to
            deliver high-quality property opportunities.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, idx) => {
            const Icon = f.icon;
            return (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.45, delay: idx * 0.08 }}
                className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transform hover:-translate-y-1 transition"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-sky-50 text-sky-600">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-serif font-semibold text-gray-900">{f.title}</h3>
                    <p className="mt-1 text-sm text-gray-600 font-serif">{f.desc}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-8 text-center">
          <a
            href="/services"
            className="inline-flex items-center gap-3 bg-sky-600 text-white px-6 py-3 rounded-full font-semibold shadow hover:bg-sky-700 transition"
          >
            Explore Our Services
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
