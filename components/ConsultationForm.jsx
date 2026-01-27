"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { MessageCircle, Calendar } from "lucide-react";

export default function ConsultationForm() {
  return (
    <section className="py-16 md:py-24 bg-white border-t border-gray-100">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Form Side */}
            <div className="lg:col-span-8 bg-white rounded-3xl p-6 md:p-10 lg:p-12 shadow-sm border border-gray-100 relative overflow-hidden">
                <div className="relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mb-8"
                    >
                        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 font-sans tracking-tight mb-3">
                            Ready to Make a Well-Informed Property Decision?
                        </h2>
                        <p className="text-gray-600 font-medium">Akshit Kapoor, Founder</p>
                        
                        <div className="flex items-center gap-2 mt-4 text-[#25D366] font-bold text-sm">
                            <MessageCircle className="w-5 h-5" />
                            <span>Whatsapp Available</span>
                        </div>
                    </motion.div>

                    <form className="space-y-5 md:space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
                            <div className="space-y-1">
                                <input 
                                    type="text" 
                                    placeholder="Name*" 
                                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-black focus:ring-0 outline-none transition-all bg-gray-50/50 text-base"
                                />
                            </div>
                            <div className="flex gap-2">
                                <select className="px-3 py-3 rounded-lg border border-gray-200 bg-gray-50/50 outline-none text-base">
                                    <option>IN +91</option>
                                    <option>AE +971</option>
                                    <option>US +1</option>
                                    <option>UK +44</option>
                                </select>
                                <input 
                                    type="tel" 
                                    placeholder="Phone Number*" 
                                    className="flex-1 px-4 py-3 rounded-lg border border-gray-200 focus:border-black focus:ring-0 outline-none transition-all bg-gray-50/50 text-base"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
                            <select className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-black focus:ring-0 outline-none transition-all bg-gray-50/50 text-gray-700 text-base">
                                <option>Budget Range*</option>
                                <option>Under ₹ 1 Cr</option>
                                <option>₹ 1 Cr - ₹ 3 Cr</option>
                                <option>₹ 3 Cr - ₹ 5 Cr</option>
                                <option>₹ 5 Cr - ₹ 10 Cr</option>
                                <option>Above ₹ 10 Cr</option>
                            </select>
                            <select className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-black focus:ring-0 outline-none transition-all bg-gray-50/50 text-gray-700 text-base">
                                <option>Buying For*</option>
                                <option>Self Use</option>
                                <option>Investment</option>
                            </select>
                        </div>
                        <div>
                            <input 
                                type="email" 
                                placeholder="Email*" 
                                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-black focus:ring-0 outline-none transition-all bg-gray-50/50 text-base"
                            />
                        </div>

                        <div className="pt-4">
                            <button className="bg-black text-white px-8 py-4 rounded-full text-sm font-bold uppercase tracking-wider hover:bg-sky-500 transition-all shadow-lg hover:shadow-xl w-full md:w-auto">
                                Book a Property Consultation
                            </button>
                        </div>
                        
                        <p className="text-xs text-gray-400 mt-4">
                            By submitting this form, you agree to our <span className="underline cursor-pointer hover:text-black">privacy policy</span>.
                        </p>
                    </form>
                </div>
            </div>

            {/* Image Side */}
            <div className="lg:col-span-4 hidden lg:block relative h-150">
                 <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="h-full w-full relative"
                >
                    <Image
                        src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=800&auto=format&fit=crop"
                        alt="Expert Agent"
                        fill
                        className="object-contain object-bottom drop-shadow-2xl"
                    />
                </motion.div>
            </div>
        </div>
      </div>
    </section>
  );
}
