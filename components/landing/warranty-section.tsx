import Image from "next/image";
import { ASSETS } from "@/lib/assets";

export function WarrantySection() {
  return (
    <section className="border-t border-[var(--border)] bg-[var(--surface)] py-24 text-[var(--fg)]">
      <div className="mx-auto grid w-full max-w-[1920px] items-center gap-12 px-[max(24px,calc((100vw-1440px)/2))] lg:grid-cols-2">
        <div>
          <h2 className="whitespace-pre-line text-[clamp(36px,4.5vw,64px)] font-medium leading-[1.05] tracking-[-0.03em] text-black">
            {"25-year limited\nhardware warranty"}
          </h2>
          <p className="mt-6 text-lg text-[var(--fg-secondary)]">
            Your Sagenex hardware wallet can last for at least 25 years with
            proper care. Its unitary design ensures the chip remains functional,
            even in extreme conditions.
          </p>
          <ul className="mt-8 space-y-4 text-[15px] text-[var(--fg-secondary)]">
            <li>Just a chip with an antenna. No fragile components prone to failure.</li>
            <li>Hazard protection. Resistant to X-rays, electromagnetic pulses.</li>
            <li>IP69K. Fully waterproof and pressure-resistant.</li>
            <li>–25° to 50°C. Resistant to freezing cold and blazing heat.</li>
          </ul>
        </div>
        <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--card-radius)] shadow-lg">
          <Image
            src={ASSETS.warranty}
            alt="Sagenex wallet warranty"
            fill
            className="object-cover"
            sizes="50vw"
          />
        </div>
      </div>
    </section>
  );
}
