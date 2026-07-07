"use client";

import Image from "next/image";
import { ASSETS } from "@/lib/assets";
import { BentoGrid } from "./bento/bento-grid";

export function HighlightsSection() {
  return (
    <section id="technology" className="bg-[var(--surface)] text-[var(--fg)] border-t border-[var(--border)] py-20 lg:py-28">
      <div className="mx-auto w-full max-w-[1920px] px-[max(24px,calc((100vw-1440px)/2))]">
        <header className="mb-10 lg:mb-12">
          <p className="m-0 mb-3 text-[0.8125rem] font-medium tracking-[0.14em] uppercase text-[var(--fg-tertiary)]">Engineered for absolute security</p>
          <h2 className="m-0 max-w-[14ch] text-[clamp(2rem,4.5vw,3rem)] font-medium leading-[1.08] tracking-[-0.03em] text-[var(--fg)]">
            Built in modular layers
            <br />
            of protection
          </h2>
        </header>

        <BentoGrid />

        <div className="mt-20 text-center lg:mt-28">
          <h3 className="text-[clamp(36px,4.5vw,64px)] font-medium leading-[1.05] tracking-[-0.03em] text-black">Certified at the highest level</h3>
          <p className="mx-auto mt-4 max-w-xl text-lg text-[var(--gray-400)]">
            A hardware wallet designed with precision and built to last for decades
          </p>
          <div className="relative mx-auto mt-10 aspect-video max-w-4xl overflow-hidden rounded-3xl bg-[var(--gray-100)] shadow-[0_20px_60px_rgba(0,0,0,0.08)]">
            <Image
              src={ASSETS.securityPoster}
              alt="Sagenex security"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 900px"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
