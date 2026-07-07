"use client";

import { useEffect, useState } from "react";
import { Mail, X } from "lucide-react";

export function EmailPopup() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setOpen(true), 8000);
    return () => window.clearTimeout(timer);
  }, []);

  if (!open) return null;

  return (
    <div className="fixed bottom-6 left-6 z-[90] w-[min(340px,calc(100vw-48px))] rounded-2xl border border-[var(--border)] bg-white p-5 shadow-xl">
      <button
        type="button"
        onClick={() => setOpen(false)}
        className="absolute right-3 top-3 text-[var(--fg-tertiary)] hover:text-[var(--fg)]"
        aria-label="Close"
      >
        <X className="h-4 w-4" />
      </button>
      <div className="mb-3 text-[var(--brand)]">
        <Mail className="h-7 w-7" />
      </div>
      <h3 className="text-base font-medium text-[var(--fg)]">Stay in the loop</h3>
      <p className="mt-2 text-xs text-[var(--fg-secondary)]">
        Subscribe for product updates, security tips, and early access.
      </p>
      <form
        className="mt-4 flex gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          setOpen(false);
        }}
      >
        <input
          type="email"
          required
          placeholder="Enter your email"
          className="flex-1 rounded-lg border border-[var(--border)] bg-[var(--gray-50)] px-3 py-2 text-sm text-[var(--fg)] placeholder:text-[var(--fg-tertiary)] outline-none focus:border-[var(--brand)]"
        />
        <button
          type="submit"
          className="inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 rounded-[var(--btn-radius)] border-0 px-4 py-2 text-sm font-medium text-white no-underline transition-[transform,filter] duration-200 [background:radial-gradient(237.5%_50.19%_at_50%_50%,rgba(255,255,255,0)_0%,rgba(255,255,255,0.45)_100%),var(--brand)] hover:scale-[1.02] hover:brightness-105"
        >
          →
        </button>
      </form>
    </div>
  );
}
