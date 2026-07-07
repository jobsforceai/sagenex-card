"use client";

import { HIGHLIGHTS } from "@/lib/content";
import { ASSETS } from "@/lib/assets";
import { BentoCell } from "./bento-cell";

export function BentoGrid() {
  return (
    <div className="grid grid-cols-1 gap-[14px] sm:grid-cols-2 lg:grid-cols-4 lg:auto-rows-[minmax(228px,1fr)] lg:gap-4">
      {HIGHLIGHTS.map((item) => (
        <BentoCell
          key={item.id}
          item={item}
          image={ASSETS.bento[item.id as keyof typeof ASSETS.bento]}
          priority={item.id === "ownership"}
        />
      ))}
    </div>
  );
}
