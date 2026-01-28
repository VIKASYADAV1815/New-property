"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { usePathname } from "next/navigation";

export default function ContactSections() {
  const sectionRef = useRef(null);
  const pathname = usePathname();

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const elements = gsap.utils.toArray(".reveal");

      gsap.set(elements, { opacity: 0, y: 24 });

      gsap.to(elements, {
        opacity: 1,
        y: 0,
        duration: 0.9,
        stagger: 0.12,
        ease: "power3.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [pathname]);

  return (
    <section
      ref={sectionRef}
      className="relative z-10 bg-white py-16 md:py-24"
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* ---------- HEADER ---------- */}
        <div className="mb-14 reveal">
          <span className="block text-sm font-semibold uppercase tracking-widest text-gray-500 mb-3">
            Contact Us
          </span>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-5">
            Let’s Find the Right Property for You
          </h1>
          <p className="max-w-2xl text-lg text-gray-600 leading-relaxed">
            Connect with our advisory team for curated opportunities,
            transparent pricing, and long-term value creation.
          </p>
        </div>

        {/* ---------- VALUE PROPOSITION ---------- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {[
            {
              title: "Curated Properties",
              desc: "Only verified residential and investment-grade listings.",
            },
            {
              title: "Advisory-First",
              desc: "No sales pressure — just clear, data-backed guidance.",
            },
            {
              title: "End-to-End Support",
              desc: "From site visits to documentation and handover.",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="reveal border border-gray-200 rounded-2xl p-6 lg:p-8 bg-white"
            >
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                {item.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* ---------- CONTACT INFO ---------- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="reveal border border-gray-200 rounded-2xl p-6 lg:p-8"
          >
            <h4 className="text-xl font-bold text-gray-900 mb-3">Office</h4>
            <p className="text-gray-600 text-sm leading-relaxed">
              Golf Course Road<br />
              Gurugram, Haryana
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="reveal border border-gray-200 rounded-2xl p-6 lg:p-8"
          >
            <h4 className="text-xl font-bold text-gray-900 mb-3">Phone</h4>
            <p className="text-gray-600 text-sm">
              +91 98765 43210<br />
              Mon – Sat, 9:00 AM – 7:00 PM
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="reveal border border-gray-200 rounded-2xl p-6 lg:p-8"
          >
            <h4 className="text-xl font-bold text-gray-900 mb-3">Email</h4>
            <p className="text-gray-600 text-sm">
              hello@propertysearch.in
            </p>
          </motion.div>
        </div>

        {/* ---------- CONTACT FORM ---------- */}
        <div className="reveal max-w-3xl mx-auto">
          <div className="border border-gray-200 rounded-2xl p-6 md:p-8 lg:p-10 shadow-sm">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
              Schedule a Private Consultation
            </h3>
            <p className="text-gray-600 mb-8 text-sm md:text-base">
              Share your requirements and our advisors will reach out with
              tailored property options.
            </p>

            <form className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="First Name"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-black"
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>

              <input
                type="email"
                placeholder="Email Address"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-black"
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <select className="w-full px-4 py-3 rounded-lg border border-gray-300 text-sm bg-white">
                  <option>Budget Range</option>
                  <option>Under ₹1 Cr</option>
                  <option>₹1 Cr – ₹3 Cr</option>
                  <option>₹3 Cr – ₹5 Cr</option>
                  <option>₹5 Cr+</option>
                </select>

                <select className="w-full px-4 py-3 rounded-lg border border-gray-300 text-sm bg-white">
                  <option>Purpose</option>
                  <option>Self Use</option>
                  <option>Investment</option>
                </select>
              </div>

              <textarea
                rows={4}
                placeholder="Tell us more about your requirement..."
                className="w-full px-4 py-3 rounded-lg border border-gray-300 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-black"
              />

              <button
                type="submit"
                className="w-full py-3 rounded-lg bg-black text-white font-semibold text-sm hover:bg-gray-800 transition"
              >
                Request Consultation
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
