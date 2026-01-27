"use client";
export default function PageIntroBar({ count, caption }) {
  return (
    <div className="bg-white border-t border-gray-200">
      <div className="max-w-350 mx-auto px-6 py-4 flex items-center justify-between">
        <div className="text-sm text-gray-600">{caption}</div>
        <div className="text-sm font-bold text-gray-900">{count} results</div>
      </div>
    </div>
  );
}

