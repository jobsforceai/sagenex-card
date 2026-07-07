"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { FAQS } from "@/lib/content";

export function FaqSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-[var(--surface)] py-24 text-[var(--fg)]">
      <div className="mx-auto w-full max-w-3xl px-[max(24px,calc((100vw-1440px)/2))]">
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
                className="flex w-full cursor-pointer items-center justify-between gap-4 border-0 border-b border-[var(--gray-200)] bg-none py-6 text-left text-[20px] font-medium text-[var(--black)]"
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
            href="#"
            className="mt-6 inline-flex cursor-pointer items-center justify-center gap-2 rounded-[var(--btn-radius)] border-0 px-4 py-2 text-sm font-medium text-white no-underline transition-[transform,filter] duration-200 [background:radial-gradient(237.5%_50.19%_at_50%_50%,rgba(255,255,255,0)_0%,rgba(255,255,255,0.45)_100%),var(--brand)] hover:scale-[1.02] hover:brightness-105"
          >
            Get in touch
          </a>
        </div>
      </div>
    </section>
  );
}
