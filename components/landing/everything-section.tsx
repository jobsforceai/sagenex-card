"use client";

import Image from "next/image";
import { EVERYTHING } from "@/lib/content";
import { ASSETS } from "@/lib/assets";

const images = [
  ASSETS.everything.staking,
  ASSETS.everything.dapps,
  ASSETS.everything.alerts,
  ASSETS.everything.market,
  ASSETS.everything.staking,
  ASSETS.everything.alerts,
];

export function EverythingSection() {
  return (
    <section className="bg-[var(--surface)] py-24 text-[var(--fg)]">
      <div className="mx-auto w-full max-w-[1920px] px-[max(24px,calc((100vw-1440px)/2))]">
        <h2 className="text-center text-[clamp(36px,4.5vw,64px)] font-medium leading-[1.05] tracking-[-0.03em] text-black">Everything you need</h2>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {EVERYTHING.map((item, i) => (
            <div
              key={item.title}
              className={`flex flex-col justify-between rounded-3xl bg-[var(--gray-100)] p-6 ${
                i === 1 ? "lg:row-span-2 min-h-[420px]" : "min-h-[200px]"
              }`}
            >
              <p className="max-w-[200px] text-lg font-medium text-black">{item.title}</p>
              <div className="relative mt-4 h-32 overflow-hidden rounded-xl">
                <Image
                  src={images[i]}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="300px"
                />
              </div>
            </div>
          ))}
        </div>

        <p className="mx-auto mt-12 max-w-3xl text-center text-sm leading-relaxed text-[var(--gray-400)]">
          Open source and community-verified. Our app has no hidden backdoors and
          can be recreated independently if needed — check its code on GitHub.
        </p>
      </div>
    </section>
  );
}
