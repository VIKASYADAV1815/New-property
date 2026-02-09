"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { Share2, Facebook, Twitter, Linkedin } from "lucide-react";

export default function BlogDetailClient({ blog }) {
  console.log("BlogDetailClient received blog:", blog);

  const [activeFaq, setActiveFaq] = useState(null);
  const contentRef = useRef(null);
  const [toc, setToc] = useState([]);

  const faqContent = useMemo(() => {
    return [
      `What matters more: location or price? Location quality drives long-term value and livability; price should reflect real suitability.`,
      `Are branded residences worth it? They often bring consistency and service layers; ensure the brand adds real-world value.`,
    ];
  }, []);

  const stripHtml = (html) => {
    return html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
  };

  const words = useMemo(() => {
    return stripHtml(blog.content).split(/\s+/).length;
  }, [blog.content]);

  const readMins = Math.max(3, Math.round(words / 200));

  const gallery = useMemo(() => {
    return [blog.image1, blog.image2, blog.image3].filter(Boolean);
  }, [blog]);

  useEffect(() => {
    if (contentRef.current) {
      const headings = contentRef.current.querySelectorAll("h2");
      const newToc = Array.from(headings).map((h, index) => {
        const id = h.id || `section-${index}`;
        if (!h.id) h.id = id;
        return { id, title: h.textContent.trim() };
      });
      setToc([...newToc, { id: "faq", title: "FAQ" }]);
    }
  }, [blog.content]);

  return (
    <div className="max-w-350 mx-auto px-6 py-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* LEFT */}
        <div className="lg:col-span-8">
          <div className="flex items-center gap-4 text-xs text-gray-500 mb-6">
            <span className="font-bold uppercase tracking-wider">
              Editorial Team
            </span>
            <span>•</span>
            <span>{readMins} min read</span>
            <span>•</span>
            <button className="inline-flex items-center gap-1 px-2 py-1 rounded-full border border-gray-200 hover:bg-gray-50">
              <Share2 className="w-3.5 h-3.5" />
              Share
            </button>
          </div>

          <div className="rounded-2xl border border-gray-200 p-6 bg-white">
            {/* Gallery */}
            <div className="mb-6">
              {gallery.length > 0 && (
                <div className="relative h-56 md:h-64 rounded-xl overflow-hidden border border-gray-200 mb-4">
                  <Image
                    src={gallery[0]}
                    alt="detail-0"
                    fill
                    className="object-cover"
                  />
                </div>
              )}

              {gallery.length > 1 && (
                <div className="grid grid-cols-2 gap-4">
                  {gallery.slice(1, 3).map((img, i) => (
                    <div
                      key={i}
                      className="relative h-56 md:h-64 rounded-xl overflow-hidden border border-gray-200"
                    >
                      <Image
                        src={img}
                        alt={`detail-${i + 1}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Content */}
            <div ref={contentRef} className="prose prose-headings:font-bold prose-headings:text-gray-900 prose-h2:text-2xl prose-h2:mb-3 prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-3 mb-8" dangerouslySetInnerHTML={{ __html: blog.content }} />

            {/* FAQ */}
            <div id="faq" className="mb-2">
              <h2 className="text-2xl font-bold text-gray-900 mb-3">FAQ</h2>
              <div className="rounded-xl border border-gray-200">
                {faqContent.map((q, i) => (
                  <div key={i} className="border-b last:border-b-0">
                    <button
                      className="w-full text-left px-4 py-3 flex items-center justify-between"
                      onClick={() =>
                        setActiveFaq(activeFaq === i ? null : i)
                      }
                    >
                      <span className="font-bold text-gray-900">
                        {q.split("?")[0]}?
                      </span>
                      <span className="text-sm text-gray-500">
                        {activeFaq === i ? "−" : "+"}
                      </span>
                    </button>
                    {activeFaq === i && (
                      <div className="px-4 pb-4 text-gray-700">
                        {q.substring(q.indexOf("?") + 1).trim()}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT (UNCHANGED) */}
        <aside className="lg:col-span-4">
          <div className="sticky top-24 flex flex-col gap-6">
            <div className="rounded-2xl border border-gray-200 p-6 bg-white">
              <div className="flex items-center gap-3">
                <div className="relative w-12 h-12 rounded-full overflow-hidden border border-gray-200">
                  <Image
                    src="https://plus.unsplash.com/premium_photo-1672423154405-5fd922c11af2?q=80&w=1170&auto=format&fit=crop"
                    alt="Author"
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <div className="font-bold text-gray-900">
                    {blog.author || "Editorial Team"}
                  </div>
                  <div className="text-xs text-gray-500">
                    Advisory-led curation
                  </div>
                </div>
              </div>

              <div className="mt-4 flex gap-2">
                <Facebook className="w-4 h-4" />
                <Twitter className="w-4 h-4" />
                <Linkedin className="w-4 h-4" />
              </div>
            </div>

            <div className="rounded-2xl border border-gray-200 p-6 bg-white">
              <div className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-3">
                Contents
              </div>
              <div className="flex flex-col gap-2">
                {toc.map((t) => (
                  <a
                    key={t.id}
                    href={`#${t.id}`}
                    className="text-sm text-gray-700 hover:text-sky-600"
                  >
                    {t.title}
                  </a>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-gray-200 p-6 bg-white">
              <div className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-3">
                Get Advice
              </div>
              <div className="flex gap-2">
                <Link
                  href="/contact"
                  className="flex-1 px-4 py-2 rounded-lg bg-black text-white text-sm font-bold text-center"
                >
                  Contact
                </Link>
                <Link
                  href="/community"
                  className="flex-1 px-4 py-2 rounded-lg border border-gray-300 text-sm font-bold text-center"
                >
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