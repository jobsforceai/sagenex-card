"use client";

import { useState } from "react";

const reviews = [
  {
    user: "Claus Hein",
    text: "Purchasing the package was as smooth and trouble free as I could have hoped for. Very happy with this wallet.",
  },
  {
    user: "Mark Karns",
    text: "I love the tap-to-sign security idea. Overall I'm very impressed especially with the number of podcasters recommending the card!",
  },
  {
    user: "Carrie",
    text: "Happy Mother's Day. The best gift a mum could ever have is a Cold Wallet-safe and secure #BTC #Crypto",
  },
  {
    user: "Matt",
    text: "This is officially the coolest hardware wallet I own now",
  },
];

export function ReviewsSection() {
  const [tab, setTab] = useState<"social" | "video">("social");
  const [index, setIndex] = useState(0);

  return (
    <section className="bg-[var(--surface)] py-24 text-[var(--fg)]">
      <div className="mx-auto w-full max-w-[1920px] px-[max(24px,calc((100vw-1440px)/2))]">
        <p className="text-sm uppercase tracking-widest text-[var(--gray-400)]">
          Testimonials
        </p>
        <h2 className="mt-4 text-[clamp(36px,4.5vw,64px)] font-medium leading-[1.05] tracking-[-0.03em] text-black">
          Loved by users
        </h2>

        <div className="mt-6 flex gap-3">
          {(["social", "video"] as const).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTab(t)}
              className={`rounded-full px-5 py-2 text-sm font-medium capitalize transition-colors ${
                tab === t
                  ? "bg-[var(--brand)] text-white"
                  : "bg-[var(--gray-100)] text-[var(--gray-400)]"
              }`}
            >
              {t === "social" ? "Social media" : "Video reviews"}
            </button>
          ))}
        </div>

        <div className="mt-10 overflow-hidden">
          <div
            className="flex gap-4 transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${index * 340}px)` }}
          >
            {reviews.map((r) => (
              <div
                key={r.user}
                className="min-w-[320px] max-w-[380px] shrink-0 rounded-[20px] bg-[var(--gray-100)] p-6"
              >
                <p className="font-medium text-black">{r.user}</p>
                <div className="my-2 text-[var(--accent)]">★★★★★</div>
                <p className="text-sm leading-relaxed text-[var(--gray-400)]">{r.text}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 flex items-center justify-center gap-4">
          <button
            type="button"
            onClick={() => setIndex(Math.max(0, index - 1))}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--gray-200)]"
            aria-label="Previous"
          >
            ←
          </button>
          <div className="flex gap-2">
            {reviews.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setIndex(i)}
                className={`h-2 rounded-full transition-all ${
                  i === index ? "w-6 bg-[var(--brand)]" : "w-2 bg-[var(--gray-200)]"
                }`}
                aria-label={`Go to review ${i + 1}`}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={() => setIndex(Math.min(reviews.length - 1, index + 1))}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--gray-200)]"
            aria-label="Next"
          >
            →
          </button>
        </div>

        <div className="mt-8 text-center">
          <button type="button" className="text-sm font-medium text-[var(--brand)]">
            See more reviews
          </button>
        </div>
      </div>
    </section>
  );
}
