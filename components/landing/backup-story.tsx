"use client";

import { useRef } from "react";
import { BACKUP_FOOTER, BACKUP_HEADER, BACKUP_STEPS } from "@/lib/content";
import { useBackupWebgl } from "@/hooks/use-backup-webgl";
import { PhoneScreenOverlay } from "./phone-screen-overlay";

function BackupPreloader() {
  return (
    <div
      className="absolute inset-0 z-[3] flex items-center justify-center bg-[rgba(245,245,247,0.85)] backdrop-blur-[4px]"
      aria-hidden
    >
      <div className="h-10 w-10 animate-[backup-spin_0.8s_linear_infinite] rounded-full border-2 border-[var(--border)] border-t-[var(--brand)]" />
    </div>
  );
}

export function BackupStorySection() {
  const trackRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const { canvasRef, activeStep, ready, scrollToStep } = useBackupWebgl(
    trackRef,
    containerRef,
    stageRef,
  );

  return (
    <section
      id="backup"
      className="relative mt-20 overflow-clip bg-[var(--bg)] px-4 scroll-mt-20 sm:mt-24 sm:px-6 md:px-8 min-[1280px]:mt-40 min-[1280px]:px-20"
    >
      <div className="relative z-[3]">
        <div className="flex w-full flex-col items-center justify-center gap-3 text-center sm:gap-4 md:gap-6">
          <div className="text-sm font-medium uppercase leading-[140%] tracking-[-0.12px] text-[var(--brand)] sm:text-base">
            {BACKUP_HEADER.label}
          </div>
          <h2 className="m-0 text-[clamp(28px,6vw,64px)] font-medium leading-[1.05] tracking-[-0.03em] text-[var(--fg)]">
            {BACKUP_HEADER.title}
          </h2>
          <p className="m-0 w-full max-w-[600px] text-base leading-[1.45] text-[var(--gray-400)] sm:text-lg sm:leading-[1.4] md:text-xl">
            {BACKUP_HEADER.desc}
          </p>
        </div>
      </div>

      {/* Scroll track — works on mobile too */}
      <div ref={trackRef} className="relative h-[260vh] sm:h-[320vh] min-[1280px]:h-[500vh]">
        <div
          ref={containerRef}
          className="relative mx-auto flex min-h-[min(520px,85dvh)] flex-col items-center justify-center gap-5 py-8 sticky top-16 h-[calc(100dvh-4rem)] min-[1280px]:top-0 min-[1280px]:h-screen min-[1280px]:gap-8 min-[1280px]:py-0"
        >
          <div
            ref={stageRef}
            className="relative mx-auto aspect-[4/3] w-full max-h-[min(42dvh,400px)] max-w-[960px] overflow-hidden rounded-2xl border border-[var(--border)] bg-[#f5f5f7] bg-[url(/backup-scene-bg.png)] bg-cover bg-center bg-no-repeat shadow-[0_1px_2px_rgba(0,0,0,0.04),0_20px_60px_rgba(0,0,0,0.08)] sm:aspect-[16/10] sm:max-h-[min(50dvh,480px)] sm:rounded-3xl min-[1280px]:max-h-[min(62vh,600px)]"
          >
            <canvas
              ref={canvasRef}
              id="backupCanvas"
              className={`absolute inset-0 block h-full w-full pointer-events-none opacity-0 transition-opacity duration-[600ms] ease${ready ? " opacity-100" : ""}`}
            />
            <PhoneScreenOverlay activeStep={activeStep} />
            {!ready && <BackupPreloader />}
          </div>

          {/* Mobile/tablet: tap to jump between steps */}
          <div className="flex w-full max-w-[640px] items-center justify-center gap-2 px-2 min-[1280px]:hidden">
            {BACKUP_STEPS.map((step, i) => (
              <button
                key={step.title}
                type="button"
                onClick={() => scrollToStep(i)}
                className={`min-h-[44px] flex-1 rounded-full px-2 py-2.5 text-[11px] font-medium leading-tight transition-colors sm:text-xs ${
                  activeStep === i
                    ? "bg-[var(--brand)] text-white"
                    : "bg-white text-[var(--gray-400)] border border-[var(--border)]"
                }`}
              >
                {i === 0 ? "Sign up" : i === 1 ? "KYC" : "Get card"}
              </button>
            ))}
          </div>

          <div className="relative min-h-[72px] w-full max-w-[640px] text-center sm:min-h-[88px]">
            {BACKUP_STEPS.map((step, i) => (
              <div
                key={step.title}
                className={`absolute inset-0 flex flex-col items-center justify-start gap-1.5 opacity-0 translate-y-3 transition-[opacity,transform] duration-500 ease pointer-events-none sm:gap-2${
                  activeStep === i ? " opacity-100 translate-y-0" : ""
                }`}
                aria-hidden={activeStep !== i}
              >
                <p className="m-0 text-[clamp(20px,4.5vw,30px)] font-medium leading-[1.1] tracking-[-0.02em] text-[var(--fg)]">
                  {step.title}
                </p>
                {"desc" in step && step.desc && (
                  <p className="m-0 max-w-[44ch] px-2 text-[14px] leading-[1.5] text-[var(--gray-400)] sm:text-[15px]">
                    {step.desc}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <p className="relative z-[2] mx-auto mt-12 max-w-[700px] px-2 text-center text-sm leading-normal text-[rgba(17,17,17,0.55)] sm:mt-16 sm:text-base min-[976px]:mt-[100px]">
        {BACKUP_FOOTER}
      </p>
    </section>
  );
}
