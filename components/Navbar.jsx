"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/utils/cn";
import { Search, Menu, ChevronDown, X, XCircle } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import api from "@/utils/api";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [communityOpen, setCommunityOpen] = useState(false);
  const [exploreOpen, setExploreOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLgUp, setIsLgUp] = useState(false);
  const [properties, setProperties] = useState([]);
  const [loadingData, setLoadingData] = useState(true);

  // Static cities array - customize slugs here
  const communities = [
    { name: "Gurgaon", slug: "gurgaon" },
    { name: "Delhi", slug: "Delhi" },
    { name: "Dehradun", slug: "dehradun" },
   
  ];

  const communityTimer = useRef(null);
  const exploreTimer = useRef(null);
  const searchInputRef = useRef(null);
  const router = useRouter();
  const { scrollY } = useScroll();
  const pathname = usePathname();
  
  // Fetch only properties from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoadingData(true);
        const propertiesRes = await api.get("/properties");
        setProperties(propertiesRes.data?.items || propertiesRes.data || []);
      } catch (err) {
        console.error("Failed to fetch navbar properties:", err);
      } finally {
        setLoadingData(false);
      }
    };
    fetchData();
  }, []);
  
  // Filter properties and communities based on search query
  const filteredProperties = searchQuery
    ? properties.filter(
        (p) =>
          p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.tag?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];
  
  const filteredCommunities = searchQuery
    ? communities.filter((c) =>
        c.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];
  const isActive = (href) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 50);
  });

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.touchAction = "none";
    } else {
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [searchOpen]);

  // Keep search width safe vs centered menu: narrower on md, wider on lg+
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const sync = () => setIsLgUp(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && searchOpen) {
        setSearchOpen(false);
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [searchOpen]);

  // close search when route changes
  useEffect(() => {
    const t = requestAnimationFrame(() => {
      setSearchOpen(false);
      setSearchQuery("");
    });
    return () => cancelAnimationFrame(t);
  }, [pathname]);

  return (
    <>
      {/* Gradient overlay (home only) */}
      {pathname === "/" && (
        <div
          className="fixed top-0 left-0 right-0 h-40 bg-linear-to-b from-black/80 to-transparent z-40 pointer-events-none transition-opacity duration-500"
          style={{ opacity: scrolled ? 0 : 1 }}
        />
      )}

      <motion.nav
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out px-4 lg:px-8 flex items-center justify-between border-b border-transparent",
          scrolled
            ? "bg-white/80 backdrop-blur-xl shadow-sm py-3 lg:py-4 border-gray-100/50"
            : "bg-transparent py-6 lg:py-8"
        )}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="flex items-center justify-between w-full">

          {/* LOGO — SAME POSITION, SAME LAYOUT, JUST RESPONSIVE SIZE */}
          <div
            className="
              relative z-50
              w-32 h-12
              sm:w-36 sm:h-14
              lg:w-44 lg:h-18
            "
          >
            <Link href="/" className="relative w-full h-full block">
              <Image
                src="/logo.png"
                alt="PropertySearch.in Logo"
                fill
                className="object-contain"
                priority
              />
            </Link>
          </div>

          {/* CENTER MENU — UPDATED WITH LINKS & DROPDOWNS */}
          <div
            className={cn(
              "hidden md:flex items-center justify-center gap-5 lg:gap-6 xl:gap-7 text-xs lg:text-sm font-medium transition-colors duration-300 absolute left-1/2 -translate-x-1/2 whitespace-nowrap",
              scrolled ? "text-gray-600" : "text-white/90"
            )}
          >
            {[
              { label: "Home", href: "/" },
              { label: "About", href: "/about" },
              { label: "Our Team", href: "/our-team" },
              { label: "How We Work", href: "/how-we-work" },
              { label: "Services", href: "/services" },
              { label: "Insights", href: "/blog" },
              { label: "Testimonials", href: "/testimonials" },
              { label: "Contact", href: "/contact" },
            ].map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                className={cn(
                  "relative group overflow-hidden",
                  isActive(href)
                    ? scrolled
                      ? "text-sky-600"
                      : "text-sky-400"
                    : ""
                )}
              >
                <span className="block transition-transform duration-300 group-hover:-translate-y-full">
                  {label}
                </span>
                <span
                  className={cn(
                    "absolute top-0 left-0 block transition-transform duration-300 translate-y-full group-hover:translate-y-0",
                    scrolled ? "text-sky-600" : "text-sky-400"
                  )}
                >
                  {label}
                </span>
              </Link>
            ))}

            {/* Featured Properties Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => {
                if (communityTimer.current) clearTimeout(communityTimer.current);
                setCommunityOpen(true);
              }}
              onMouseLeave={() => {
                communityTimer.current = setTimeout(() => setCommunityOpen(false), 120);
              }}
            >
              <button
                className={cn(
                  "flex items-center gap-1 transition-colors whitespace-nowrap",
                  pathname.startsWith("/community")
                    ? scrolled
                      ? "text-sky-600"
                      : "text-sky-400"
                    : ""
                )}
              >
                <span className="text-xs lg:text-sm">Properties</span>
                <ChevronDown className="w-3 h-3 lg:w-4 lg:h-4" />
              </button>
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{
                  opacity: communityOpen ? 1 : 0,
                  y: communityOpen ? 0 : 8,
                }}
                transition={{ duration: 0.2 }}
                className={cn(
                  "absolute left-1/2 -translate-x-1/2 mt-3 w-72 bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden",
                  communityOpen ? "pointer-events-auto" : "pointer-events-none"
                )}
                onMouseEnter={() => {
                  if (communityTimer.current) clearTimeout(communityTimer.current);
                  setCommunityOpen(true);
                }}
                onMouseLeave={() => {
                  communityTimer.current = setTimeout(() => setCommunityOpen(false), 120);
                }}
              >
                <div className="p-2">
                  <Link
                    href="/community"
                    className="block px-3 py-2 text-sm font-bold text-gray-900 rounded-lg hover:bg-gray-50"
                  >
                    All Communities
                  </Link>
                  <div className="max-h-60 overflow-auto">
                    {communities.map((c) => (
                      <Link
                        key={c.slug}
                        href={`/community/${c.slug}`}
                        className="flex items-center justify-between gap-3 px-3 py-2 text-sm text-gray-700 rounded-lg hover:bg-gray-50"
                      >
                        <span>{c.name}</span>
                        <span className="text-xs font-bold text-sky-600">
                          {c.projects}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>

          </div>

          {/* RIGHT ACTIONS */}
          <div className="flex items-center gap-3 z-50 relative">
            {/* Inline expanding search (no modal) */}
            <div className="hidden md:flex items-center">
              <motion.div
                initial={false}
                animate={{ width: searchOpen ? (isLgUp ? 260 : 180) : 44 }}
                transition={{ duration: 0.2 }}
                className={cn(
                  "flex items-center overflow-hidden rounded-full border backdrop-blur-sm",
                  scrolled ? "bg-white/90 border-gray-200" : "bg-white/10 border-white/20"
                )}
              >
                <button
                  onClick={() => setSearchOpen((s) => !s)}
                  className={cn(
                    "p-2.5 transition-colors duration-200",
                    scrolled ? "hover:bg-black/5" : "hover:bg-white/10"
                  )}
                  aria-label="Search"
                >
                  <Search
                    className={cn(
                      "w-5 h-5 transition-colors",
                      scrolled ? "text-gray-700" : "text-white/90"
                    )}
                  />
                </button>

                <AnimatePresence>
                  {searchOpen && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center flex-1 pr-2"
                    >
                      <input
                        ref={searchInputRef}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Tell us your property requirement"
                        className={cn(
                          "flex-1 bg-transparent outline-none text-sm px-2",
                          scrolled ? "text-gray-900 placeholder:text-gray-500" : "text-white placeholder:text-white/60"
                        )}
                      />
                      <button
                        onClick={() => {
                          setSearchOpen(false);
                          setSearchQuery("");
                        }}
                        className={cn(
                          "p-2 rounded-full transition-colors",
                          scrolled ? "hover:bg-black/5" : "hover:bg-white/10"
                        )}
                        aria-label="Close search"
                      >
                        <X className={cn("w-4 h-4", scrolled ? "text-gray-700" : "text-white/90")} />
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Results dropdown */}
              <AnimatePresence>
                {searchOpen && searchQuery && (filteredCommunities.length > 0 || filteredProperties.length > 0) && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 top-full mt-3 w-[min(420px,90vw)] rounded-2xl bg-white shadow-xl border border-gray-200 overflow-hidden"
                  >
                    <div className="max-h-96 overflow-auto p-2">
                      {filteredCommunities.length > 0 && (
                        <div className="mb-2">
                          <div className="px-3 pt-2 pb-1 text-xs font-bold uppercase tracking-wide text-gray-500">
                            Communities
                          </div>
                          {filteredCommunities.slice(0, 6).map((c) => (
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
                          {filteredProperties.slice(0, 6).map((p) => (
                            <Link
                              key={p.id}
                              href="/buy"
                              className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-gray-50"
                            >
                              <div className="relative w-10 h-10 rounded-lg overflow-hidden shrink-0">
                                <Image src={p.image} alt={p.title} fill className="object-cover" />
                              </div>
                              <div className="min-w-0 flex-1">
                                <div className="font-bold text-gray-900 truncate">{p.title}</div>
                                <div className="text-xs text-gray-500 truncate">{p.location}</div>
                              </div>
                              <div className="text-xs font-bold text-sky-600">{p.price}</div>
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Mobile: keep icon only for now */}
            <button
              className={cn(
                "md:hidden p-2.5 rounded-full transition-colors duration-300 group",
                scrolled ? "hover:bg-black/5" : "hover:bg-white/10"
              )}
              onClick={() => setSearchOpen((s) => !s)}
              aria-label="Search"
            >
              <Search
                className={cn(
                  "w-5 h-5 transition-colors",
                  scrolled ? "text-gray-700" : "text-white/90"
                )}
              />
            </button>

            {!isLgUp && (
              <AnimatePresence>
                {searchOpen && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="fixed inset-0 z-50"
                  >
                    <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />
                    <div className="relative mx-auto mt-16 max-w-[min(560px,90vw)] rounded-2xl bg-white shadow-xl border border-gray-200 overflow-hidden">
                      <div className="flex items-center gap-2 p-3">
                        <input
                          ref={searchInputRef}
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          placeholder="Tell us your property requirement"
                          className="flex-1 bg-transparent outline-none text-sm px-2 text-gray-900 placeholder:text-gray-500"
                        />
                        <button
                          onClick={() => {
                            setSearchOpen(false);
                            setSearchQuery("");
                          }}
                          className="p-2 rounded-full hover:bg-black/5"
                          aria-label="Close search"
                        >
                          <X className="w-4 h-4 text-gray-700" />
                        </button>
                      </div>
                      {(filteredCommunities.length > 0 || filteredProperties.length > 0) && (
                        <div className="max-h-72 overflow-auto p-2">
                          {filteredCommunities.length > 0 && (
                            <div className="mb-2">
                              <div className="px-3 pt-2 pb-1 text-xs font-bold uppercase tracking-wide text-gray-500">
                                Communities
                              </div>
                              {filteredCommunities.slice(0, 6).map((c) => (
                                <Link
                                  key={c.slug}
                                  href={`/community/${c.slug}`}
                                  className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-gray-50"
                                  onClick={() => setSearchOpen(false)}
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
                              {filteredProperties.slice(0, 6).map((p) => (
                                <Link
                                  key={p.id}
                                  href="/buy"
                                  className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-gray-50"
                                  onClick={() => setSearchOpen(false)}
                                >
                                  <div className="relative w-10 h-10 rounded-lg overflow-hidden shrink-0">
                                    <Image src={p.image} alt={p.title} fill className="object-cover" />
                                  </div>
                                  <div className="min-w-0 flex-1">
                                    <div className="font-bold text-gray-900 truncate">{p.title}</div>
                                    <div className="text-xs text-gray-500 truncate">{p.location}</div>
                                  </div>
                                  <div className="text-xs font-bold text-sky-600">{p.price}</div>
                                </Link>
                              ))}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            )}

            <Link
              href="/contact"
              className={cn(
                "hidden md:block px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 hover:shadow-lg active:scale-95",
                scrolled
                  ? "bg-gray-900 text-white hover:bg-sky-500 hover:shadow-sky-500/20"
                  : "bg-sky-500 text-white hover:bg-sky-600 hover:shadow-sky-500/20"
              )}
            >
              Schedule Consultation
            </Link>

            <button
              className={cn(
                "md:hidden p-2 rounded-full transition-colors",
                scrolled ? "hover:bg-black/5" : "hover:bg-white/10"
              )}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <XCircle
                  strokeWidth={1.75}
                  className={cn(
                    "w-6 h-6",
                    scrolled ? "text-gray-900" : "text-white"
                  )}
                />
              ) : (
                <Menu
                  className={cn(
                    "w-6 h-6",
                    scrolled ? "text-gray-900" : "text-white"
                  )}
                />
              )}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* MOBILE MENU — UPDATED */}
      <motion.div
        initial={{ opacity: 0, x: "100%" }}
        animate={{
          opacity: mobileMenuOpen ? 1 : 0,
          x: mobileMenuOpen ? "0%" : "100%",
        }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="fixed inset-0 z-40 bg-white md:hidden flex flex-col pt-40 px-6 h-screen max-h-screen overflow-y-auto overscroll-contain pb-24"
      >
        <button
          onClick={() => setMobileMenuOpen(false)}
          className="absolute top-6 right-6 p-3 rounded-full bg-black text-white shadow-md"
          aria-label="Close menu"
        >
          <X className="w-5 h-5" />
        </button>
        <div className="flex flex-col gap-6 text-2xl font-bold text-gray-900">
          {[
            { label: "Home", href: "/" },
            { label: "About", href: "/about" },
            { label: "Our Team", href: "/our-team" },
            { label: "How We Work", href: "/how-we-work" },
            { label: "Services", href: "/services" },
            { label: "Insights", href: "/blog" },
            { label: "Testimonials", href: "/testimonials" },
            { label: "Contact", href: "/contact" },
          ].map((item, idx) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, x: 20 }}
              animate={{
                opacity: mobileMenuOpen ? 1 : 0,
                x: mobileMenuOpen ? 0 : 20,
              }}
              transition={{ delay: 0.1 + idx * 0.1 }}
            >
              <Link
                href={item.href}
                className="block hover:text-sky-500 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            </motion.div>
          ))}

          {/* Properties submenu */}
          <div className="mt-2">
            <button
              onClick={() => setCommunityOpen((s) => !s)}
              className="flex items-center gap-2 text-gray-900"
            >
              Properties <ChevronDown className="w-5 h-5" />
            </button>
            {communityOpen && (
              <div className="mt-3 ml-4 flex flex-col gap-3 text-lg font-medium text-gray-700">
                <Link
                  href="/community"
                >
                  All Properties
                </Link>
                {communities.slice(0, 6).map((c) => (
                  <Link
                    key={c.slug}
                    href={`/community/${c.slug}`}
                  >
                    {c.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="mt-12">
          <Link href="/contact" className="w-full bg-black text-white py-4 rounded-xl font-bold uppercase tracking-wider hover:bg-sky-500 transition-all text-center block">
            Schedule Consultation
          </Link>
        </div>
      </motion.div>
    </>
  );
}
