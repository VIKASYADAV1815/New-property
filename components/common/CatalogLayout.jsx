"use client";
import { useState, useMemo, useRef, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import FilterSidebar from "@/components/catalog/FilterSidebar";
import MobileFilter from "@/components/catalog/MobileFilter";
import PropertyCard from "@/components/catalog/PropertyCard";
import DetailPanel from "@/components/catalog/DetailPanel";

export default function CatalogLayout({ items }) {
  const [selected, setSelected] = useState(items?.[0] || null);
  const topRef = useRef(null);
  const searchParams = useSearchParams();
  const [filters, setFilters] = useState(() => {
    const locParam = searchParams?.get("loc");
    const initialLocations = locParam ? new Set([locParam]) : new Set(["Delhi"]);
    return {
      locations: initialLocations,
      priceBand: "custom",
      customPrice: 1000000000,
      area: { min: "", max: "" },
    };
  });

  const list = useMemo(() => items || [], [items]);

  const onSelectItem = (it) => {
    setSelected(it);
    if (topRef.current) {
      if (typeof window !== "undefined" && window.innerWidth < 1024) {
        topRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  const parseRupees = (str) => {
    const digits = String(str || "").replace(/[^\d]/g, "");
    return Number(digits || 0);
  };
  const parseSqft = (str) => Number(String(str || "").replace(/[^\d]/g, "") || 0);

  const filtered = useMemo(() => {
    return list.filter((p) => {
      // Location filter: if any location selected, must match at least one
      if (filters.locations.size > 0) {
        const locStr = String(p.location || "").toLowerCase();
        const hasAny = Array.from(filters.locations).some((k) => locStr.includes(k.toLowerCase()));
        if (!hasAny) return false;
      }
      // Price band
      if (filters.priceBand !== "custom") {
        const rupees = parseRupees(p.price);
        if (filters.priceBand === "under" && !(rupees < 100000)) return false;
        if (filters.priceBand === "mid" && !(rupees >= 100000 && rupees <= 1500000)) return false;
        if (filters.priceBand === "over" && !(rupees > 1500000)) return false;
      } else {
        const rupees = parseRupees(p.price);
        if (!(rupees >= 0 && rupees <= filters.customPrice)) return false;
      }
      // Area range (sqft)
      const sqft = parseSqft(p.sqft);
      if (filters.area.min && !(sqft >= Number(filters.area.min))) return false;
      if (filters.area.max && !(sqft <= Number(filters.area.max))) return false;
      return true;
    });
  }, [list, filters]);

  return (
    <section className="py-8 md:py-12 bg-white">
      <div className="max-w-350 mx-auto px-4 md:px-6">
        <MobileFilter>
          <FilterSidebar
            filters={filters}
            setFilters={setFilters}
            onClear={() =>
              setFilters({
                locations: new Set(),
                priceBand: "custom",
                customPrice: 1000000,
                area: { min: "", max: "" },
              })
            }
          />
        </MobileFilter>
        <div className="lg:hidden mb-4" ref={topRef}>
          {filtered.length > 0 && (
            <>
              <div className="mb-2">
                <span className="px-3 py-1 rounded-full border border-gray-200 bg-white text-xs font-bold text-gray-900">
                  Location: <span className="text-gray-600 font-medium">{(selected || filtered[0]).location || "—"}</span>
                </span>
              </div>
              <DetailPanel item={selected || filtered[0]} />
            </>
          )}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-3 hidden lg:block">
            <FilterSidebar
              filters={filters}
              setFilters={setFilters}
              onClear={() =>
                setFilters({
                  locations: new Set(),
                  priceBand: "custom",
                  customPrice: 1000000,
                  area: { min: "", max: "" },
                })
              }
            />
          </div>

          <div className="lg:col-span-6">
            {filtered.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filtered.map((item) => (
                  <PropertyCard key={item.id || item.title} item={item} onSelect={onSelectItem} />
                ))}
              </div>
            ) : (
              <div className="rounded-2xl border border-gray-200 p-8 text-center text-sm text-gray-600 bg-white">
                No results found. Adjust filters or explore highlighted listings.
              </div>
            )}
          </div>

          <div className="lg:col-span-3">
            {filtered.length > 0 ? (
              <DetailPanel item={selected || filtered[0]} />
            ) : (
              <div className="rounded-2xl border border-gray-200 p-6 bg-white text-sm text-gray-600">
                Select a listing to view details.
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
