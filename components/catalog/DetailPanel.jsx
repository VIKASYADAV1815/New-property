"use client";
import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function DetailPanel({ item }) {
  const [tab, setTab] = useState("Overview");
  const images = [item?.image, item?.image, item?.image].filter(Boolean);
  const [idx, setIdx] = useState(0);
  const nextImg = () => setIdx((i) => (i + 1) % images.length);
  const prevImg = () => setIdx((i) => (i - 1 + images.length) % images.length);
  if (!item) return null;

  return (
    <aside className="bg-white border border-gray-200 rounded-2xl p-4 md:p-6">
      <div className="relative h-44 md:h-56 rounded-xl overflow-hidden border border-gray-200 bg-gray-100 mb-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={`img-${idx}-${images[idx]}`}
            initial={{ opacity: 0.3, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="absolute inset-0"
          >
            <Image src={images[idx]} alt={item.title} fill className="object-cover" />
          </motion.div>
        </AnimatePresence>
        {images.length > 1 && (
          <div className="absolute inset-x-0 bottom-3 flex items-center justify-center gap-2">
            {images.map((_, i) => (
              <div
                key={i}
                className={`h-1.5 w-6 rounded-full ${i === idx ? "bg-white" : "bg-white/50"}`}
              />
            ))}
          </div>
        )}
        <div className="absolute inset-y-0 left-0 flex items-center">
          <button
            onClick={prevImg}
            className="m-2 p-2 rounded-full bg-black/30 text-white hover:bg-black/40"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        </div>
        <div className="absolute inset-y-0 right-0 flex items-center">
          <button
            onClick={nextImg}
            className="m-2 p-2 rounded-full bg-black/30 text-white hover:bg-black/40"
            aria-label="Next image"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-xl font-bold text-gray-900">{item.title}</h3>
          {item.location && <p className="text-sm text-gray-500">{item.location}</p>}
        </div>
        <div className="text-right">
          {item.price ? (
            <>
              <p className="text-gray-500 text-sm">Price</p>
              <p className="text-2xl font-bold text-gray-900">{item.price}</p>
            </>
          ) : (
            <>
              <p className="text-gray-500 text-sm">Published</p>
              <p className="text-base font-bold text-gray-900">{item.date || "—"}</p>
            </>
          )}
        </div>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2">
        {[item.image, item.image, item.image].map((img, i) => (
          <div key={i} className="relative h-20 rounded-lg overflow-hidden">
            <Image src={img} alt={`thumb-${i}`} fill className="object-cover" />
          </div>
        ))}
      </div>

      <div className="mt-6 border-b border-gray-200 flex gap-6 text-sm font-bold">
        {["Overview", "Reviews", "About"].map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`pb-2 ${tab === t ? "text-gray-900 border-b-2 border-gray-900" : "text-gray-500"}`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="mt-4 text-sm text-gray-600 leading-relaxed">
        {tab === "Overview" && (
          <p>
            Welcome to {item.title}. Experience a peaceful retreat set on a quiet hillside
            with stunning views and premium amenities.
          </p>
        )}
        {tab === "Reviews" && <p>Guest ratings average 4.7/5 for comfort and location.</p>}
        {tab === "About" && (
          <p>{item.price ? "Managed by a reputed developer; RERA compliant project." : "Editorial insights and market analysis for Delhi NCR."}</p>
        )}
      </div>

      <div className="mt-6 grid grid-cols-3 gap-2 text-xs">
        {(item.badges ||
          [
            "6 Rooms",
            "4 Beds",
            "2 Baths",
            "2 Kitchen",
            "2,820 sqft",
            "1 Garage",
          ]
        ).map((t, i) => (
          <div key={i} className="px-3 py-2 rounded-full border border-gray-200 text-gray-700 text-center">
            {t}
          </div>
        ))}
      </div>

      <div className="mt-6 flex gap-3">
        {item.price ? (
          <>
            <button className="flex-1 border border-gray-200 px-4 py-3 rounded-full text-sm font-bold hover:bg-gray-50">
              Contact Agent
            </button>
            <button className="flex-1 bg-sky-500 text-white px-4 py-3 rounded-full text-sm font-bold hover:bg-sky-600">
              Order Now
            </button>
          </>
        ) : (
          <>
            <button className="flex-1 border border-gray-200 px-4 py-3 rounded-full text-sm font-bold hover:bg-gray-50">
              Read Article
            </button>
            <button className="flex-1 bg-sky-500 text-white px-4 py-3 rounded-full text-sm font-bold hover:bg-sky-600">
              Share
            </button>
          </>
        )}
      </div>

      <div className="mt-6 h-56 rounded-xl overflow-hidden border border-gray-200 bg-gray-100">
        <iframe
          title="Location Map"
          src={`https://www.google.com/maps?q=${encodeURIComponent(item.location || "Delhi NCR")}&output=embed`}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </aside>
  );
}
