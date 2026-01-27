"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Home, Building2, TreePine, MapPin } from "lucide-react";

const services = [
  {
    icon: Building2,
    title: "Residential Apartments & Group Housing",
    description: "We provide advisory for apartments and group housing projects, evaluating location strength, developer credibility, construction quality, pricing logic, and long-term value. Each project is assessed not just as a listing, but as a real asset with long-term implications.",
    image: "https://images.unsplash.com/photo-1580041065738-e72023775cdc?q=80&w=1200&auto=format&fit=crop"
  },
  {
    icon: Home,
    title: "Builder Floors & Independent Homes",
    description: "Our advisory covers builder floors (1 BHK to 3 BHK and beyond) and independent residences. We evaluate construction quality, pricing logic, and usability to ensure you make the right decision for your specific requirement.",
    image: "https://images.unsplash.com/photo-1574362848149-11496d93a7c7?q=80&w=1200&auto=format&fit=crop"
  },
  {
    icon: TreePine,
    title: "Villas & Premium Residences",
    description: "We provide guidance for villas and premium residences, focusing on location strength, developer credibility, and long-term value. Each property is assessed for its suitability as both a personal residence and an investment asset.",
    image: "https://images.unsplash.com/photo-1523192193543-6e7296d960e4?q=80&w=1200&auto=format&fit=crop"
  },
  {
    icon: MapPin,
    title: "Plots & Land Investments",
    description: "Our advisory extends to residential plots and land investments. We evaluate future development potential, location advantages, and long-term investment value to help you make informed decisions.",
    image: "https://images.unsplash.com/photo-1580041065738-e72023775cdc?q=80&w=1200&auto=format&fit=crop"
  }
];

export default function ServicesSections() {
  return (
    <section className="relative z-10 py-16 md:py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        {/* Introduction */}
        <div className="text-center mb-16 md:mb-20">
          <span className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-3 block">Our Services</span>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 font-sans tracking-tight mb-4">
            Property Advisory Services
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            PropertySearch.in is not restricted to one property format. We provide comprehensive advisory across multiple property types, each assessed for location strength, developer credibility, construction quality, pricing logic, and future usability.
          </p>
        </div>

        {/* Services Grid */}
        <div className="space-y-12 md:space-y-16">
          {services.map((service, idx) => {
            const Icon = service.icon;
            const isEven = idx % 2 === 0;
            
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15 }}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center ${
                  !isEven ? "lg:grid-flow-dense" : ""
                }`}
              >
                {/* Image */}
                <div className={`relative h-64 md:h-80 lg:h-96 rounded-2xl overflow-hidden ${!isEven ? "lg:order-2" : ""}`}>
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                </div>

                {/* Content */}
                <div className={`${!isEven ? "lg:order-1" : ""}`}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full bg-sky-500/10 flex items-center justify-center">
                      <Icon className="w-6 h-6 text-sky-600" />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900">{service.title}</h2>
                  </div>
                  <p className="text-gray-600 leading-relaxed mb-6 text-lg">
                    {service.description}
                  </p>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 text-sky-600 font-semibold hover:text-sky-700 transition-colors group"
                  >
                    Discuss Your Requirement
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Investment Advisory */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-3xl p-8 md:p-12"
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Investment-Focused Purchases
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed text-lg">
              Whether you're buying for self-use or investment purposes, our advisory focuses on right-fit properties backed by logic and transparency. We evaluate each property's potential as both a personal residence and an investment asset.
            </p>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <Link
            href="/contact"
            className="inline-block bg-black text-white px-8 py-4 rounded-full text-sm font-bold uppercase tracking-wider hover:bg-sky-500 transition-all shadow-lg hover:shadow-xl"
          >
            Schedule a Consultation
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

