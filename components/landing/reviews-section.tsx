"use client";

import { useEffect, useRef, useState } from "react";
import { APPLY_LABEL, APPLY_LINK_PROPS } from "@/lib/links";

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
  {
    user: "Priya N.",
    text: "Setup took two minutes and tapping the card to sign feels way safer than typing a seed phrase into a screen. Sagenex nailed it.",
  },
  {
    user: "Diego R.",
    text: "Finally a cold wallet that fits in my actual wallet. No cables, no batteries, and my keys never touch the internet. Recommended.",
  },
];

const SWIPE_THRESHOLD = 48;

function usePerView() {
  const [perView, setPerView] = useState(1);

  useEffect(() => {
    const compute = () => {
      const w = window.innerWidth;
      if (w >= 1024) return 3;
      if (w >= 640) return 2;
      return 1;
    };
    const update = () => setPerView(compute());
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return perView;
}

export function ReviewsSection() {
  const [tab, setTab] = useState<"social" | "video">("social");
  const [page, setPage] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const perView = usePerView();

  const pageCount = Math.max(1, Math.ceil(reviews.length / perView));
  const maxPage = pageCount - 1;

  // Clamp the current page whenever the number of visible cards changes.
  useEffect(() => {
    setPage((p) => Math.min(p, maxPage));
  }, [maxPage]);

  const goTo = (next: number) => {
    setPage(Math.max(0, Math.min(maxPage, next)));
  };

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0]?.clientX ?? null;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const delta = touchStartX.current - (e.changedTouches[0]?.clientX ?? touchStartX.current);
    touchStartX.current = null;
    if (Math.abs(delta) < SWIPE_THRESHOLD) return;
    goTo(delta > 0 ? page + 1 : page - 1);
  };

  const showControls = pageCount > 1;

  return (
    <section className="bg-[var(--surface)] py-16 text-[var(--fg)] sm:py-24">
      <div className="mx-auto w-full max-w-[1920px] px-4 sm:px-[max(24px,calc((100vw-1440px)/2))]">
        <p className="text-sm uppercase tracking-widest text-[var(--gray-400)]">
          Testimonials
        </p>
        <h2 className="mt-4 text-[clamp(28px,6vw,64px)] font-medium leading-[1.05] tracking-[-0.03em] text-black">
          Loved by users
        </h2>

        <div className="mt-6 flex gap-2 sm:gap-3">
          {(["social", "video"] as const).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTab(t)}
              className={`min-h-[44px] rounded-full px-4 py-2.5 text-sm font-medium capitalize transition-colors sm:px-5 ${
                tab === t
                  ? "bg-[var(--brand)] text-white"
                  : "bg-[var(--gray-100)] text-[var(--gray-400)]"
              }`}
            >
              {t === "social" ? "Social media" : "Video reviews"}
            </button>
          ))}
        </div>

        <div
          className="mt-8 overflow-hidden sm:mt-10"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${page * 100}%)` }}
          >
            {reviews.map((r) => (
              <div
                key={r.user}
                className="shrink-0 px-0.5 sm:px-1.5"
                style={{ flexBasis: `${100 / perView}%` }}
              >
                <div className="flex h-full flex-col rounded-[20px] bg-[var(--gray-100)] p-5 sm:p-6">
                  <p className="font-medium text-black">{r.user}</p>
                  <div className="my-2 text-[var(--accent)]">★★★★★</div>
                  <p className="text-sm leading-relaxed text-[var(--gray-400)]">{r.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {showControls && (
          <div className="mt-6 flex items-center justify-center gap-2 sm:mt-8 sm:gap-4">
            <button
              type="button"
              onClick={() => goTo(page - 1)}
              disabled={page === 0}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--gray-200)] disabled:opacity-40"
              aria-label="Previous reviews"
            >
              ←
            </button>
            <div className="flex gap-1">
              {Array.from({ length: pageCount }).map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => goTo(i)}
                  className="flex h-11 w-11 items-center justify-center"
                  aria-label={`Go to review page ${i + 1}`}
                  aria-current={i === page ? "true" : undefined}
                >
                  <span
                    className={`block rounded-full transition-all ${
                      i === page ? "h-2.5 w-7 bg-[var(--brand)]" : "h-2.5 w-2.5 bg-[var(--gray-200)]"
                    }`}
                  />
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={() => goTo(page + 1)}
              disabled={page === maxPage}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--gray-200)] disabled:opacity-40"
              aria-label="Next reviews"
            >
              →
            </button>
          </div>
        )}

        <div className="mt-6 text-center sm:mt-8">
          <a
            {...APPLY_LINK_PROPS}
            className="inline-flex min-h-[44px] items-center justify-center px-4 text-sm font-medium text-[var(--brand)]"
          >
            {APPLY_LABEL}
          </a>
        </div>
      </div>
    </section>
  );
}
