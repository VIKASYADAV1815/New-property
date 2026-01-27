"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { useRef } from "react";

const benefits = [
  {
    title: "Honest evaluation over aggressive selling",
    description: "We prioritize transparent assessment and long-term suitability over quick sales."
  },
  {
    title: "Market clarity over exaggerated claims",
    description: "Get real market insights and honest pricing analysis, not inflated promises."
  },
  {
    title: "Long-term suitability over short-term hype",
    description: "Every recommendation considers your long-term goals, not just immediate appeal."
  },
  {
    title: "Relationship-driven real estate advisory",
    description: "Built on trust, integrity, and personalized guidance tailored to your needs."
  }
];

export default function WhyWorkWithUs() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, -40]);

  return (
    <section ref={sectionRef} className="py-16 md:py-24 bg-white overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div 
          style={{ y }}
          className="text-center mb-12 md:mb-16"
        >
          <span className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-3 block">Why Choose Us</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 font-sans tracking-tight mb-4">
            Why Work With PropertySearch.in
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            A founder-led advisory platform built on 20+ years of hands-on real estate experience, focused on your success, not sales volume.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {benefits.map((benefit, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="border border-gray-200 rounded-2xl p-6 md:p-8 bg-white hover:shadow-lg transition-all"
            >
              <div className="flex items-start gap-4">
                <div className="shrink-0">
                  <CheckCircle className="w-6 h-6 text-sky-500" />
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3">{benefit.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

