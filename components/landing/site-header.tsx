"use client";

import { useEffect, useState } from "react";
import { ChevronDown, Globe } from "lucide-react";

const nav = ["Technology", "Security"];

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "border-b border-[var(--border)] bg-white/90 backdrop-blur-xl shadow-sm"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto w-full max-w-[1920px] px-[max(24px,calc((100vw-1440px)/2))] flex h-16 items-center justify-between">
          <a
            href="#"
            aria-label="Go to the homepage"
            className="flex items-center gap-2 text-[var(--fg)]"
          >
            <svg
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
              aria-hidden
              className="shrink-0"
            >
              <rect x="4" y="4" width="8" height="20" rx="2" fill="currentColor" />
              <rect x="16" y="8" width="8" height="16" rx="2" fill="currentColor" opacity="0.7" />
            </svg>
            <span className="text-[22px] font-medium tracking-tight">sagenex</span>
          </a>

          <nav className="hidden items-center gap-7 lg:flex">
            {nav.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-[15px] text-[var(--fg-secondary)] transition-colors hover:text-[var(--fg)]"
              >
                {item}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button
              type="button"
              className="hidden items-center gap-1.5 text-sm text-[var(--fg-secondary)] sm:flex"
            >
              <Globe className="h-4 w-4" />
              En
              <ChevronDown className="h-3 w-3" />
            </button>
            <a
              href="#technology"
              className="inline-flex cursor-pointer items-center justify-center gap-2 border-0 font-medium text-white no-underline transition-[transform,filter] duration-200 [background:radial-gradient(237.5%_50.19%_at_50%_50%,rgba(255,255,255,0)_0%,rgba(255,255,255,0.45)_100%),var(--brand)] hover:scale-[1.02] hover:brightness-105 rounded-[var(--btn-radius)] px-4 py-2 text-sm"
            >
              Get started
            </a>
          </div>
        </div>
      </header>
    </>
  );
}
