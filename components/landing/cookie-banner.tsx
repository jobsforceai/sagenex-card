"use client";

import { useSyncExternalStore } from "react";

const COOKIE_KEY = "sagenex-cookies";
const COOKIE_EVENT = "sagenex-cookies-change";

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(COOKIE_EVENT, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(COOKIE_EVENT, callback);
  };
}

function getAcceptedSnapshot() {
  return localStorage.getItem(COOKIE_KEY) === "1";
}

function getServerSnapshot() {
  return true;
}

export function CookieBanner() {
  const accepted = useSyncExternalStore(subscribe, getAcceptedSnapshot, getServerSnapshot);

  if (accepted) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[100] border-t border-[var(--border)] bg-white/95 px-4 py-4 shadow-lg backdrop-blur-md pb-[max(1rem,env(safe-area-inset-bottom))] sm:px-6">
      <div className="mx-auto flex max-w-6xl flex-col items-stretch justify-between gap-4 sm:flex-row sm:items-center">
        <p className="text-center text-xs leading-relaxed text-[var(--fg-secondary)] sm:text-left">
          <span className="font-medium uppercase text-[var(--fg)]">This website uses cookies</span>
          <br />
          We use cookies to personalise content and analyse traffic. By continuing you agree to
          our use of cookies.
        </p>
        <button
          type="button"
          onClick={() => {
            localStorage.setItem(COOKIE_KEY, "1");
            window.dispatchEvent(new Event(COOKIE_EVENT));
          }}
          className="inline-flex min-h-[44px] shrink-0 cursor-pointer items-center justify-center gap-2 rounded-[var(--btn-radius)] border-0 px-8 py-2.5 text-sm font-medium text-white no-underline transition-[transform,filter] duration-200 [background:radial-gradient(237.5%_50.19%_at_50%_50%,rgba(255,255,255,0)_0%,rgba(255,255,255,0.45)_100%),var(--brand)] active:scale-[0.98]"
        >
          OK
        </button>
      </div>
    </div>
  );
}
