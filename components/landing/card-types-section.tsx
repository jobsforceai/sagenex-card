import Image from "next/image";
import { Check } from "lucide-react";
import { CARD_TYPES, CARD_TYPES_HEADER } from "@/lib/content";
import { APPLY_LABEL, APPLY_LINK_PROPS } from "@/lib/links";

export function CardTypesSection() {
  return (
    <section
      id="card-types"
      className="border-t border-[var(--border)] bg-[var(--surface)] py-16 text-[var(--fg)] sm:py-24"
    >
      <div className="mx-auto w-full max-w-[1080px] px-6">
        <header className="max-w-2xl">
          <p className="m-0 mb-3 text-[0.8125rem] font-medium tracking-[0.14em] uppercase text-[var(--fg-tertiary)]">
            {CARD_TYPES_HEADER.eyebrow}
          </p>
          <h2 className="m-0 text-[clamp(1.75rem,3.5vw,2.75rem)] font-medium leading-[1.08] tracking-[-0.03em] text-[var(--fg)]">
            {CARD_TYPES_HEADER.title}
          </h2>
          <p className="mt-3 text-base text-[var(--fg-secondary)]">
            {CARD_TYPES_HEADER.subtitle}{" "}
            <span className="text-[var(--fg)]">
              {CARD_TYPES_HEADER.minBalanceNote}.
            </span>
          </p>
        </header>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 sm:gap-6 lg:mt-12">
          {CARD_TYPES.map((card) => {
            const featured = "featured" in card && card.featured;
            return (
              <article
                key={card.id}
                className={`group relative flex flex-col overflow-hidden rounded-3xl border bg-[var(--surface)] transition-all duration-300 hover:-translate-y-0.5 ${
                  featured
                    ? "border-[var(--brand)]/25 shadow-[0_18px_50px_rgba(196,30,58,0.10)]"
                    : "border-[var(--border)] shadow-[0_14px_40px_rgba(0,0,0,0.05)]"
                }`}
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-[radial-gradient(120%_120%_at_50%_0%,#ffffff_0%,#f3f4f7_60%,#eceef2_100%)]">
                  <Image
                    src={card.image}
                    alt={card.imageAlt}
                    fill
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                    sizes="(max-width: 640px) 100vw, 520px"
                  />
                  {featured ? (
                    <span className="absolute top-4 right-4 rounded-full bg-[var(--brand)] px-2.5 py-1 text-[10px] font-semibold tracking-[0.08em] text-white uppercase">
                      Most popular
                    </span>
                  ) : null}
                </div>

                <div className="flex flex-1 flex-col p-6 sm:p-7">
                  <div className="flex items-baseline justify-between gap-3">
                    <h3 className="text-xl font-medium tracking-[-0.02em] text-[var(--fg)]">
                      {card.name}
                    </h3>
                    <div className="text-right leading-none">
                      <span className="text-xl font-medium tracking-[-0.02em] text-[var(--fg)]">
                        {card.feeLabel}
                      </span>
                    </div>
                  </div>
                  <p className="mt-1 text-[13px] text-[var(--fg-tertiary)]">
                    {card.feeNote} · ${card.minBalance} min. balance
                  </p>

                  <ul className="mt-5 space-y-2.5">
                    {card.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-2.5 text-sm leading-relaxed text-[var(--fg-secondary)]"
                      >
                        <Check
                          className="mt-1 h-3.5 w-3.5 shrink-0 text-[var(--brand)]"
                          strokeWidth={3}
                        />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <a
                    {...APPLY_LINK_PROPS}
                    className={`mt-6 inline-flex min-h-[46px] w-full items-center justify-center rounded-[14px] px-6 text-[15px] font-medium no-underline transition-[transform,filter,background] duration-200 hover:scale-[1.01] ${
                      featured
                        ? "border-0 text-white [background:linear-gradient(90deg,rgba(255,120,140,0)_0%,rgba(255,120,140,0.65)_100%),var(--brand)] hover:brightness-105"
                        : "border border-[var(--border)] bg-[var(--surface)] text-[var(--fg)] hover:border-[var(--brand)]/40 hover:text-[var(--brand)]"
                    }`}
                  >
                    {APPLY_LABEL}
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
