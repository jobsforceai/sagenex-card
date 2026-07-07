"use client";

import Image from "next/image";
import { CHIP_FEATURES } from "@/lib/content";
import { ASSETS } from "@/lib/assets";

export function ChipSection() {
  return (
    <section id="security" className="border-t border-[var(--border)] bg-[var(--surface)] py-16 text-[var(--fg)] sm:py-24">
      <div className="mx-auto w-full max-w-[1920px] px-4 sm:px-[max(24px,calc((100vw-1440px)/2))]">
        <p className="mb-4 text-sm uppercase tracking-widest text-[var(--fg-tertiary)]">
          Security &amp; Reliability
        </p>
        <h2 className="max-w-3xl text-[clamp(36px,4.5vw,64px)] font-medium leading-[1.05] tracking-[-0.03em] text-black">
          Crypto security at its peak
        </h2>
        <p className="mt-4 max-w-2xl text-lg text-[var(--fg-secondary)]">
          Every Sagenex Wallet contains a powerful, certified microchip developed
          with Samsung Semiconductors.
        </p>

        <div className="relative mx-auto mt-12 aspect-video max-w-4xl overflow-hidden rounded-[var(--card-radius)] bg-[var(--gray-100)] shadow-lg">
          <Image
            src={ASSETS.chipImage}
            alt="Sagenex card secure element"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 900px"
          />
        </div>

        <div className="mt-16 grid gap-8 sm:grid-cols-2">
          {CHIP_FEATURES.map((f) => (
            <div key={f.title} className="border-t border-[var(--border)] pt-8">
              <h3 className="text-lg font-medium text-[var(--fg)]">{f.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-[var(--fg-secondary)]">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
