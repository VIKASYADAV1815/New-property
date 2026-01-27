 "use client";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { Share2, Facebook, Twitter, Linkedin } from "lucide-react";

export default function BlogDetailClient({ blog, related }) {
  const baseContent = useMemo(() => {
    const sections = [
      {
        id: "overview",
        title: "Overview",
        body: [
          `This article presents a practical perspective on ${blog.title}. It focuses on clarity and decision-ready insights for readers exploring opportunities in Indian prime markets.`,
          `You’ll find guidance on evaluating locations, developer credibility, and pricing logic, tailored to advisory-led selection rather than generic listings.`,
        ],
      },
      {
        id: "market-context",
        title: "Market Context",
        body: [
          `Premium neighborhoods continue to show resilient demand. Buyers prioritize infrastructure, connectivity, and livability, while investors focus on long-term stability over short-term hype.`,
          `With evolving regulations and transparency improving, the selection framework increasingly favors projects with clear documentation and accountable delivery.`,
        ],
      },
      {
        id: "buying-tips",
        title: "Buying Tips",
        body: [
          `Shortlist communities with strong infrastructure, proximity to essential services, and established developer reputation.`,
          `Use price bands as a starting point, then align with actual livability and suitability for your household’s needs.`,
          `Prefer clarity-first advisory over marketing noise; verify details and rely on logic-backed comparisons.`,
        ],
      },
      {
        id: "faq",
        title: "FAQ",
        body: [
          `What matters more: location or price? Location quality drives long-term value and livability; price should reflect real suitability.`,
          `Are branded residences worth it? They often bring consistency and service layers; ensure the brand adds real-world value.`,
        ],
      },
    ];
    return sections;
  }, [blog.title]);
  const [activeFaq, setActiveFaq] = useState(null);
  const words = useMemo(() => {
    const total = baseContent.reduce((acc, s) => acc + s.body.join(" ").split(/\s+/).length, 0);
    return total;
  }, [baseContent]);
  const readMins = Math.max(3, Math.round(words / 200));
  const toc = baseContent.filter((s) => s.id !== "faq").map((s) => ({ id: s.id, title: s.title }));

  return (
    <div className="max-w-350 mx-auto px-6 py-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8">
          <div className="flex items-center gap-4 text-xs text-gray-500 mb-6">
            <span className="font-bold uppercase tracking-wider">Editorial Team</span>
            <span>•</span>
            <span>{readMins} min read</span>
            <span>•</span>
            <button className="inline-flex items-center gap-1 px-2 py-1 rounded-full border border-gray-200 hover:bg-gray-50">
              <Share2 className="w-3.5 h-3.5" />
              Share
            </button>
          </div>
          <div className="rounded-2xl border border-gray-200 p-6 bg-white">
            <div className="mb-6">
              {/* First image full width */}
              <div className="relative h-56 md:h-64 rounded-xl overflow-hidden border border-gray-200 mb-4">
                <Image
                  src={
                    Array.isArray(blog.gallery) && blog.gallery.length >= 3
                      ? blog.gallery[0]
                      : "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?q=80&w=1600&auto=format&fit=crop"
                  }
                  alt="detail-0"
                  fill
                  className="object-cover"
                />
              </div>
              {/* Two images 50/50 */}
              <div className="grid grid-cols-2 gap-4">
                {[1, 2].map((i) => (
                  <div key={i} className="relative h-56 md:h-64 rounded-xl overflow-hidden border border-gray-200">
                    <Image
                      src={
                        Array.isArray(blog.gallery) && blog.gallery.length >= 3
                          ? blog.gallery[i]
                          : [
                              "https://images.unsplash.com/photo-1524026986132-000404263b59?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                              "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1600&auto=format&fit=crop",
                            ][i - 1]
                      }
                      alt={`detail-${i}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
            {baseContent.filter((s) => s.id !== "faq").map((sec) => (
              <div key={sec.id} id={sec.id} className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-3">{sec.title}</h2>
                {sec.body.map((p, idx) => (
                  <p key={idx} className="text-gray-700 leading-relaxed mb-3">
                    {p}
                  </p>
                ))}
              </div>
            ))}
            <div id="highlights" className="mb-8 rounded-xl border border-gray-200 bg-gray-50 p-5">
              <div className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-2">Highlights</div>
              <ul className="list-disc list-inside text-gray-700">
                <li>Location intelligence and developer credibility</li>
                <li>Pricing bands aligned to livability and value</li>
                <li>Regulatory clarity and buyer safeguards</li>
              </ul>
            </div>
            <div id="faq" className="mb-2">
              <h2 className="text-2xl font-bold text-gray-900 mb-3">FAQ</h2>
              <div className="rounded-xl border border-gray-200">
                {baseContent
                  .find((s) => s.id === "faq")
                  ?.body.map((q, idx) => (
                    <div key={idx} className="border-b last:border-b-0">
                      <button
                        className="w-full text-left px-4 py-3 flex items-center justify-between"
                        onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                      >
                        <span className="font-bold text-gray-900">{q.split("?")[0]}?</span>
                        <span className="text-sm text-gray-500">{activeFaq === idx ? "−" : "+"}</span>
                      </button>
                      {activeFaq === idx && (
                        <div className="px-4 pb-4 text-gray-700">
                          {q.includes("?")
                            ? q.substring(q.indexOf("?") + 1).trim()
                            : "Clarify priorities and choose logic-backed options."}
                        </div>
                      )}
                    </div>
                  ))}
              </div>
            </div>
            <div className="mt-6 rounded-xl border border-gray-200 p-5 bg-gray-50">
              <div className="text-sm text-gray-600">
                Tags: <span className="font-bold text-gray-900">{blog.tag}</span>
              </div>
            </div>
          </div>

          <div className="mt-10">
            <div className="text-lg font-bold text-gray-900 mb-4">Related Articles</div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {related.map((b) => (
                <Link key={b.slug} href={`/blog/${b.slug}`} className="group">
                  <div className="relative h-28 rounded-xl overflow-hidden border border-gray-200">
                    <Image src={b.image} alt={b.title} fill className="object-cover" />
                  </div>
                  <div className="mt-2 text-xs text-gray-500">{b.tag}</div>
                  <div className="font-bold text-gray-900 group-hover:text-gray-600 transition-colors">
                    {b.title}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        <aside className="lg:col-span-4">
          <div className="sticky top-24 flex flex-col gap-6">
            <div className="rounded-2xl border border-gray-200 p-6 bg-white">
              <div className="flex items-center gap-3">
                <div className="relative w-12 h-12 rounded-full overflow-hidden border border-gray-200">
                  <Image
                    src="https://plus.unsplash.com/premium_photo-1672423154405-5fd922c11af2?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="Author"
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <div className="font-bold text-gray-900">Editorial Team</div>
                  <div className="text-xs text-gray-500">Advisory-led curation</div>
                </div>
              </div>
              <div className="mt-4 flex gap-2">
                <a href="#" className="p-2 rounded-full border border-gray-200 hover:bg-gray-50">
                  <Facebook className="w-4 h-4" />
                </a>
                <a href="#" className="p-2 rounded-full border border-gray-200 hover:bg-gray-50">
                  <Twitter className="w-4 h-4" />
                </a>
                <a href="#" className="p-2 rounded-full border border-gray-200 hover:bg-gray-50">
                  <Linkedin className="w-4 h-4" />
                </a>
              </div>
            </div>
            <div className="rounded-2xl border border-gray-200 p-6 bg-white">
              <div className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-3">Contents</div>
              <div className="flex flex-col gap-2">
                {toc.map((t) => (
                  <a key={t.id} href={`#${t.id}`} className="text-sm text-gray-700 hover:text-sky-600">
                    {t.title}
                  </a>
                ))}
              </div>
            </div>
            <div className="rounded-2xl border border-gray-200 p-6 bg-white">
              <div className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-3">Get Advice</div>
              <div className="flex gap-2">
                <Link href="/contact" className="flex-1 px-4 py-2 rounded-lg bg-black text-white text-sm font-bold text-center hover:bg-gray-800">
                  Contact
                </Link>
                <Link href="/community" className="flex-1 px-4 py-2 rounded-lg border border-gray-300 text-sm font-bold text-center hover:border-black hover:text-black">
                  Explore
                </Link>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
