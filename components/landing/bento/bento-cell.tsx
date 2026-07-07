"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";

type Item = (typeof import("@/lib/content").HIGHLIGHTS)[number];

const PLACEMENT: Record<string, string> = {
  ownership: "lg:col-[1/3] lg:row-[1/3]",
  easy: "lg:col-[3/5] lg:row-[1]",
  crypto: "lg:col-[3] lg:row-[2]",
  seedless: "lg:col-[4] lg:row-[2]",
  ready: "lg:col-[1/3] lg:row-[3]",
  storage: "lg:col-[3/5] lg:row-[3]",
};

const MIN_HEIGHT: Record<Item["size"], string> = {
  hero: "min-h-[380px] lg:min-h-full",
  wide: "min-h-[300px] lg:min-h-full",
  small: "min-h-[240px] lg:min-h-full",
};

export function BentoCell({
  item,
  image,
  priority = false,
}: {
  item: Item;
  image: string;
  priority?: boolean;
}) {
  const isHero = item.size === "hero";
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.article
      className={`group relative overflow-hidden rounded-[22px] border border-black/[0.06] bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04),0_10px_30px_rgba(0,0,0,0.05)] transition-[box-shadow,transform] duration-[450ms] ease-[cubic-bezier(0.25,0.1,0.25,1)] hover:-translate-y-0.5 hover:shadow-[0_4px_10px_rgba(0,0,0,0.05),0_24px_56px_rgba(196,30,58,0.10)] ${MIN_HEIGHT[item.size]} ${PLACEMENT[item.id] ?? ""}`}
      initial={false}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
    >
      <Image
        src={image}
        alt={item.title}
        fill
        className="object-cover transition-transform duration-[700ms] ease-[cubic-bezier(0.25,0.1,0.25,1)] [@media(hover:hover)]:group-hover:scale-[1.05]"
        sizes={isHero ? "(max-width: 1024px) 100vw, 50vw" : "(max-width: 1024px) 100vw, 30vw"}
        priority={priority}
      />

      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[62%] bg-[linear-gradient(180deg,rgba(255,255,255,0.94)_0%,rgba(255,255,255,0.72)_38%,rgba(255,255,255,0)_100%)]"
        aria-hidden
      />

      <div className={`absolute left-0 top-0 z-10 ${isHero ? "p-6 xl:p-7" : "p-5"}`}>
        <h3
          className={`m-0 font-medium tracking-[-0.02em] text-[var(--fg)] ${
            isHero
              ? "text-[clamp(1.5rem,2.6vw,2rem)] leading-[1.12]"
              : "text-[clamp(1.125rem,1.6vw,1.375rem)] leading-[1.15]"
          }`}
        >
          {item.title}
        </h3>
        <p
          className={`mt-1.5 max-w-[26ch] leading-[1.4] text-[var(--fg-secondary)] ${
            isHero ? "text-[0.9375rem]" : "text-[0.8125rem]"
          }`}
        >
          {item.desc}
        </p>
      </div>

      {/* Detail panel — tap on mobile, hover on desktop */}
      <div
        className={`absolute inset-x-0 bottom-0 z-10 bg-[rgba(255,255,255,0.92)] p-6 pr-16 backdrop-blur-[14px] transition-transform duration-[450ms] ease-[cubic-bezier(0.25,0.1,0.25,1)] ${
          expanded ? "translate-y-0" : "translate-y-full [@media(hover:hover)]:group-hover:translate-y-0"
        }`}
      >
        <p className="m-0 text-[0.8125rem] leading-[1.55] text-[var(--fg-secondary)]">
          {item.detail}
        </p>
      </div>

      <button
        type="button"
        aria-label={expanded ? `Close ${item.title} details` : `More about ${item.title}`}
        aria-expanded={expanded}
        onClick={() => setExpanded((v) => !v)}
        className={`absolute bottom-4 right-4 z-20 grid h-11 w-11 place-items-center rounded-full border border-black/[0.06] bg-white/90 text-[var(--fg)] shadow-[0_2px_8px_rgba(0,0,0,0.10)] backdrop-blur-sm transition-[transform,background-color,color] duration-[400ms] ease-[cubic-bezier(0.25,0.1,0.25,1)] active:scale-95 ${
          expanded
            ? "rotate-45 bg-[var(--brand)] text-white"
            : "[@media(hover:hover)]:group-hover:rotate-45 [@media(hover:hover)]:group-hover:bg-[var(--brand)] [@media(hover:hover)]:group-hover:text-white"
        }`}
      >
        <Plus className="h-5 w-5" strokeWidth={2.25} />
      </button>
    </motion.article>
  );
}
