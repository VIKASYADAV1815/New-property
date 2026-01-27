"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    question: "How does PropertySearch.in evaluate properties?",
    answer: "We assess each property on location strength, developer credibility, construction quality, pricing logic, and long-term usability. Our evaluation focuses on honest assessment over aggressive selling, ensuring you make informed decisions backed by experience and market intelligence."
  },
  {
    question: "What property types do you provide advisory for?",
    answer: "We provide guidance across residential apartments & group housing, builder floors & independent homes, villas & premium residences, and plots & land investments. Each property format is evaluated based on its specific characteristics and long-term suitability."
  },
  {
    question: "How is PropertySearch.in different from typical brokers?",
    answer: "PropertySearch.in is a founder-led advisory platform built on 20+ years of hands-on real estate experience. We focus on honest evaluation, market clarity, and long-term suitability rather than volume-driven selling. Our approach treats real estate as a decision, not just a deal."
  },
  {
    question: "What should I expect from a consultation?",
    answer: "During a consultation, we understand your requirement, evaluate market options, provide shortlisted properties based on location strength and developer credibility, and offer decision support with transparent guidance. The focus is on clarity and confidence in your property decision."
  }
];

export default function FAQSection() {
  const [activeIndex, setActiveIndex] = useState(null);

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-12 md:mb-16">
            <span className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-3 block">Common Questions</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 font-sans tracking-tight mb-4">Frequently Asked Questions</h2>
        </div>

        <div className="space-y-4">
            {faqs.map((faq, idx) => (
                <motion.div 
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="border border-gray-200 rounded-2xl overflow-hidden bg-white"
                >
                    <button 
                        onClick={() => setActiveIndex(activeIndex === idx ? null : idx)}
                        className="w-full flex items-center justify-between p-6 md:p-8 text-left hover:bg-gray-50 transition-colors"
                    >
                        <span className="text-base md:text-lg font-bold text-gray-900 pr-4">{faq.question}</span>
                        <div className={`p-2 rounded-full transition-colors ${activeIndex === idx ? 'bg-black text-white' : 'bg-gray-100 text-gray-600'}`}>
                            {activeIndex === idx ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                        </div>
                    </button>
                    
                    <AnimatePresence>
                        {activeIndex === idx && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3, ease: "easeInOut" }}
                            >
                                <div className="p-6 md:p-8 pt-0 text-gray-600 leading-relaxed border-t border-gray-100/50 text-base">
                                    {faq.answer}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            ))}
        </div>
      </div>
    </section>
  );
}
