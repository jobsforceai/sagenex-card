"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ChevronDown, Globe, Menu, X } from "lucide-react";
import { APPLY_LABEL, APPLY_LINK_PROPS } from "@/lib/links";

const nav = ["Technology", "Security"];

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled || menuOpen
            ? "border-b border-[var(--border)] bg-white/90 backdrop-blur-xl shadow-sm"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-16 w-full max-w-[1920px] items-center justify-between px-[max(24px,calc((100vw-1440px)/2))]">
          <a
            href="#"
            aria-label="Go to the homepage"
            className="flex items-center gap-2 text-[var(--fg)]"
            onClick={() => setMenuOpen(false)}
          >
            <Image
              src="/logo5.png"
              alt="Sagenex"
              width={32}
              height={32}
              priority
              className="h-8 w-8 shrink-0 object-cover"
            />
            <span className="font-display text-[22px] font-bold tracking-tight">sagenex</span>
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

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              className="hidden items-center gap-1.5 text-sm text-[var(--fg-secondary)] sm:flex"
            >
              <Globe className="h-4 w-4" />
              En
              <ChevronDown className="h-3 w-3" />
            </button>
            <a
              {...APPLY_LINK_PROPS}
              className="hidden cursor-pointer items-center justify-center gap-2 rounded-[var(--btn-radius)] border-0 px-4 py-2 text-sm font-medium text-white no-underline transition-[transform,filter] duration-200 [background:radial-gradient(237.5%_50.19%_at_50%_50%,rgba(255,255,255,0)_0%,rgba(255,255,255,0.45)_100%),var(--brand)] hover:scale-[1.02] hover:brightness-105 sm:inline-flex"
            >
              {APPLY_LABEL}
            </a>
            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border)] bg-white/80 text-[var(--fg)] lg:hidden"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((v) => !v)}
            >
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 z-40 bg-black/30 transition-opacity duration-300 lg:hidden ${
          menuOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setMenuOpen(false)}
        aria-hidden="true"
      />
      <nav
        className={`fixed right-0 top-16 z-50 flex h-[calc(100dvh-4rem)] w-[min(320px,88vw)] flex-col gap-1 border-l border-[var(--border)] bg-white p-6 shadow-2xl transition-transform duration-300 ease-out lg:hidden ${
          menuOpen ? "translate-x-0" : "pointer-events-none translate-x-full"
        }`}
        aria-hidden={!menuOpen}
      >
        {nav.map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase()}`}
            className="rounded-xl px-4 py-3.5 text-[17px] font-medium text-[var(--fg)] active:bg-[var(--gray-100)]"
            onClick={() => setMenuOpen(false)}
            tabIndex={menuOpen ? undefined : -1}
          >
            {item}
          </a>
        ))}
        <a
          {...APPLY_LINK_PROPS}
          className="mt-4 inline-flex cursor-pointer items-center justify-center rounded-[14px] border-0 px-6 py-3.5 text-[16px] font-medium text-white no-underline [background:linear-gradient(90deg,rgba(255,120,140,0)_0%,rgba(255,120,140,0.65)_100%),var(--brand)]"
          onClick={() => setMenuOpen(false)}
          tabIndex={menuOpen ? undefined : -1}
        >
          {APPLY_LABEL}
        </a>
      </nav>
    </>
  );
}
