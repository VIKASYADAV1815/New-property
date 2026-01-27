"use client";
import Link from "next/link";
import Image from "next/image";
import { Facebook, Twitter, Instagram, Linkedin, ArrowUp } from "lucide-react";

export default function Footer() {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer className="relative bg-white border-t border-gray-100 pt-20 md:pt-30 pb-0 px-6 overflow-hidden">
            <div className="absolute bottom-0 md:bottom-15 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[28rem] opacity-10 pointer-events-none z-0">
                <Image src="/bg4.png" alt="Footer Background" fill className="object-contain object-bottom" />
            </div>
            <div className="relative z-10 max-w-350 mx-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4  gap-8 md:gap-12 mb-16 md:mb-20">
                    <div className="md:col-span-1">
                        <Link href="/" className="block mb-2">
                            <Image src="/logo.png" alt="PropertySearch.in Logo" width={560} height={111} className="h-28 md:h-27 w-auto" />
                        </Link>
                        <p className="text-gray-500 text-sm md:text-base leading-relaxed font-normal">
                            PropertySearch.in is a founder-led real estate advisory platform led by Akshit Kapoor, bringing over 20 years of hands-on experience across residential projects, builder floors, plotted developments, and buyer advisory.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-bold mb-6 text-sm uppercase tracking-widest text-gray-900">Company</h4>
                        <ul className="space-y-3 md:space-y-4 text-sm md:text-base text-gray-500 font-normal">
                            <li><Link href="/about" className="hover:text-black transition-colors">About the Founder</Link></li>
                            <li><Link href="/about" className="hover:text-black transition-colors">How We Work</Link></li>
                            <li><Link href="/blog" className="hover:text-black transition-colors">Insights</Link></li>
                            <li><Link href="/contact" className="hover:text-black transition-colors">Contact</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold mb-6 text-sm uppercase tracking-widest text-gray-900">Services</h4>
                        <ul className="space-y-3 md:space-y-4 text-sm md:text-base text-gray-500 font-normal">
                            <li><Link href="/about" className="hover:text-black transition-colors">Property Advisory</Link></li>
                            <li><Link href="/community" className="hover:text-black transition-colors">Featured Properties</Link></li>
                            <li><Link href="/contact" className="hover:text-black transition-colors">Schedule Consultation</Link></li>
                            <li><Link href="/about" className="hover:text-black transition-colors">Testimonials</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold mb-6 text-sm uppercase tracking-widest text-gray-900">Connect</h4>
                        <div className="flex flex-wrap gap-4 mb-8">
                            <a href="#" className="p-3 bg-gray-50 rounded-full hover:bg-black hover:text-white transition-all duration-300"><Facebook className="w-5 h-5" /></a>
                            <a href="#" className="p-3 bg-gray-50 rounded-full hover:bg-black hover:text-white transition-all duration-300"><Twitter className="w-5 h-5" /></a>
                            <a href="#" className="p-3 bg-gray-50 rounded-full hover:bg-black hover:text-white transition-all duration-300"><Instagram className="w-5 h-5" /></a>
                            <a href="#" className="p-3 bg-gray-50 rounded-full hover:bg-black hover:text-white transition-all duration-300"><Linkedin className="w-5 h-5" /></a>
                        </div>
                        <p className="text-gray-400 text-sm md:text-base font-normal">
                            Subscribe to our newsletter for exclusive updates.
                        </p>
                    </div>
                </div>

                <div className="border-t border-gray-100 pt-8 md:pt-10 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-gray-400 text-xs md:text-sm font-normal">
                        © 2026 PropertySearch.in. All rights reserved.
                    </p>
                    <div className="flex flex-wrap gap-4 md:gap-8 text-xs md:text-sm text-gray-500 font-semibold">
                        <Link href="#" className="hover:text-black transition-colors">Privacy Policy</Link>
                        <Link href="#" className="hover:text-black transition-colors">Terms of Service</Link>
                        <Link href="#" className="hover:text-black transition-colors">Cookies</Link>
                    </div>
                    
                </div>
            </div>
        </footer>
    );
}
