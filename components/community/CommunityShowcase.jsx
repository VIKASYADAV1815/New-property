"use client";
import Image from "next/image";
import Link from "next/link";
import { communities } from "@/data/communities";
import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Share2, Facebook, Instagram, Mail, MessageCircle, MapPin } from "lucide-react";
import { useRouter } from "next/navigation";
import api from "@/utils/api";

export default function CommunityShowcase({ community, items = [] }) {
  const router = useRouter();
  const allItems = items && items.length > 0 ? items : [];

  // Filters (functional)
  const [filtersDraft, setFiltersDraft] = useState({
    propertyType: "Any",
    bedrooms: "Any",
    price: "Any",
  });
  const [filtersApplied, setFiltersApplied] = useState({
    propertyType: "Any",
    bedrooms: "Any",
    price: "Any",
  });
  const [locationOpen, setLocationOpen] = useState(false);

  const uniqueTags = useMemo(() => {
    const s = new Set();
    for (const p of allItems) if (p.tag) s.add(p.tag);
    return ["Any", ...Array.from(s)];
  }, [allItems]);

  const parsePriceCr = (priceStr) => {
    // "₹ 45,00,00,000" -> 45 (Cr) approx (since 1 Cr = 1,00,00,000)
    if (!priceStr) return 0;
    const digits = String(priceStr).replace(/[^\d]/g, "");
    const value = Number(digits || 0);
    return value / 10000000;
  };

  const formatPriceDisplay = (property) => {
    if (!property) return "Price on request";
    if (property.priceText && String(property.priceText).trim()) return property.priceText;
    if (property.price != null && typeof property.price === "number" && Number.isFinite(property.price)) {
      return `₹ ${property.price.toLocaleString("en-IN")}`;
    }
    if (property.price && typeof property.price === "string") return property.price;
    return "Price on request";
  };

  const getBhkValues = (property) => {
    if (Array.isArray(property?.bhk)) {
      return property.bhk.map((value) => String(value).trim()).filter(Boolean);
    }

    return String(property?.bhk || "")
      .split(/[,|]/)
      .map((value) => value.trim())
      .filter(Boolean);
  };

  const getBhkNumbers = (property) => {
    const values = getBhkValues(property);
    const numbers = values
      .map((value) => value.match(/\d+/)?.[0])
      .filter(Boolean)
      .map(Number);

    if (numbers.length > 0) return numbers;

    const beds = Number(property?.beds || 0);
    return Number.isFinite(beds) && beds > 0 ? [beds] : [];
  };

  const getBhkLabel = (property) => {
    const values = getBhkValues(property);
    if (values.length > 0) return values.join(", ");

    const beds = Number(property?.beds || 0);
    return beds ? `${beds} BHK` : "BHK details on request";
  };

  const filteredItems = useMemo(() => {
    return allItems.filter((p) => {
      if (filtersApplied.propertyType !== "Any" && p.tag !== filtersApplied.propertyType) return false;
      if (filtersApplied.bedrooms !== "Any") {
        const selectedBhk = Number(filtersApplied.bedrooms);
        const bhkNumbers = getBhkNumbers(p);
        if (!bhkNumbers.includes(selectedBhk)) return false;
      }
      if (filtersApplied.price !== "Any") {
        const cr = parsePriceCr(p.price);
        if (filtersApplied.price === "<10Cr" && !(cr < 10)) return false;
        if (filtersApplied.price === "10-50Cr" && !(cr >= 10 && cr <= 50)) return false;
        if (filtersApplied.price === "50Cr+" && !(cr > 50)) return false;
      }
      return true;
    });
  }, [allItems, filtersApplied]);

  const primary = filteredItems[0] || allItems[0];
  const [activeProperty, setActiveProperty] = useState(() => primary);
  const [isSwitching, setIsSwitching] = useState(false);
  const pendingRef = useRef(null);
  const topRef = useRef(null);
  const [tourPopupOpen, setTourPopupOpen] = useState(false);

  useEffect(() => {
    const t = requestAnimationFrame(() => {
      setActiveProperty(primary);
      setIsSwitching(false);
      pendingRef.current = null;
    });
    return () => cancelAnimationFrame(t);
  }, [community?.slug, primary]);

  if (!activeProperty && allItems.length === 0) {
    return (
      <section className="bg-white py-20">
        <div className="max-w-350 mx-auto px-6 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-50 mb-6">
            <MapPin className="w-10 h-10 text-gray-300" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">No properties found in {community.name}</h2>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">We couldn't find any active listings in this area at the moment. Please check back later or explore other communities.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <button 
              onClick={() => router.push('/community')}
              className="px-8 py-3 rounded-full bg-black text-white font-bold hover:bg-gray-800 transition-all"
            >
              Explore Communities
            </button>
            <button 
              onClick={() => router.push('/explore/contact')}
              className="px-8 py-3 rounded-full border border-gray-200 font-bold hover:bg-gray-50 transition-all"
            >
              Contact Support
            </button>
          </div>
        </div>
      </section>
    );
  }

  const bhkLabel = useMemo(() => {
    return getBhkLabel(activeProperty);
  }, [activeProperty]);
  const heroImages = useMemo(() => {
    // Prefer explicit property gallery or individual property image fields.
    const gallery = activeProperty?.images;
    if (Array.isArray(gallery) && gallery.length > 0) return Array.from(new Set(gallery.filter(Boolean)));

    const explicit = [activeProperty?.image, activeProperty?.image1, activeProperty?.image2, activeProperty?.image3].filter(Boolean);
    if (explicit.length > 0) return Array.from(new Set(explicit));

    // Only fall back to community image when the property has no images at all.
    return community.image ? [community.image] : [];
  }, [activeProperty, community.image]);
  const [heroIdx, setHeroIdx] = useState(0);
  const nextHero = () => setHeroIdx((i) => (i + 1) % heroImages.length);
  const prevHero = () => setHeroIdx((i) => (i - 1 + heroImages.length) % heroImages.length);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  
  // Tour booking form state
  const [tourFormData, setTourFormData] = useState({
    name: "",
    email: "",
    phone: "",
    preferredDate: "",
    preferredTime: "9:00 AM",
    numberOfPeople: 1,
    guestType: "Individual",
    message: "",
  });
  const [tourSubmitting, setTourSubmitting] = useState(false);
  const [tourError, setTourError] = useState("");
  const [tourSuccess, setTourSuccess] = useState(false);

  useEffect(() => {
    if (lightboxOpen || heroImages.length <= 1) return;
    const t = setInterval(() => {
      setHeroIdx((i) => (i + 1) % heroImages.length);
    }, 3000);
    return () => clearInterval(t);
  }, [heroImages.length, lightboxOpen]);

  const handleTourFormChange = (e) => {
    const { name, value } = e.target;
    setTourFormData((prev) => ({ ...prev, [name]: value }));
    setTourError("");
  };

  const handleTourSubmit = async (e) => {
    e.preventDefault();
    setTourError("");
    setTourSubmitting(true);

    try {
      const propertyId = activeProperty?._id || activeProperty?.id;
      if (!propertyId) {
        setTourError("Property information missing");
        return;
      }

      const payload = {
        propertyId,
        name: tourFormData.name.trim(),
        email: tourFormData.email.trim(),
        phone: tourFormData.phone.trim(),
        preferredDate: tourFormData.preferredDate,
        preferredTime: tourFormData.preferredTime,
        numberOfPeople: Number(tourFormData.numberOfPeople),
        guestType: tourFormData.guestType,
        message: tourFormData.message.trim(),
      };

      // Validate required fields
      if (!payload.name || !payload.email || !payload.phone || !payload.preferredDate) {
        setTourError("Please fill in all required fields");
        return;
      }

      const { data } = await api.post("/tour-bookings", payload);

      if (data.success) {
        setTourSuccess(true);
        setTourFormData({
          name: "",
          email: "",
          phone: "",
          preferredDate: "",
          preferredTime: "9:00 AM",
          numberOfPeople: 1,
          guestType: "Individual",
          message: "",
        });

        // Close popup after 2 seconds
        setTimeout(() => {
          setTourPopupOpen(false);
          setTourSuccess(false);
        }, 2000);
      }
    } catch (error) {
      console.error("Tour booking error:", error);
      setTourError(error.response?.data?.message || "Failed to book tour. Please try again.");
    } finally {
      setTourSubmitting(false);
    }
  };

  const onSelect = (p) => {
    const pId = p.id || p._id;
    const activeId = activeProperty?.id || activeProperty?._id;
    if (!p || pId === activeId) return;
    // Scroll up so user sees the details panel immediately
    if (topRef.current) {
      topRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    pendingRef.current = p;
    setIsSwitching(true);
    // brief skeleton first, then swap (no refresh)
    window.setTimeout(() => {
      if (!pendingRef.current) return;
      setActiveProperty(pendingRef.current);
      pendingRef.current = null;
      setIsSwitching(false);
    }, 260);
  };

  const Dropdown = ({ label, value, onChange, options }) => {
    const [open, setOpen] = useState(false);
    return (
      <div className="relative">
        <button
          type="button"
          onClick={() => setOpen((s) => !s)}
          className="px-4 py-2 rounded-full border border-gray-200 text-sm bg-white shadow-sm hover:border-gray-300"
        >
          <span className="text-gray-500 mr-2">{label}</span>
          <span className="font-bold text-gray-900">{value}</span>
        </button>
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 6 }}
              transition={{ duration: 0.15 }}
              className="absolute z-30 mt-2 min-w-50 rounded-2xl border border-gray-200 bg-white shadow-xl overflow-hidden"
            >
              <div className="py-2">
                {options.map((opt) => (
                  <button
                    key={String(opt)}
                    onClick={() => {
                      onChange(opt);
                      setOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50"
                  >
                    {String(opt)}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  return (
    <section className="bg-white" ref={topRef}>
      <div className="max-w-350 mx-auto px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8">
            <div className="relative rounded-3xl overflow-hidden">
              <AnimatePresence mode="wait">
                {isSwitching ? (
                  <motion.div
                    key="hero-skeleton"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="w-full aspect-video bg-gray-100 animate-pulse"
                  />
                ) : (
                  <motion.div
                    key={`hero-${activeProperty?.id || community.slug}-${heroIdx}`}
                    initial={{ opacity: 0.25, scale: 1.01 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0.25 }}
                    transition={{ duration: 0.25 }}
                    className="relative w-full aspect-video"
                  >
                    <Image
                      src={heroImages[heroIdx]}
                      alt={activeProperty?.title || community.name}
                      fill
                      className="object-cover cursor-zoom-in"
                      priority
                      onClick={() => setLightboxOpen(true)}
                    />
                    <div className="absolute inset-y-0 left-0 flex items-center">
                      <button
                        onClick={prevHero}
                        className="m-2 p-2 rounded-full bg-white/80 text-gray-900 border border-gray-300 shadow-sm hover:bg-white"
                        aria-label="Previous"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                    </div>
                    <div className="absolute inset-y-0 right-0 flex items-center">
                      <button
                        onClick={nextHero}
                        className="m-2 p-2 rounded-full bg-white/80 text-gray-900 border border-gray-300 shadow-sm hover:bg-white"
                        aria-label="Next"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </div>
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2">
                      {heroImages.map((_, i) => (
                        <motion.span
                          key={i}
                          initial={false}
                          animate={{ scale: i === heroIdx ? 1.2 : 1, opacity: i === heroIdx ? 1 : 0.5 }}
                          className="w-2 h-2 rounded-full bg-white shadow"
                        />
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
          <div className="lg:col-span-4">
            <div className="rounded-3xl border border-gray-200 p-6 bg-white">
              <AnimatePresence mode="wait">
                {isSwitching ? (
                  <motion.div
                    key="panel-skeleton"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-4"
                  >
                    <div className="h-4 w-2/3 bg-gray-100 rounded animate-pulse" />
                    <div className="h-7 w-full bg-gray-100 rounded animate-pulse" />
                    <div className="grid grid-cols-3 gap-4 mt-6 text-center">
                      <div className="h-16 bg-gray-100 rounded-xl animate-pulse" />
                      <div className="h-16 bg-gray-100 rounded-xl animate-pulse" />
                      <div className="h-16 bg-gray-100 rounded-xl animate-pulse" />
                    </div>
                    <div className="h-4 w-1/4 bg-gray-100 rounded animate-pulse" />
                    <div className="h-9 w-2/3 bg-gray-100 rounded animate-pulse" />
                    <div className="flex gap-3">
                      <div className="h-12 flex-1 bg-gray-100 rounded-full animate-pulse" />
                      <div className="h-12 flex-1 bg-gray-100 rounded-full animate-pulse" />
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key={`panel-${activeProperty?.id || "none"}`}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="text-[11px] font-semibold tracking-wide text-gray-400 uppercase">Location</div>
                        <div className="text-sm text-gray-600 mt-0.5">
                          {[activeProperty?.location, activeProperty?.city].filter(Boolean).join(", ") || "Location unavailable"}
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <div className="text-[11px] font-semibold tracking-wide text-gray-400 uppercase">Price</div>
                        <div className="text-lg font-bold text-gray-900 mt-0.5">
                          {formatPriceDisplay(activeProperty)}
                        </div>
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mt-1">
                      {activeProperty?.title}
                    </h3>
                    <div className="mt-3 flex flex-wrap gap-2">
                      <span className="inline-flex items-center rounded-full bg-sky-50 px-3 py-1 text-xs font-semibold text-sky-700 border border-sky-100">
                        {bhkLabel}
                      </span>
                      <span className="inline-flex items-center rounded-full bg-gray-50 px-3 py-1 text-xs font-semibold text-gray-700 border border-gray-200">
                        {activeProperty?.city || community.name}
                      </span>
                    </div>
                    {activeProperty?.description && (
                      <div className="mt-3 text-sm text-gray-600">
                        {activeProperty?.description}
                      </div>
                    )}

                    <div className="mt-6 pt-6 border-t border-gray-100 space-y-5">
                      {/* Area Breakdown */}
                      <div>
                        <div className="text-sm text-gray-500 mb-3 flex items-center gap-2">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-ruler"><path d="M21.3 15.3a2.4 2.4 0 0 1 0 3.4l-2.6 2.6a2.4 2.4 0 0 1-3.4 0L2.7 8.7a2.4 2.4 0 0 1 0-3.4l2.6-2.6a2.4 2.4 0 0 1 3.4 0L15.3 21.3"/><path d="m14.5 12.5 2-2"/><path d="m11.5 9.5 2-2"/><path d="m8.5 6.5 2-2"/><path d="m17.5 15.5 2-2"/></svg>
                          Area Breakdown
                        </div>
                        <div className="grid grid-cols-2 gap-2.5 text-sm">
                          <div className="flex items-center justify-between p-2.5 rounded-lg bg-gray-50/70">
                            <span className="font-medium text-gray-700">Carpet Area</span>
                            <span className="font-bold text-gray-900">{activeProperty?.carpetArea || (activeProperty?.sqft ? Math.round(parseInt(String(activeProperty?.sqft).replace(/,/g, '')) * 0.7) : "1,960")} <span className="font-normal text-gray-500">sqft</span></span>
                          </div>
                          <div className="flex items-center justify-between p-2.5 rounded-lg bg-gray-50/70">
                            <span className="font-medium text-gray-700">Super Built-up</span>
                            <span className="font-bold text-gray-900">{activeProperty?.superBuiltUpArea || (activeProperty?.sqft || "2,800")} <span className="font-normal text-gray-500">sqft</span></span>
                          </div>
                        </div>
                      </div>

                      {/* Share Section */}
                      {/* <div className="pt-5 border-t border-gray-100">
                        <div className="text-sm text-gray-500 mb-3 flex items-center gap-2">
                          <Share2 className="w-4 h-4" /> Share Property
                        </div>
                        <div className="flex gap-2">
                          <button 
                            onClick={() => window.open(`https://wa.me/?text=${encodeURIComponent(`Check out this property: ${activeProperty?.title} at ${activeProperty?.location}`)}`, '_blank')}
                            className="p-3 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900 transition-all"
                            title="Share on WhatsApp"
                          >
                            <MessageCircle className="w-5 h-5" />
                          </button>
                          <button 
                            onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`, '_blank')}
                            className="p-3 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900 transition-all"
                            title="Share on Facebook"
                          >
                            <Facebook className="w-5 h-5" />
                          </button>
                          <button 
                            onClick={() => window.open(`https://www.instagram.com/`, '_blank')}
                            className="p-3 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900 transition-all"
                            title="Share on Instagram"
                          >
                            <Instagram className="w-5 h-5" />
                          </button>
                          <button 
                            onClick={() => window.open(`mailto:?subject=${encodeURIComponent(activeProperty?.title || 'Property')}&body=${encodeURIComponent(`Check out this property: ${typeof window !== 'undefined' ? window.location.href : ''}`)}`, '_blank')}
                            className="p-3 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900 transition-all"
                            title="Share via Gmail"
                          >
                            <Mail className="w-5 h-5" />
                          </button>
                        </div>
                      </div> */}
                    </div>

                    <div className="mt-6 flex gap-3">
                      <Link href="/explore/contact" className="flex-1">
                        <button className="w-full px-4 py-3 rounded-full border border-gray-300 text-sm font-bold hover:bg-gray-50 transition-colors">
                          Contact
                        </button>
                      </Link>
                      <button
                        className="flex-1 px-4 py-3 rounded-full bg-black text-white text-sm font-bold hover:bg-gray-800 transition-colors"
                        onClick={() => setTourPopupOpen(true)}
                      >
                        Request a tour
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-100 pt-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8">
              <div className="rounded-3xl border border-gray-200 p-8 bg-linear-to-br from-blue-50 via-white to-white">
                <div className="flex items-center gap-4 mb-8">
                  <div className="p-3 rounded-2xl bg-linear-to-br from-blue-500 to-blue-600 text-white shadow-md">
                    <MapPin className="w-7 h-7" />
                  </div>
                  <div>
                    <h4 className="text-2xl font-bold text-gray-900">Nearby Places & Landmarks</h4>
                    <p className="text-sm text-gray-500 mt-1">Key connectivity and essential services around the property</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {(activeProperty.landmarks || [
                    { name: "City Center", distance: "2.5 km", category: "Commercial" },
                    { name: "Global Hospital", distance: "1.2 km", category: "Healthcare" },
                    { name: "St. Mary's School", distance: "3.0 km", category: "Education" },
                    { name: "Metro Station", distance: "0.8 km", category: "Transport" },
                    { name: "International Airport", distance: "15.0 km", category: "Transport" },
                    { name: "Luxury Mall", distance: "4.5 km", category: "Shopping" }
                  ]).map((landmark, idx) => {
                    const categoryStyles = {
                      Transport: { bg: "bg-blue-100", border: "border-blue-300", badge: "bg-blue-200 text-blue-800", icon: "text-blue-700", iconBg: "bg-blue-50" },
                      Healthcare: { bg: "bg-red-100", border: "border-red-300", badge: "bg-red-200 text-red-800", icon: "text-red-700", iconBg: "bg-red-50" },
                      Shopping: { bg: "bg-purple-100", border: "border-purple-300", badge: "bg-purple-200 text-purple-800", icon: "text-purple-700", iconBg: "bg-purple-50" },
                      Education: { bg: "bg-green-100", border: "border-green-300", badge: "bg-green-200 text-green-800", icon: "text-green-700", iconBg: "bg-green-50" },
                      Commercial: { bg: "bg-orange-100", border: "border-orange-300", badge: "bg-orange-200 text-orange-800", icon: "text-orange-700", iconBg: "bg-orange-50" },
                      Culture: { bg: "bg-white", border: "border-pink-300", badge: "bg-pink-200 text-pink-800", icon: "text-pink-700", iconBg: "bg-pink-50" },
                      Hospitality: { bg: "bg-yellow-100", border: "border-yellow-300", badge: "bg-yellow-200 text-yellow-800", icon: "text-yellow-700", iconBg: "bg-yellow-50" },
                      Tourism: { bg: "bg-cyan-100", border: "border-cyan-300", badge: "bg-cyan-200 text-cyan-800", icon: "text-cyan-700", iconBg: "bg-cyan-50" },
                    };
                    const style = categoryStyles[landmark.category] || categoryStyles.Commercial;
                    return (
                      <div key={idx} className={`group border-blue-600 bg-white relative overflow-hidden rounded-2xl border  ${style.bg} p-6 hover:shadow-lg transition-all duration-300 cursor-pointer flex flex-col items-center text-center`}>
                        {/* Top accent bar */}
                      
                        
                        {/* Location Icon */}
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 ${style.iconBg} border ${style.border} group-hover:scale-110 transition-transform`}>
                          <MapPin className={`w-6 h-6 ${style.icon}`} />
                        </div>
                        
                        {/* Category Badge */}
                        <span className={`text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full ${style.badge} mb-3 inline-block`}>
                          {landmark.category}
                        </span>
                        
                        {/* Landmark Name */}
                        <h5 className="font-bold text-gray-800 text-base group-hover:text-gray-900 transition-colors leading-snug mb-2">
                          {landmark.name}
                        </h5>
                        
                        {/* Distance */}
                        <div className="text-sm font-semibold group-hover:font-bold transition-all">
                          <span className={`${style.icon} group-hover:scale-110 inline-block transition-transform`}>
                            {landmark.distance}
                          </span>
                        </div>
                        
                        {/* Hover indicator */}
                      
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-200" />
      <div className="max-w-350 mx-auto px-6 py-6">
        <div className="rounded-2xl border border-gray-200 p-3 bg-white flex flex-col lg:flex-row lg:items-center gap-3">
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:flex lg:items-center gap-3 flex-1">
            <div className="relative">
              <button
                type="button"
                onClick={() => setLocationOpen((s) => !s)}
                className="px-4 py-2 rounded-full border border-gray-200 text-sm bg-gray-50 hover:border-gray-300"
              >
                <span className="text-gray-500 mr-2">Location:</span>
                <span className="font-bold text-gray-900">{community.name}</span>
              </button>
              <AnimatePresence>
                {locationOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    transition={{ duration: 0.15 }}
                    className="absolute z-30 mt-2 min-w-55 rounded-2xl border border-gray-200 bg-white shadow-xl overflow-hidden"
                  >
                    <div className="py-2">
                      {communities.map((c) => (
                        <button
                          key={c.slug}
                          onClick={() => {
                            setLocationOpen(false);
                            router.push(`/community/${c.slug}`);
                          }}
                          className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50"
                        >
                          {c.name}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Dropdown
              label="Property"
              value={filtersDraft.propertyType}
              onChange={(val) => setFiltersDraft((s) => ({ ...s, propertyType: val }))}
              options={uniqueTags}
            />

            <Dropdown
              label="Price"
              value={filtersDraft.price}
              onChange={(val) => setFiltersDraft((s) => ({ ...s, price: val }))}
              options={["Any", "<10Cr", "10-50Cr", "50Cr+"]}
            />

            <Dropdown
              label="Bedrooms"
              value={filtersDraft.bedrooms}
              onChange={(val) => setFiltersDraft((s) => ({ ...s, bedrooms: val }))}
              options={["Any", "1", "2", "3", "4", "5", "6"]}
            />
          </div>

          <div className="flex items-center gap-2 justify-end">
            <button
              onClick={() => {
                setFiltersDraft({ propertyType: "Any", bedrooms: "Any", price: "Any" });
                setFiltersApplied({ propertyType: "Any", bedrooms: "Any", price: "Any" });
              }}
              className="px-5 py-2 rounded-full border border-gray-200 text-sm font-bold hover:bg-gray-50"
            >
              Reset
            </button>
            <button
              onClick={() => {
                setFiltersApplied(filtersDraft);
                // move user to listings after applying
                window.setTimeout(() => {
                  const el = document.getElementById("latest-in-community");
                  el?.scrollIntoView({ behavior: "smooth", block: "start" });
                }, 50);
              }}
              className="px-6 py-2 rounded-full bg-black text-white text-sm font-bold hover:bg-gray-800"
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-200" />
      <div id="latest-in-community" className="max-w-350 mx-auto px-6 py-10">
        <div className="flex items-center justify-between mb-6">
          <h4 className="text-2xl font-bold text-gray-900">Latest in {community.name}</h4>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredItems.map((p, index) => {
            const pId = p.id || p._id;
            const activeId = activeProperty?.id || activeProperty?._id;
            const isActive = pId === activeId;
            const cardBhkLabel = getBhkLabel(p);
            return (
            <div 
              key={pId || `${p.title}-${index}`}
              onClick={() => onSelect(p)}
              className={[
                "rounded-2xl border bg-white overflow-hidden cursor-pointer transition-all",
                "hover:shadow-lg hover:border-sky-500",
                isActive ? "border-sky-500 ring-1 ring-sky-500/30" : "border-gray-200",
              ].join(" ")}
            >
              <div className="relative h-40">
                <Image src={p.image} alt={p.title} fill className="object-cover" />
              </div>
              <div className="p-4">
                <h5 className="font-bold text-gray-900">{p.title}</h5>
                <div className="text-sm text-gray-500">{p.location}</div>
                <div className="mt-2 flex items-center justify-between gap-2">
                  <div className="font-bold text-sky-600">{formatPriceDisplay(p)}</div>
                  <div className="text-xs font-semibold text-gray-700 bg-gray-50 border border-gray-200 rounded-full px-2.5 py-1">
                    {cardBhkLabel}
                  </div>
                </div>
              </div>
            </div>
            );
          })}
        </div>
        {filteredItems.length === 0 && (
          <div className="mt-10 rounded-2xl border border-gray-200 bg-gray-50 p-8 text-center">
            <div className="text-lg font-bold text-gray-900">No listings match your filters</div>
            <div className="text-sm text-gray-600 mt-1">Try resetting filters to see all properties.</div>
          </div>
        )}
      </div>
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50"
          >
            <div
              className="absolute inset-0 bg-black/70"
              onClick={() => setLightboxOpen(false)}
            />
            <div className="absolute inset-0 flex items-center justify-center p-6" onClick={() => setLightboxOpen(false)}>
              <div className="relative w-[min(1100px,95vw)] h-[min(70vh,75vw)] rounded-2xl overflow-hidden shadow-2xl" onClick={(e) => e.stopPropagation()}>
                <Image
                  src={heroImages[heroIdx]}
                  alt={activeProperty?.title || community.name}
                  fill
                  className="object-contain bg-black"
                  priority
                />
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-3">
                  {heroImages.map((_, i) => (
                    <motion.button
                      key={i}
                      onClick={() => setHeroIdx(i)}
                      whileHover={{ scale: 1.15 }}
                      className={["w-2.5 h-2.5 rounded-full", i === heroIdx ? "bg-white" : "bg-white/50"].join(" ")}
                    />
                  ))}
                </div>
                <div className="absolute inset-y-0 left-0 flex items-center">
                  <button
                    onClick={prevHero}
                    className="m-3 p-3 rounded-full bg-white/80 text-gray-900 border border-gray-300 shadow-sm hover:bg-white"
                    aria-label="Previous"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                </div>
                <div className="absolute inset-y-0 right-0 flex items-center">
                  <button
                    onClick={nextHero}
                    className="m-3 p-3 rounded-full bg-white/80 text-gray-900 border border-gray-300 shadow-sm hover:bg-white"
                    aria-label="Next"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
        {tourPopupOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50"
          >
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
            <div className="relative mx-auto mt-16 max-w-[min(640px,92vw)] rounded-2xl bg-white shadow-xl border border-gray-200 overflow-hidden">
              <div className="flex items-start justify-between p-5 border-b border-gray-200">
                <div>
                  <div className="text-xs text-gray-500">{activeProperty?.location}</div>
                  <div className="text-lg font-bold text-gray-900">{activeProperty?.title}</div>
                </div>
                <button
                  onClick={() => setTourPopupOpen(false)}
                  className="p-2 rounded-full hover:bg-black/5"
                  aria-label="Close"
                >
                  <span className="sr-only">Close</span>
                  {/* using an X glyph via text since lucide icons are already in Navbar; keep dependencies minimal */}
                  <span className="block w-4 h-4 text-gray-700">✕</span>
                </button>
              </div>
              <div className="p-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
                    <div className="text-xs text-gray-500">Bedrooms</div>
                    <div className="font-bold text-gray-900 mt-1">{bhkLabel}</div>
                  </div>
                  <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
                    <div className="text-xs text-gray-500">Price</div>
                    <div className="font-bold text-sky-600 mt-1">{formatPriceDisplay(activeProperty)}</div>
                  </div>
                </div>

                {tourSuccess ? (
                  <div className="rounded-lg bg-green-50 border border-green-200 p-4 text-center">
                    <div className="text-green-800 font-semibold">✓ Tour booked successfully!</div>
                    <div className="text-sm text-green-700 mt-1">We'll send you a confirmation email shortly.</div>
                  </div>
                ) : (
                  <form onSubmit={handleTourSubmit} className="space-y-4">
                    {tourError && (
                      <div className="rounded-lg bg-red-50 border border-red-200 p-3">
                        <div className="text-sm text-red-800">{tourError}</div>
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <input
                        type="text"
                        name="name"
                        placeholder="Full name *"
                        value={tourFormData.name}
                        onChange={handleTourFormChange}
                        required
                        className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all text-sm"
                      />
                      <input
                        type="tel"
                        name="phone"
                        placeholder="Phone *"
                        value={tourFormData.phone}
                        onChange={handleTourFormChange}
                        required
                        className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all text-sm"
                      />
                    </div>

                    <input
                      type="email"
                      name="email"
                      placeholder="Email *"
                      value={tourFormData.email}
                      onChange={handleTourFormChange}
                      required
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all text-sm"
                    />

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <input
                        type="date"
                        name="preferredDate"
                        value={tourFormData.preferredDate}
                        onChange={handleTourFormChange}
                        required
                        className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all text-sm"
                      />
                      <select
                        name="preferredTime"
                        value={tourFormData.preferredTime}
                        onChange={handleTourFormChange}
                        className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all text-sm"
                      >
                        <option value="9:00 AM">9:00 AM</option>
                        <option value="10:00 AM">10:00 AM</option>
                        <option value="11:00 AM">11:00 AM</option>
                        <option value="12:00 PM">12:00 PM</option>
                        <option value="2:00 PM">2:00 PM</option>
                        <option value="3:00 PM">3:00 PM</option>
                        <option value="4:00 PM">4:00 PM</option>
                        <option value="5:00 PM">5:00 PM</option>
                      </select>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <input
                        type="number"
                        name="numberOfPeople"
                        min="1"
                        placeholder="Number of guests"
                        value={tourFormData.numberOfPeople}
                        onChange={handleTourFormChange}
                        className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all text-sm"
                      />
                      <select
                        name="guestType"
                        value={tourFormData.guestType}
                        onChange={handleTourFormChange}
                        className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all text-sm"
                      >
                        <option value="Individual">Individual</option>
                        <option value="Family">Family</option>
                        <option value="Couple">Couple</option>
                        <option value="Corporate">Corporate</option>
                      </select>
                    </div>

                    <textarea
                      name="message"
                      rows={3}
                      placeholder="Additional message (optional)"
                      value={tourFormData.message}
                      onChange={handleTourFormChange}
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all text-sm resize-none"
                    />

                    <div className="flex gap-3">
                      <button
                        type="button"
                        onClick={() => setTourPopupOpen(false)}
                        disabled={tourSubmitting}
                        className="flex-1 px-4 py-3 rounded-full border border-gray-300 text-sm font-bold hover:bg-gray-50 transition-colors disabled:opacity-50"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={tourSubmitting}
                        className="flex-1 px-4 py-3 rounded-full bg-black text-white text-sm font-bold hover:bg-gray-800 transition-colors disabled:opacity-50"
                      >
                        {tourSubmitting ? "Booking..." : "Request Tour"}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
