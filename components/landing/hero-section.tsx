"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronDown, KeyRound, Layers, ShieldCheck } from "lucide-react";
import { useHeroCardScene } from "@/hooks/use-hero-card-scene";

const TRUST_CHIPS = [
  { icon: KeyRound, label: "Non-custodial & seedless" },
  { icon: Layers, label: "14,100+ assets · 90+ networks" },
  { icon: ShieldCheck, label: "25-year hardware warranty" },
] as const;

const FEATURES = [
  {
    title: "EAL6+ Secure Element",
    desc: "Your private keys are generated and sealed inside a bank-grade chip that never touches the internet.",
    angle: -58,
  },
  {
    title: "Tap to sign",
    desc: "Approve any payment by tapping the card to your phone — no seed phrase, no cables, no batteries.",
    angle: -20,
  },
  {
    title: "Built to last 25 years",
    desc: "A solid metal build with no moving parts, rated to survive water, heat, and cold for decades.",
    angle: 20,
  },
  {
    title: "Spend anywhere",
    desc: "Works as a Visa Global Pay card, so you can spend your crypto anywhere Visa is accepted.",
    angle: 58,
  },
] as const;

function LaurelBranch({ flip = false }: { flip?: boolean }) {
  const leaves = [
    { cx: 15, cy: 6, rot: -28 },
    { cx: 11, cy: 12, rot: -12 },
    { cx: 8.5, cy: 18, rot: 4 },
    { cx: 7.5, cy: 25, rot: 22 },
    { cx: 9, cy: 32, rot: 44 },
  ];
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 40"
      className={`h-10 w-[19px] text-[var(--gray-400)] ${flip ? "-scale-x-100" : ""}`}
    >
      <path
        d="M18 3 C10 9 6 20 9 37"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity="0.65"
      />
      {leaves.map((l) => (
        <ellipse
          key={`${l.cx}-${l.cy}`}
          cx={l.cx}
          cy={l.cy}
          rx="4.2"
          ry="1.9"
          fill="currentColor"
          opacity="0.5"
          transform={`rotate(${l.rot} ${l.cx} ${l.cy})`}
        />
      ))}
    </svg>
  );
}

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const layerRef = useRef<HTMLDivElement>(null);
  const [reveal, setReveal] = useState(0);
  const [dim, setDim] = useState({ w: 0, h: 0 });
  const { canvasRef, ready } = useHeroCardScene(sectionRef, setReveal);
  const inFeatures = reveal > 0;

  useEffect(() => {
    const el = layerRef.current;
    if (!el) return;
    const update = () => setDim({ w: el.clientWidth, h: el.clientHeight });
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Fan the feature cards out on a semicircular arc that radiates from the card.
  const { pivot, nodes } = useMemo(() => {
    const p = { x: dim.w * 0.27, y: dim.h * 0.52 };
    const rx = dim.w * 0.34;
    const ry = dim.h * 0.36;
    return {
      pivot: p,
      nodes: FEATURES.map((f) => {
        const a = (f.angle * Math.PI) / 180;
        return { ...f, x: p.x + rx * Math.cos(a), y: p.y + ry * Math.sin(a) };
      }),
    };
  }, [dim]);

  return (
    <section ref={sectionRef} id="hero" className="relative bg-[var(--bg)] h-[300vh] md:h-[320vh]">
      <div ref={layerRef} className="sticky top-0 flex h-screen flex-col overflow-hidden">
        {/* Studio backdrop */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 top-1/2 z-0 bg-[url(/backup-scene-bg.png)] bg-cover bg-center opacity-50"
        />
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 z-0 [background:radial-gradient(120%_80%_at_50%_16%,rgba(255,255,255,0.92)_0%,rgba(248,249,250,0.45)_45%,transparent_75%)]"
        />

        {/* Headline — scrolls up and away as the feature phase begins */}
        <div
          className={`relative z-[3] mx-auto max-w-[760px] px-6 pt-14 text-center transition-all duration-700 md:pt-16 ${
            inFeatures ? "-translate-y-8 opacity-0" : "translate-y-0 opacity-100"
          }`}
        >
          <h1 className="mb-4 text-[34px] font-medium leading-[108%] tracking-[-0.432px] text-[var(--fg)] min-[976px]:mb-5 min-[976px]:text-[58px] min-[976px]:leading-[100%] min-[976px]:tracking-[-2.2px]">
            Cold storage you can spend anywhere
          </h1>
          <p className="mx-auto max-w-[580px] text-[17px] leading-[1.45] text-[var(--gray-400)] min-[976px]:text-[19px]">
            The Sagenex Global Pay Card locks your private keys inside an EAL6+
            secure element — then lets you tap to pay worldwide. No seed phrase,
            no batteries, no exchange.
          </p>
        </div>

        {/* 3D card */}
        <div className="absolute inset-0 z-[1] flex items-center justify-center">
          <canvas
            ref={canvasRef}
            aria-hidden
            className={`block h-full w-full transition-opacity duration-700 ${ready ? "opacity-100" : "opacity-0"}`}
          />
        </div>

        {/* Feature eyebrow, appears during feature phase */}
        <div
          className={`pointer-events-none absolute left-1/2 top-16 z-[3] -translate-x-1/2 text-center transition-all duration-700 md:top-20 ${
            inFeatures ? "translate-y-0 opacity-100" : "-translate-y-3 opacity-0"
          }`}
        >
          <p className="text-[13px] font-medium uppercase tracking-[0.18em] text-[var(--brand)]">
            One card. Total control.
          </p>
        </div>

        {/* Desktop: radial leader lines that emanate from the card */}
        <svg
          aria-hidden
          className="pointer-events-none absolute inset-0 z-[2] hidden lg:block"
          width={dim.w}
          height={dim.h}
        >
          {nodes.map((n, i) => (
            <g
              key={n.title}
              className="transition-opacity duration-500"
              style={{ opacity: reveal > i ? 1 : 0 }}
            >
              <line
                x1={pivot.x}
                y1={pivot.y}
                x2={n.x}
                y2={n.y}
                stroke="var(--brand)"
                strokeWidth={1.5}
                strokeDasharray="2 5"
                strokeLinecap="round"
                opacity={0.55}
              />
              <circle cx={n.x} cy={n.y} r={4.5} fill="var(--brand)" />
            </g>
          ))}
          {inFeatures && dim.w > 0 && (
            <>
              <circle cx={pivot.x} cy={pivot.y} r={5} fill="var(--brand)" />
              <circle cx={pivot.x} cy={pivot.y} r={5} fill="none" stroke="var(--brand)" strokeWidth={1.5}>
                <animate attributeName="r" from="5" to="18" dur="1.6s" repeatCount="indefinite" />
                <animate attributeName="opacity" from="0.6" to="0" dur="1.6s" repeatCount="indefinite" />
              </circle>
            </>
          )}
        </svg>

        {/* Desktop: floating feature cards fanned around the card */}
        <div className="pointer-events-none absolute inset-0 z-[3] hidden lg:block">
          {nodes.map((n, i) => (
            <div
              key={n.title}
              className="absolute w-[300px] rounded-2xl border border-[var(--border)] bg-white/85 px-5 py-4 shadow-[0_10px_40px_rgba(0,0,0,0.08)] backdrop-blur-md transition-all duration-500"
              style={{
                left: n.x + 12,
                top: n.y,
                transform: `translateY(-50%) scale(${reveal > i ? 1 : 0.9})`,
                opacity: reveal > i ? 1 : 0,
                transitionDelay: reveal > i ? `${i * 70}ms` : "0ms",
              }}
            >
              <p className="text-[16px] font-medium text-[var(--fg)]">{n.title}</p>
              <p className="mt-1 text-[13px] leading-[1.5] text-[var(--gray-400)]">{n.desc}</p>
            </div>
          ))}
        </div>

        {/* Mobile: stacked cards revealing bottom-up */}
        <div className="pointer-events-none absolute inset-x-4 bottom-28 z-[3] flex flex-col gap-2.5 lg:hidden">
          {FEATURES.map((f, i) => (
            <div
              key={f.title}
              className={`rounded-xl border border-[var(--border)] bg-white/90 px-4 py-3 shadow-md backdrop-blur-md transition-all duration-500 ${
                reveal > i ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
              }`}
            >
              <p className="text-[15px] font-medium text-[var(--fg)]">{f.title}</p>
              <p className="mt-0.5 text-[12px] leading-[1.45] text-[var(--gray-400)]">{f.desc}</p>
            </div>
          ))}
        </div>

        {/* CTA + trust + scroll cue — scroll away like the heading */}
        <div
          className={`relative z-[3] mt-auto flex flex-col items-center gap-5 px-6 pb-8 transition-all duration-700 md:pb-12 ${
            inFeatures ? "pointer-events-none translate-y-10 opacity-0" : "translate-y-0 opacity-100"
          }`}
        >
          <div className="flex flex-col-reverse items-center justify-center gap-6 md:flex-row">
            <div className="relative mx-8 flex flex-col items-center justify-center text-center text-[18px] font-medium leading-[131%] tracking-[-0.27px] text-[var(--fg)]">
              <span aria-hidden className="absolute top-0 left-[-30px]">
                <LaurelBranch />
              </span>
              <span aria-hidden className="absolute top-0 right-[-30px]">
                <LaurelBranch flip />
              </span>
              <span>EAL6+ certified secure element</span>
              <span className="text-[14px] font-normal leading-[120%] tracking-[0.14px] text-[var(--gray-400)]">
                Built with Samsung Semiconductors
              </span>
            </div>
            <a
              href="#technology"
              className="inline-flex w-full max-w-[298px] cursor-pointer items-center justify-center gap-2 rounded-[14px] border-0 px-[26px] py-4 text-[20px] font-medium text-white no-underline transition-[transform,filter] duration-200 [background:linear-gradient(90deg,rgba(255,120,140,0)_0%,rgba(255,120,140,0.65)_100%),var(--brand)] hover:scale-[1.02] hover:brightness-105 md:mx-0 md:w-auto md:max-w-none md:px-[30px]"
            >
              Get started
            </a>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {TRUST_CHIPS.map(({ icon: Icon, label }) => (
              <span
                key={label}
                className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border)] bg-white/70 px-3 py-1.5 text-[12px] font-medium text-[var(--gray-400)] backdrop-blur-sm"
              >
                <Icon className="h-3.5 w-3.5 text-[var(--brand)]" />
                {label}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-2 text-[13px] font-medium uppercase tracking-[0.14em] text-[var(--gray-400)]">
            Scroll to explore
            <ChevronDown className="h-4 w-4 animate-bounce" />
          </div>
        </div>

        {/* Bottom fade into next section */}
        <span
          aria-hidden
          className="pointer-events-none absolute bottom-0 left-0 z-[1] h-[160px] w-full [background:linear-gradient(0deg,var(--bg),transparent)]"
        />
      </div>
    </section>
  );
}
