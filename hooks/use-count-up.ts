"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useInView } from "framer-motion";

type ParsedValue = {
  numeric: number;
  prefix: string;
  suffix: string;
  decimals: number;
};

export function parseStatValue(raw: string): ParsedValue {
  const match = raw.match(/^([^0-9]*)([\d,]+(?:\.\d+)?)(.*)$/);
  if (!match) return { numeric: 0, prefix: "", suffix: raw, decimals: 0 };

  const numStr = match[2].replace(/,/g, "");
  const decimals = numStr.includes(".") ? numStr.split(".")[1].length : 0;

  return {
    prefix: match[1],
    numeric: parseFloat(numStr),
    suffix: match[3],
    decimals,
  };
}

export function formatStatValue(
  value: number,
  { prefix, suffix, decimals }: ParsedValue,
): string {
  const formatted =
    decimals > 0
      ? value.toFixed(decimals)
      : Math.round(value).toLocaleString("en-US");
  return `${prefix}${formatted}${suffix}`;
}

export function useCountUp(
  raw: string,
  options?: { duration?: number; delay?: number },
) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20%" });
  const parsed = useMemo(() => parseStatValue(raw), [raw]);
  const [display, setDisplay] = useState(() =>
    formatStatValue(0, { ...parsed, suffix: parsed.suffix }),
  );

  useEffect(() => {
    if (!inView) return;

    const duration = (options?.duration ?? 1.4) * 1000;
    const delay = (options?.delay ?? 0) * 1000;
    let start = 0;
    let raf = 0;

    const tick = (now: number) => {
      if (!start) start = now;
      const elapsed = now - start - delay;
      if (elapsed < 0) {
        raf = requestAnimationFrame(tick);
        return;
      }

      const t = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(formatStatValue(parsed.numeric * eased, parsed));

      if (t < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, parsed, options?.duration, options?.delay]);

  return { ref, display, inView };
}
