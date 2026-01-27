"use client";

export default function FilterSidebar({ filters, setFilters, onClear }) {
  const toggleLocation = (loc) => {
    const next = new Set(filters.locations);
    next.has(loc) ? next.delete(loc) : next.add(loc);
    setFilters({ ...filters, locations: next });
  };
  const setPriceBand = (band) => setFilters({ ...filters, priceBand: band });
  const setCustomPrice = (val) => setFilters({ ...filters, customPrice: val });
  const setArea = (key, val) => setFilters({ ...filters, area: { ...filters.area, [key]: val } });

  return (
    <aside className="bg-white border border-gray-200 rounded-2xl p-4 md:p-6 sticky top-24">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-bold uppercase tracking-widest text-gray-500">Custom Filter</h3>
        <button onClick={onClear} className="text-xs font-bold text-sky-600">Clear all</button>
      </div>

      <div className="space-y-6">
        <section>
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-bold text-gray-900">Location</h4>
          </div>
          <div className="mt-3 space-y-2 text-sm text-gray-700">
            {[
              { label: "Delhi, India", key: "Delhi" },
              { label: "Gurgaon, India", key: "Gurgaon" },
              { label: "Mumbai, India", key: "Mumbai" },
            ].map((l) => (
              <label key={l.key} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={filters.locations.has(l.key)}
                  onChange={() => toggleLocation(l.key)}
                  className="accent-sky-600"
                />
                {l.label}
              </label>
            ))}
          </div>
        </section>

        <section className="pt-6 border-t border-gray-200">
          <h4 className="text-sm font-bold text-gray-900">Price Range</h4>
          <div className="mt-3 space-y-2 text-sm text-gray-700">
            {[
              { key: "under", label: "Under ₹1,00,000" },
              { key: "mid", label: "₹1,00,000 - ₹15,00,000" },
              { key: "over", label: "More Than ₹15,00,000" },
              { key: "custom", label: "Custom" },
            ].map((p) => (
              <label key={p.key} className="flex items-center gap-2">
                <input
                  type="radio"
                  name="price"
                  checked={filters.priceBand === p.key}
                  onChange={() => setPriceBand(p.key)}
                  className="accent-sky-600"
                />
                {p.label}
              </label>
            ))}
          </div>
          {filters.priceBand === "custom" && (
            <div className="mt-3">
              <input
                type="range"
                min="10000000"
                max="1000000000"
                value={filters.customPrice || 1000000000}
                onChange={(e) => setCustomPrice(Number(e.target.value))}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>₹1Cr</span><span>₹100Cr</span>
              </div>
            </div>
          )}
        </section>

        <section className="pt-6 border-t border-gray-200">
          <h4 className="text-sm font-bold text-gray-900">Land Area</h4>
          <div className="mt-3 grid grid-cols-3 gap-2">
            <input
              className="px-3 py-2 border border-gray-200 rounded-lg text-sm"
              placeholder="Min"
              value={filters.area.min || ""}
              onChange={(e) => setArea("min", e.target.value)}
            />
            <input className="px-3 py-2 border border-gray-200 rounded-lg text-sm" placeholder="sq ft" disabled />
            <input
              className="px-3 py-2 border border-gray-200 rounded-lg text-sm"
              placeholder="Max"
              value={filters.area.max || ""}
              onChange={(e) => setArea("max", e.target.value)}
            />
          </div>
        </section>

        <section className="pt-6 border-t border-gray-200">
          <h4 className="text-sm font-bold text-gray-900">Type Of Place</h4>
          <div className="mt-3 space-y-2 text-sm text-gray-700">
            {[
              "Single Family Home",
              "Condo/Townhouse",
              "Apartment",
              "Bungalow",
            ].map((t) => (
              <label key={t} className="flex items-center gap-2">
                <input type="checkbox" className="accent-sky-600" />
                {t}
              </label>
            ))}
          </div>
        </section>

        <section className="pt-6 border-t border-gray-200">
          <h4 className="text-sm font-bold text-gray-900">Amenities</h4>
          <div className="mt-3 flex flex-wrap gap-2">
            {["Garden", "Gym", "Garage"].map((a, i) => (
              <button key={i} className="px-3 py-1 rounded-full border border-gray-200 text-sm hover:border-sky-500 hover:text-sky-600">
                {a}
              </button>
            ))}
          </div>
        </section>
      </div>
    </aside>
  );
}
