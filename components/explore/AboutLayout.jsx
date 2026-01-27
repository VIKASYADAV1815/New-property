"use client";
import Image from "next/image";
import { motion } from "framer-motion";

export default function AboutLayout() {
  return (
    <section className="bg-white">
      {/* Introduction */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6 font-sans tracking-tight">
              Redefining Luxury Real Estate in Delhi NCR
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              Founded with a vision to bring transparency and elegance to the property market, we have established ourselves as the premier consultancy for high-end residential and commercial real estate.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed">
              Our team of seasoned experts combines local market depth with international standards of service, ensuring that every transaction is seamless, secure, and successful.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative h-100 rounded-2xl overflow-hidden shadow-xl"
          >
            <Image
              src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop"
              alt="Our Office"
              fill
              className="object-cover"
            />
          </motion.div>
        </div>
      </div>

      {/* Founder */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <div className="italic text-gray-700 leading-relaxed bg-gray-50 border border-gray-100 rounded-2xl p-6 md:p-8">
              <p>PropertySearch.in is a founder-led real estate advisory platform established by Akshit Kapoor, built on experience, market intelligence, and long-term vision.</p>
              <p className="mt-3">With over 20 years of hands-on involvement in real estate and construction, Akshit Kapoor has worked across apartments, builder floors, independent houses, plots, villas, and mixed-use residential projects.</p>
              <p className="mt-3">The advisory moves beyond typical brokerage, focusing on structured, trustworthy, and insight-driven guidance.</p>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="relative h-72 md:h-80 rounded-2xl overflow-hidden border border-gray-200 bg-gray-100">
              <Image
                src="https://images.unsplash.com/photo-1566753323558-f4e0952af115?q=80&w=1200&auto=format&fit=crop"
                alt="Founder Akshit Kapoor"
                fill
                className="object-cover"
              />
            </div>
            <div className="mt-4">
              <div className="text-sm font-bold text-gray-900">Akshit Kapoor</div>
              <div className="text-xs text-gray-500">Founder, PropertySearch.in</div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { label: "Years Experience", value: "15+" },
              { label: "Happy Clients", value: "2,500+" },
              { label: "Properties Sold", value: "₹500Cr+" },
              { label: "Team Members", value: "45+" },
            ].map((stat, idx) => (
              <div key={idx}>
                <div className="text-4xl font-bold text-sky-600 mb-2">{stat.value}</div>
                <div className="text-sm font-bold text-gray-500 uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Values */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h3 className="text-3xl font-bold text-gray-900 mb-4">Our Core Values</h3>
          <p className="text-gray-500">The principles that guide every interaction and decision.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: "Integrity", desc: "Honesty and transparency are the foundations of our business." },
            { title: "Excellence", desc: "We strive for perfection in every detail of our service." },
            { title: "Client First", desc: "Your goals and satisfaction are our top priority." },
          ].map((val, idx) => (
            <div key={idx} className="bg-gray-50 p-8 rounded-2xl border border-gray-100">
              <h4 className="text-xl font-bold text-gray-900 mb-3">{val.title}</h4>
              <p className="text-gray-600">{val.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
