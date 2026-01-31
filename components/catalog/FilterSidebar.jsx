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
              { label: "Dehradun, India", key: "Dehradun" },
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
          <div className="mt-3 grid grid-cols-2 gap-3 text-sm text-gray-700">
            <div>
              <div className="text-xs text-gray-500 mb-1">Min</div>
              <select
                value={String(filters.priceRange?.min || 5000000)}
                onChange={(e) => setFilters({ ...filters, priceRange: { ...(filters.priceRange || {}), min: Number(e.target.value) } })}
                className="w-full px-3 py-2 rounded-lg border border-gray-200 bg-white"
              >
                <option value={5000000}>₹ 50 Lakhs</option>
                <option value={7500000}>₹ 75 Lakhs</option>
                <option value={10000000}>₹ 1 Cr</option>
                <option value={20000000}>₹ 2 Cr</option>
                <option value={50000000}>₹ 5 Cr</option>
              </select>
            </div>
            <div>
              <div className="text-xs text-gray-500 mb-1">Max</div>
              <select
                value={String(filters.priceRange?.max || 200000000)}
                onChange={(e) => setFilters({ ...filters, priceRange: { ...(filters.priceRange || {}), max: Number(e.target.value) } })}
                className="w-full px-3 py-2 rounded-lg border border-gray-200 bg-white"
              >
                <option value={20000000}>₹ 2 Cr</option>
                <option value={50000000}>₹ 5 Cr</option>
                <option value={100000000}>₹ 10 Cr</option>
                <option value={150000000}>₹ 15 Cr</option>
                <option value={200000000}>₹ 20 Cr</option>
              </select>
            </div>
          </div>
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
