"use client";
import { motion } from "framer-motion";
import { CheckCircle, Search, FileCheck, MapPin, TrendingUp, Handshake } from "lucide-react";

const processSteps = [
  {
    icon: Search,
    title: "Understanding Your Requirement",
    description: "We begin by understanding your specific needs, budget constraints, location preferences, and whether you're buying for self-use or investment purposes."
  },
  {
    icon: FileCheck,
    title: "Market Evaluation & Shortlisting",
    description: "Based on your requirements, we evaluate the market and shortlist properties that match your criteria, focusing on location strength, developer credibility, and long-term value."
  },
  {
    icon: MapPin,
    title: "Site Visits & Project Analysis",
    description: "We conduct thorough site visits and analyze projects for construction quality, pricing logic, and future usability—not just surface appeal."
  },
  {
    icon: TrendingUp,
    title: "Decision Support & Guidance",
    description: "We provide transparent evaluation and decision support, helping you make informed choices backed by logic and market intelligence."
  }
];

const evaluationCriteria = [
  {
    title: "Location Strength",
    description: "We assess connectivity, infrastructure, future development plans, and neighborhood quality to determine long-term location value."
  },
  {
    title: "Developer Credibility",
    description: "We evaluate developer track record, project delivery history, financial stability, and reputation in the market."
  },
  {
    title: "Construction Quality",
    description: "We analyze construction standards, materials used, RERA compliance, and overall build quality through site visits and project documentation."
  },
  {
    title: "Pricing Logic",
    description: "We evaluate pricing against market rates, comparable properties, and long-term value proposition to ensure fair pricing."
  },
  {
    title: "Long-term Usability",
    description: "We assess future usability, resale potential, rental yield prospects, and overall suitability for your specific requirement."
  }
];

export default function HowWeWorkSections() {
  return (
    <section className="relative z-10 py-16 md:py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        {/* Introduction */}
        <div className="text-center mb-16 md:mb-20">
          <span className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-3 block">Our Process</span>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 font-sans tracking-tight mb-4">
            Our Advisory Process
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            At PropertySearch.in, we follow a structured approach to ensure you make well-informed property decisions backed by experience and market intelligence.
          </p>
        </div>

        {/* Process Steps */}
        <div className="mb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
            {processSteps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="border border-gray-200 rounded-2xl p-8 bg-white hover:shadow-lg transition-all"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-sky-500/10 flex items-center justify-center">
                      <Icon className="w-6 h-6 text-sky-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                      <p className="text-gray-600 leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* How We Evaluate Properties */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <span className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-3 block">Evaluation</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 font-sans tracking-tight mb-4">
              How We Evaluate Properties
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Each property undergoes a comprehensive evaluation across multiple dimensions to ensure long-term suitability and value.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {evaluationCriteria.map((criteria, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="border border-gray-200 rounded-xl p-6 bg-gray-50 hover:bg-white hover:shadow-md transition-all"
              >
                <div className="flex items-start gap-3 mb-3">
                  <CheckCircle className="w-5 h-5 text-sky-600 flex-shrink-0 mt-0.5" />
                  <h3 className="text-lg font-bold text-gray-900">{criteria.title}</h3>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed ml-8">{criteria.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-3xl p-8 md:p-12 text-center"
        >
          <Handshake className="w-12 h-12 text-sky-600 mx-auto mb-4" />
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            Ready to Begin Your Property Journey?
          </h3>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Schedule a consultation with our advisory team to discuss your property requirement and get expert guidance.
          </p>
          <a
            href="/contact"
            className="inline-block bg-black text-white px-8 py-4 rounded-full text-sm font-bold uppercase tracking-wider hover:bg-sky-500 transition-all shadow-lg hover:shadow-xl"
          >
            Schedule Consultation
          </a>
        </motion.div>
      </div>
    </section>
  );
}

