"use client";

type Screen = {
  title: string;
  subtitle?: string;
  variant: "signup" | "kyc" | "card";
};

const SCREENS: Screen[] = [
  {
    title: "Create account",
    subtitle: "Join Sagenex in under a minute.",
    variant: "signup",
  },
  {
    title: "Verify identity",
    subtitle: "Quick KYC — usually approved within 24 hours.",
    variant: "kyc",
  },
  {
    title: "Card activated",
    subtitle: "Your Sagenex Global Pay Card is ready to use.",
    variant: "card",
  },
];

function SignupScreen() {
  return (
    <div className="flex w-full flex-col gap-2.5 px-1">
      <div className="h-7 rounded-lg border border-[var(--border)] bg-[var(--gray-50)] px-2.5 text-[10px] leading-7 text-[var(--gray-400)]">
        you@email.com
      </div>
      <div className="h-7 rounded-lg border border-[var(--border)] bg-[var(--gray-50)] px-2.5 text-[10px] leading-7 text-[var(--gray-400)]">
        ••••••••
      </div>
      <div className="mt-1 h-8 rounded-lg bg-[var(--brand)] text-center text-[10px] font-medium leading-8 text-white">
        Sign up
      </div>
    </div>
  );
}

function KycScreen() {
  return (
    <div className="flex w-full flex-col items-center gap-2.5 px-1">
      <div className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-dashed border-[var(--brand)]/40 bg-[var(--brand)]/5">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
          <rect x="4" y="2" width="16" height="20" rx="2" stroke="var(--brand)" strokeWidth="1.5" />
          <circle cx="12" cy="10" r="3" stroke="var(--brand)" strokeWidth="1.5" />
          <path d="M7 18c0-2.8 2.2-5 5-5s5 2.2 5 5" stroke="var(--brand)" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </div>
      <p className="m-0 text-center text-[9px] leading-[1.4] text-[var(--gray-400)]">
        Upload ID &amp; selfie
      </p>
      <div className="flex w-full items-center gap-1.5">
        <div className="h-1 flex-1 overflow-hidden rounded-full bg-[var(--gray-100)]">
          <div className="h-full w-2/3 rounded-full bg-[var(--brand)]" />
        </div>
        <span className="text-[9px] font-medium text-[var(--brand)]">67%</span>
      </div>
    </div>
  );
}

function CardScreen() {
  return (
    <div className="flex w-full flex-col items-center gap-2 px-1">
      <div className="relative h-[52px] w-[82px] overflow-hidden rounded-md shadow-[0_4px_16px_rgba(0,0,0,0.15)]">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a]" />
        <p className="absolute top-1.5 left-1.5 m-0 text-[5px] font-bold tracking-wider text-white/90">
          SAGENEX
        </p>
        <div className="absolute right-1 bottom-1 h-2.5 w-5 rounded-sm bg-[#1a1f71]" />
      </div>
      <p className="m-0 text-center text-[9px] font-medium text-[var(--brand)]">
        ✓ Activated
      </p>
    </div>
  );
}

export function PhoneScreenOverlay({ activeStep }: { activeStep: number }) {
  const screen = SCREENS[activeStep] ?? SCREENS[0];

  return (
    <div
      className="pointer-events-none absolute top-1/2 left-1/2 z-[2] w-[200px] -translate-x-1/2 -translate-y-1/2 md:w-[240px] min-[1280px]:w-[260px]"
      aria-hidden
    >
      <div className="relative flex aspect-[9/19] flex-col overflow-hidden rounded-[28px] border-[3px] border-[var(--border)] bg-white shadow-[0_24px_80px_rgba(0,0,0,0.1)]">
        {/* iPhone notch */}
        <div className="absolute left-1/2 top-0 z-10 h-[18px] w-[42%] -translate-x-1/2 rounded-b-[12px] bg-black">
          <span className="absolute left-1/2 top-1/2 h-[3px] w-6 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#1f1f1f]" />
          <span className="absolute right-2.5 top-1/2 h-[5px] w-[5px] -translate-y-1/2 rounded-full bg-[#1f1f1f]" />
        </div>

        {/* status bar */}
        <div className="flex items-center justify-between px-4 pt-[7px] text-[9px] font-semibold text-[var(--fg)]">
          <span>9:41</span>
          <span className="flex items-center gap-1">
            <svg width="12" height="8" viewBox="0 0 12 8" fill="none" aria-hidden>
              <rect x="0" y="5" width="2" height="3" rx="0.5" fill="currentColor" />
              <rect x="3" y="3.5" width="2" height="4.5" rx="0.5" fill="currentColor" />
              <rect x="6" y="2" width="2" height="6" rx="0.5" fill="currentColor" />
              <rect x="9" y="0.5" width="2" height="7.5" rx="0.5" fill="currentColor" />
            </svg>
            <svg width="12" height="9" viewBox="0 0 16 12" fill="none" aria-hidden>
              <path d="M8 2.5c2 0 3.8.8 5.2 2.1l1.1-1.2C12.6 1.7 10.4.8 8 .8S3.4 1.7 1.7 3.4l1.1 1.2C4.2 3.3 6 2.5 8 2.5Z" fill="currentColor" />
              <path d="M8 6c1 0 1.9.4 2.6 1.1l1.1-1.2C10.7 4.9 9.4 4.3 8 4.3s-2.7.6-3.7 1.6l1.1 1.2C6.1 6.4 7 6 8 6Z" fill="currentColor" />
              <circle cx="8" cy="9.3" r="1.4" fill="currentColor" />
            </svg>
            <span className="ml-0.5 flex h-[7px] w-[13px] items-center rounded-[2px] border border-current px-[1px]">
              <span className="h-[3.5px] w-full rounded-[1px] bg-current" />
            </span>
          </span>
        </div>

        <div className="flex flex-1 flex-col items-center justify-center gap-2 p-4">
          <p className="m-0 text-center text-[13px] font-semibold text-[var(--fg)]">
            {screen.title}
          </p>
          {screen.subtitle && (
            <p className="m-0 text-center text-[10px] leading-[1.4] text-[var(--gray-400)]">
              {screen.subtitle}
            </p>
          )}

          <div className="mt-2 w-full">
            {screen.variant === "signup" && <SignupScreen />}
            {screen.variant === "kyc" && <KycScreen />}
            {screen.variant === "card" && <CardScreen />}
          </div>
        </div>

        {/* Step indicator dots */}
        <div className="flex items-center justify-center gap-1.5 pb-4">
          {SCREENS.map((_, i) => (
            <span
              key={i}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === activeStep ? "w-4 bg-[var(--brand)]" : "w-1.5 bg-[var(--gray-200)]"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
