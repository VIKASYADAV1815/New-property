"use client";
import { useState } from "react";

export default function MobileFilter({ children }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="lg:hidden">
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => setOpen(true)}
          className="px-4 py-2 rounded-full border border-gray-300 text-sm font-bold hover:bg-gray-50"
        >
          Filters
        </button>
        <div className="text-xs text-gray-500">Tap to refine results</div>
      </div>
      {open && (
        <div className="fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setOpen(false)}
          />
          <div className="absolute bottom-0 left-0 right-0 rounded-t-3xl bg-white p-5 shadow-2xl max-h-[80vh] overflow-auto">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-base font-bold">Filters</h4>
              <button
                onClick={() => setOpen(false)}
                className="text-sm font-bold text-sky-600"
              >
                Close
              </button>
            </div>
            {children}
          </div>
        </div>
      )}
    </div>
  );
}
