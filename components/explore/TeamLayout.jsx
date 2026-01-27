"use client";
import Image from "next/image";

export default function TeamLayout({ items }) {
  // Use passed items (from blogs mock) or fallback
  const team = items || [1, 2, 3, 4, 5, 6];

  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4 font-sans tracking-tight">Meet The Advisors</h2>
          <p className="text-gray-600 text-lg">
            Our team of dedicated professionals is here to guide you through every step of your real estate journey.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {team.map((member, idx) => (
            <div key={idx} className="group">
              <div className="relative h-80 rounded-2xl overflow-hidden mb-4 bg-gray-100">
                <Image
                  src={member.image || `https://randomuser.me/api/portraits/men/${idx + 20}.jpg`}
                  alt={member.title || "Team Member"}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <div className="text-white">
                    <p className="font-bold">Contact</p>
                    <p className="text-sm opacity-80">+91 98765 43210</p>
                  </div>
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900">{member.title || "Amit Verma"}</h3>
              <p className="text-sky-600 font-medium text-sm">Senior Consultant</p>
              <p className="text-gray-500 text-sm mt-2">
                Specializing in luxury residential properties in South Delhi and Gurugram with 10+ years of experience.
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
