"use client";
export default function Error({ error, reset }) {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-350 mx-auto px-6 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Something went wrong</h2>
        <p className="text-gray-500 mb-6">{error?.message || "Unable to load community."}</p>
        <button onClick={reset} className="px-6 py-2 rounded-full border border-gray-300 text-sm font-bold hover:bg-gray-50">
          Try again
        </button>
      </div>
    </section>
  );
}
