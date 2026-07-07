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
  const { canvasRef, activeStep, ready } = useBackupWebgl(trackRef, containerRef, stageRef);

  return (
    <section
      id="backup"
      className="relative mt-[120px] overflow-clip bg-[var(--bg)] px-6 scroll-mt-[120px] md:px-8 min-[1280px]:mt-40 min-[1280px]:px-20"
    >
      <div className="relative z-[3]">
        <div className="flex w-full flex-col items-center justify-center gap-4 text-center md:gap-6">
          <div className="text-base font-medium uppercase leading-[140%] tracking-[-0.12px] text-[var(--brand)]">
            {BACKUP_HEADER.label}
          </div>
          <h2 className="m-0 text-[clamp(36px,4.5vw,64px)] font-medium leading-[1.05] tracking-[-0.03em] text-[var(--fg)]">
            {BACKUP_HEADER.title}
          </h2>
          <p className="m-0 w-full max-w-[600px] whitespace-pre-line text-xl leading-[1.4] text-[var(--gray-400)]">
            {BACKUP_HEADER.desc}
          </p>
        </div>
      </div>

      <div ref={trackRef} className="relative min-[1280px]:h-[500vh]">
        <div
          ref={containerRef}
          className="relative mx-auto flex min-h-[640px] flex-col items-center justify-center gap-7 min-[1280px]:sticky min-[1280px]:top-0 min-[1280px]:h-screen min-[1280px]:gap-8"
        >
          <div
            ref={stageRef}
            className="relative mx-auto aspect-[16/10] w-full max-h-[min(58vh,560px)] max-w-[960px] overflow-hidden rounded-3xl border border-[var(--border)] bg-[#f5f5f7] bg-[url(/backup-scene-bg.png)] bg-cover bg-center bg-no-repeat shadow-[0_1px_2px_rgba(0,0,0,0.04),0_20px_60px_rgba(0,0,0,0.08)] min-[1280px]:max-h-[min(62vh,600px)]"
          >
            <canvas
              ref={canvasRef}
              id="backupCanvas"
              className={`absolute inset-0 block h-full w-full pointer-events-none opacity-0 transition-opacity duration-[600ms] ease${ready ? " opacity-100" : ""}`}
            />
            <PhoneScreenOverlay activeStep={activeStep} />
            {!ready && <BackupPreloader />}
          </div>

          <div className="relative h-24 w-full max-w-[640px] text-center">
            {BACKUP_STEPS.map((step, i) => (
              <div
                key={step.title}
                className={`absolute inset-0 flex flex-col items-center justify-start gap-2 opacity-0 translate-y-3 transition-[opacity,transform] duration-500 ease pointer-events-none${activeStep === i ? " opacity-100 translate-y-0" : ""}`}
                aria-hidden={activeStep !== i}
              >
                <p className="m-0 text-[clamp(22px,2.4vw,30px)] font-medium leading-[1.1] tracking-[-0.02em] text-[var(--fg)]">
                  {step.title}
                </p>
                {"desc" in step && step.desc && (
                  <p className="m-0 max-w-[44ch] text-[15px] leading-[1.5] text-[var(--gray-400)]">
                    {step.desc}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <p className="relative z-[2] mx-auto mt-[60px] max-w-[700px] text-center text-base leading-normal text-[rgba(17,17,17,0.55)] min-[976px]:mt-[100px]">
        {BACKUP_FOOTER}
      </p>
    </section>
  );
}
