"use client";

import { useState } from "react";
import Image from "next/image";
import { ECOSYSTEM_TABS } from "@/lib/content";
import { ASSETS } from "@/lib/assets";

export function EcosystemSection() {
  const [tab, setTab] = useState(0);

  return (
    <section id="ecosystem" className="bg-[var(--surface)] py-24 text-[var(--fg)]">
      <div className="mx-auto w-full max-w-[1920px] px-[max(24px,calc((100vw-1440px)/2))] text-center">
        <p className="text-sm uppercase tracking-widest text-[var(--gray-400)]">
          Ecosystem
        </p>
        <h2 className="mt-4 text-[clamp(36px,4.5vw,64px)] font-medium leading-[1.05] tracking-[-0.03em] text-black">
          More than just a cold wallet
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-[var(--gray-400)]">
          Manage your assets, explore services, and unlock new possibilities with
          the Sagenex app.
        </p>
        <p className="mt-2 text-sm text-[var(--gray-400)]">
          Loved by users worldwide. High-performance crypto management.
        </p>

        <div className="relative mx-auto mt-12 max-w-sm">
          <div className="overflow-hidden rounded-[32px] border border-[var(--gray-200)] shadow-xl">
            <Image
              src={ASSETS.appScreens[tab % ASSETS.appScreens.length]}
              alt="Sagenex app"
              width={400}
              height={800}
              className="w-full"
            />
          </div>
        </div>

        <div className="mx-auto mt-10 inline-flex gap-1 rounded-full bg-[var(--gray-100)] p-1">
          {ECOSYSTEM_TABS.map((t, i) => (
            <button
              key={t}
              type="button"
              className={
                tab === i
                  ? "cursor-pointer rounded-full border-0 px-5 py-2.5 text-sm font-medium transition-all duration-[250ms] bg-[var(--brand)] text-white shadow-[0_2px_8px_rgba(196,30,58,0.2)]"
                  : "cursor-pointer rounded-full border-0 bg-transparent px-5 py-2.5 text-sm font-medium text-[var(--gray-400)] transition-all duration-[250ms]"
              }
              onClick={() => setTab(i)}
            >
              {t}
            </button>
          ))}
        </div>

        <p className="mt-10 text-sm text-[var(--gray-400)]">
          Scan the QR code · Desktop & Mobile Apps Coming Soon
        </p>
      </div>
    </section>
  );
}
