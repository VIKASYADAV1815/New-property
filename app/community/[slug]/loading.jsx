export default function Loading() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-350 mx-auto px-6">
        <div className="h-10 w-64 bg-gray-200 rounded mb-6 animate-pulse" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="border border-gray-200 rounded-2xl p-4">
              <div className="h-44 bg-gray-200 rounded-xl mb-3 animate-pulse" />
              <div className="h-4 bg-gray-200 rounded mb-2 animate-pulse" />
              <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
