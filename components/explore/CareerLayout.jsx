"use client";

export default function CareerLayout() {
  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4 font-sans tracking-tight">Join Our Team</h2>
          <p className="text-gray-600 text-lg">
            We are always looking for passionate individuals who want to redefine the future of real estate.
          </p>
        </div>

        {/* Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {[
            { title: "Competitive Pay", desc: "Industry-leading compensation and commission structures." },
            { title: "Growth", desc: "Clear career paths and mentorship from industry veterans." },
            { title: "Culture", desc: "A collaborative, high-energy environment that celebrates success." },
          ].map((item, idx) => (
            <div key={idx} className="text-center p-6">
              <div className="w-12 h-12 bg-sky-100 rounded-full flex items-center justify-center mx-auto mb-4 text-sky-600 font-bold text-xl">
                {idx + 1}
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
              <p className="text-gray-500">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Openings */}
        <div className="max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold text-gray-900 mb-8">Open Positions</h3>
          <div className="space-y-4">
            {[
              { role: "Senior Sales Consultant", dept: "Sales", type: "Full-time", loc: "Gurugram" },
              { role: "Marketing Manager", dept: "Marketing", type: "Full-time", loc: "Noida" },
              { role: "Customer Relations Executive", dept: "Support", type: "Full-time", loc: "Delhi" },
              { role: "Real Estate Analyst", dept: "Research", type: "Hybrid", loc: "Gurugram" },
            ].map((job, idx) => (
              <div key={idx} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-6 bg-gray-50 rounded-xl border border-gray-100 hover:border-sky-200 transition-colors group">
                <div>
                  <h4 className="font-bold text-gray-900 group-hover:text-sky-600 transition-colors">{job.role}</h4>
                  <div className="flex gap-4 text-sm text-gray-500 mt-1">
                    <span>{job.dept}</span>
                    <span>•</span>
                    <span>{job.type}</span>
                    <span>•</span>
                    <span>{job.loc}</span>
                  </div>
                </div>
                <button className="mt-4 sm:mt-0 px-6 py-2 rounded-full border border-gray-300 text-sm font-bold hover:bg-black hover:text-white hover:border-black transition-all">
                  Apply Now
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
