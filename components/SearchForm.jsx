"use client";
import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Search, MapPin, Home } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { communities } from "@/data/communities";
import { properties } from "@/data/properties";

export default function SearchForm() {
  const [activeTab, setActiveTab] = useState("buy");
  const [location, setLocation] = useState("");
  const [ptype, setPtype] = useState("");
  const router = useRouter();
  const [openSuggest, setOpenSuggest] = useState(false);

  const filteredCommunities = useMemo(() => {
    if (!location.trim()) return [];
    const q = location.toLowerCase();
    return communities.filter((c) => c.name.toLowerCase().includes(q)).slice(0, 6);
  }, [location]);

  const filteredProperties = useMemo(() => {
    if (!location.trim()) return [];
    const q = location.toLowerCase();
    return properties
      .filter(
        (p) =>
          p.location.toLowerCase().includes(q) ||
          p.title.toLowerCase().includes(q) ||
          (p.tag || "").toLowerCase().includes(q)
      )
      .slice(0, 6);
  }, [location]);

  return (
    <div className="max-w-4xl  mx-auto w-full px-4 sm:px-0 space-y-3 relative">

      {/* Purpose Toggle */}
      <div className="flex justify-center">
        <div className="bg-white/10 backdrop-blur-2xl border border-white/20 
                        px-1 py-0.5 rounded-[2.5rem] 
                        shadow-[0_0_20px_rgba(255,255,255,0.5)]
                        transition-all hover:bg-white/15 w-fit">
          <div className="flex bg-black/20 p-1.5 rounded-full">
            <button
              onClick={() => setActiveTab("buy")}
              className={`px-4 sm:px-6 py-2 sm:py-3 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 ${
                activeTab === "buy"
                  ? "bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.7)]"
                  : "text-white/80 hover:bg-white/10 hover:text-white"
              }`}
            >
              Self Use
            </button>
            <button
              onClick={() => setActiveTab("rent")}
              className={`px-4 sm:px-6 py-2 sm:py-3 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 ${
                activeTab === "rent"
                  ? "bg-white text-black shadow-lg"
                  : "text-white/80 hover:bg-white/10 hover:text-white"
              }`}
            >
              Investment
            </button>
          </div>
        </div>
      </div>

      {/* BOX 2: INPUTS + SEARCH (DESKTOP UNCHANGED) */}
      <div className="bg-white/10 backdrop-blur-2xl  border border-white/20 
                      p-3 sm:p-2 rounded-2xl sm:rounded-[2.5rem]
                      transition-all hover:bg-white/15">

        <div className="flex flex-col  md:flex-row items-stretch md:items-center gap-3 md:gap-2">

          <div className="flex-1 w-full flex flex-col md:flex-row items-center gap-3 md:gap-0">

            {/* LOCATION */}
            <div className="relative group w-full">
              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/60 group-focus-within:text-white transition-colors" />
              <input
                type="text"
                placeholder="Tell us your property requirement"
                value={location}
                onChange={(e) => {
                  setLocation(e.target.value);
                  setOpenSuggest(true);
                }}
                onFocus={() => setOpenSuggest(true)}
                onBlur={() => {
                  // slight delay so clicks register
                  setTimeout(() => setOpenSuggest(false), 120);
                }}
                className="w-full bg-transparent border-none text-white placeholder-white/60
                           focus:ring-0 focus:outline-none
                           pl-10 py-3 text-sm
                           rounded-xl md:rounded-full
                           hover:bg-white/5 transition-colors"
              />

              {openSuggest && (filteredCommunities.length > 0 || filteredProperties.length > 0) && (
                <div className="absolute left-0 right-0 top-full mt-2 rounded-2xl bg-white shadow-xl border border-white/20 overflow-hidden backdrop-blur-md z-9999">
                  <div className="max-h-72 overflow-auto p-2">
                    {filteredCommunities.length > 0 && (
                      <div className="mb-2">
                        <div className="px-3 pt-2 pb-1 text-xs font-bold uppercase tracking-wide text-gray-500">
                          Communities
                        </div>
                        {filteredCommunities.map((c) => (
                          <Link
                            key={c.slug}
                            href={`/community/${c.slug}`}
                            className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-gray-50"
                          >
                            <div className="relative w-10 h-10 rounded-lg overflow-hidden shrink-0">
                              <Image src={c.image} alt={c.name} fill className="object-cover" />
                            </div>
                            <div className="min-w-0">
                              <div className="font-bold text-gray-900 truncate">{c.name}</div>
                              <div className="text-xs text-gray-500">{c.projects} projects</div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    )}
                    {filteredProperties.length > 0 && (
                      <div>
                        <div className="px-3 pt-2 pb-1 text-xs font-bold uppercase tracking-wide text-gray-500">
                          Properties
                        </div>
                        {filteredProperties.map((p) => (
                          <button
                            key={p.id}
                            onMouseDown={() => {
                              const base = activeTab === "rent" ? "/rent" : "/buy";
                              const params = new URLSearchParams();
                              params.set("loc", p.location);
                              router.push(`${base}?${params.toString()}`);
                            }}
                            className="w-full text-left flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-gray-50"
                          >
                            <div className="relative w-10 h-10 rounded-lg overflow-hidden shrink-0">
                              <Image src={p.image} alt={p.title} fill className="object-cover" />
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="font-bold text-gray-900 truncate">{p.title}</div>
                              <div className="text-xs text-gray-500 truncate">{p.location}</div>
                            </div>
                            <div className="text-xs font-bold text-sky-600">{p.price}</div>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* DIVIDER – DESKTOP ONLY */}
            <div className="hidden md:block w-px h-6 bg-white/10 mx-2" />

            {/* PROPERTY TYPE */}
            <div className="relative group w-full">
              <Home className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/60 group-focus-within:text-white transition-colors" />
              <input
                type="text"
                placeholder="Property Type (Optional)"
                value={ptype}
                onChange={(e) => setPtype(e.target.value)}
                className="w-full bg-transparent border-none text-white placeholder-white/60
                           focus:ring-0 focus:outline-none
                           pl-10 py-3 text-sm
                           rounded-xl md:rounded-full
                           hover:bg-white/5 transition-colors"
              />
            </div>
          </div>

          {/* SEARCH BUTTON */}
          <button
            className="flex items-center justify-center
                       h-12 w-full md:w-12
                       rounded-xl md:rounded-full
                       bg-white shadow-lg hover:bg-gray-100
                       transition-all hover:shadow-xl hover:scale-105 active:scale-95 group"
            aria-label="Search"
            onClick={() => {
              const base = activeTab === "rent" ? "/rent" : "/buy";
              const params = new URLSearchParams();
              if (location.trim()) params.set("loc", location.trim());
              if (ptype.trim()) params.set("type", ptype.trim());
              router.push(`${base}?${params.toString()}`);
            }}
          >
            <Search className="w-5 h-5 text-black group-hover:rotate-90 transition-transform duration-300" />
            <span className="md:hidden ml-2 text-black text-sm font-medium">
              Search
            </span>
          </button>

        </div>
      </div>

    </div>
  );
}
