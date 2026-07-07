"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { FAQS } from "@/lib/content";
import { APPLY_LABEL, APPLY_LINK_PROPS } from "@/lib/links";

export function FaqSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-[var(--surface)] py-16 text-[var(--fg)] sm:py-24">
      <div className="mx-auto w-full max-w-3xl px-4 sm:px-[max(24px,calc((100vw-1440px)/2))]">
        <h2 className="text-[clamp(36px,4.5vw,64px)] font-medium leading-[1.05] tracking-[-0.03em] text-black">
          FAQs about Sagenex Hardware Wallet
        </h2>
        <p className="mt-4 text-[var(--gray-400)]">
          We&apos;ve answered some of the most frequently asked questions
        </p>

        <div className="mt-12">
          {FAQS.map((faq, i) => (
            <div key={faq.q}>
              <button
                type="button"
                onClick={() => setOpen(open === i ? null : i)}
                className="flex min-h-[52px] w-full cursor-pointer items-center justify-between gap-4 border-0 border-b border-[var(--gray-200)] bg-none py-4 text-left text-[17px] font-medium text-[var(--black)] sm:py-6 sm:text-[20px]"
              >
                <span>{faq.q}</span>
                <ChevronDown
                  className={`h-5 w-5 shrink-0 transition-transform ${
                    open === i ? "rotate-180" : ""
                  }`}
                />
              </button>
              {open === i && (
                <p className="pb-6 text-[15px] leading-relaxed text-[var(--gray-400)]">
                  {faq.a}
                </p>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 rounded-2xl bg-[var(--gray-100)] p-8 text-center">
          <h3 className="text-xl font-medium text-black">More questions?</h3>
          <p className="mt-2 text-[var(--gray-400)]">
            Sagenex Support responds in just a minute. Available 24/7
          </p>
          <a
            {...APPLY_LINK_PROPS}
            className="mt-6 inline-flex cursor-pointer items-center justify-center gap-2 rounded-[var(--btn-radius)] border-0 px-4 py-2 text-sm font-medium text-white no-underline transition-[transform,filter] duration-200 [background:radial-gradient(237.5%_50.19%_at_50%_50%,rgba(255,255,255,0)_0%,rgba(255,255,255,0.45)_100%),var(--brand)] hover:scale-[1.02] hover:brightness-105"
          >
            {APPLY_LABEL}
          </a>
        </div>
      </div>
    </section>
  );
}
