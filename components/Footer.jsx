"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-white shadow-[0_-10px_30px_rgba(0,0,0,0.08)]">
      {/* Top Section */}
      <div className="max-w-6xl mx-auto px-6 py-14 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">

          {/* Brand */}
          <div className="md:col-span-5">
            <Link href="/" className="block mb-6">
              <Image
                src="/logo.png"
                alt="PropertySearch.in Logo"
                width={560}
                height={111}
                className="h-18 md:h-22 w-auto object-contain"
                priority
              />
            </Link>

            <p className="text-gray-600 text-base md:text-lg leading-relaxed max-w-md">
              PropertySearch.in is a founder-led real estate advisory platform
              delivering over <span className="font-semibold text-gray-800">20+ years</span> of trusted
              experience across residential and investment properties.
            </p>

            <div className="flex gap-5 mt-7">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="text-gray-400 hover:text-blue-600 transition-colors"
                >
                  <Icon className="w-5.5 h-5.5" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="md:col-span-7 grid grid-cols-2 gap-10">
            <div>
              <h4 className="font-bold text-xs md:text-sm uppercase tracking-[0.25em] text-gray-900 mb-6">
                Navigation
              </h4>
              <ul className="space-y-4">
                {[
                  "About Founder",
                  "Property Advisory",
                  "Market Insights",
                  "Contact Us",
                ].map((item) => (
                  <li key={item}>
                    <Link
                      href="#"
                      className="text-base text-gray-600 hover:text-blue-600 transition-colors"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-xs md:text-sm uppercase tracking-[0.25em] text-gray-900 mb-6">
                Connect
              </h4>
              <div className="space-y-5">
                <div className="flex items-center gap-4 text-base text-gray-600">
                  <Phone className="w-4.5 h-4.5 text-gray-400 shrink-0" />
                  +91 98765 43210
                </div>
                <div className="flex items-center gap-4 text-base text-gray-600">
                  <Mail className="w-4.5 h-4.5 text-gray-400 shrink-0" />
                  hello@propertysearch.in
                </div>
                <div className="flex items-start gap-4 text-base text-gray-600">
                  <MapPin className="w-4.5 h-4.5 text-gray-400 shrink-0 mt-0.5" />
                  Sector 53, Gurugram
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Divider */}
      <div className="w-full h-px bg-gray-200" />

      {/* Bottom Strip */}
      <div className="w-full">
        <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-gray-500 text-xs md:text-sm font-semibold uppercase tracking-wider">
            © 2026 PropertySearch.in. All rights reserved.
          </p>
          <p className="text-gray-500 text-xs md:text-sm font-medium">
            Developed and developed by{" "}
            <a
              href="https://rankmantra.com/"
              target="_blank"
              className="text-gray-900 font-extrabold hover:text-blue-600 transition-colors"
            >
              RankMantra
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
