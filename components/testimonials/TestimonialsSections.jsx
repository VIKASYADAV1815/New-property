"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { Quote } from "lucide-react";

const testimonials = [
  {
    name: "Rohit Sharma",
    location: "Gurgaon",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop",
    text: "PropertySearch.in provided honest evaluation and clear guidance throughout our property search. Akshit's deep understanding of developer credibility, construction quality, and long-term value helped us make an informed decision. The advisory approach, focused on transparency over aggressive selling, gave us confidence in our investment.",
    focus: "Trust & Transparency"
  },
  {
    name: "Priya Mehta",
    location: "New Delhi",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=400&auto=format&fit=crop",
    text: "What impressed me most was the thorough evaluation process. PropertySearch.in didn't just show us properties—they evaluated each one on location strength, pricing logic, and future usability. This helped us avoid properties that looked good but weren't right for our long-term needs.",
    focus: "Thorough Evaluation"
  },
  {
    name: "Amit Kumar",
    location: "Gurgaon",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=400&auto=format&fit=crop",
    text: "As an investor, I needed clarity on which properties would deliver long-term value. PropertySearch.in's market intelligence and honest evaluation helped me make smart investment decisions. They treated real estate as a decision, not just a deal, which is exactly what I needed.",
    focus: "Investment Guidance"
  },
  {
    name: "Neha Singh",
    location: "Delhi NCR",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&auto=format&fit=crop",
    text: "The relationship-driven approach made all the difference. PropertySearch.in took time to understand our requirement, evaluated multiple options, and provided decision support with transparency. We felt guided, not pressured, which is rare in real estate advisory.",
    focus: "Relationship-Driven"
  },
  {
    name: "Rajesh Verma",
    location: "Gurgaon",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop",
    text: "Akshit's 20+ years of experience showed in every interaction. His understanding of how projects are planned, priced, and delivered helped us evaluate properties from a developer's perspective. This insight was invaluable in making our final decision.",
    focus: "Expert Experience"
  },
  {
    name: "Sneha Patel",
    location: "New Delhi",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop",
    text: "PropertySearch.in helped us navigate the complex real estate market with clarity. Their focus on long-term suitability over short-term hype ensured we made a decision we're confident about. The advisory process was structured, transparent, and truly helpful.",
    focus: "Clarity & Confidence"
  }
];

export default function TestimonialsSections() {
  return (
    <section className="relative z-10 py-16 md:py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        {/* Introduction */}
        <div className="text-center mb-16 md:mb-20">
          <span className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-3 block">Client Experiences</span>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 font-sans tracking-tight mb-4">
            What Our Clients Say
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Our clients value trust, clarity, transparency, and informed decision-making. Here's what they have to say about their experience with PropertySearch.in.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {testimonials.map((testimonial, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8 hover:shadow-lg transition-all"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">{testimonial.name}</h3>
                  <p className="text-sm text-gray-500">{testimonial.location}</p>
                </div>
              </div>
              
              <div className="relative mb-4">
                <Quote className="w-8 h-8 text-gray-200 absolute -top-2 -left-2" />
                <p className="text-gray-600 leading-relaxed italic relative z-10">
                  "{testimonial.text}"
                </p>
              </div>
              
              <div className="pt-4 border-t border-gray-100">
                <span className="text-xs font-bold text-sky-600 uppercase tracking-wider">
                  {testimonial.focus}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-3xl p-8 md:p-12 text-center"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            Ready to Experience Our Advisory Approach?
          </h3>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto text-lg">
            Join our clients who have made well-informed property decisions with our guidance.
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

