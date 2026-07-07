import { AI_LINKS } from "@/lib/links";

export function AiSection() {
  return (
    <section className="bg-[var(--surface)] py-20 text-[var(--fg)]">
      <div className="mx-auto w-full max-w-[1920px] px-[max(24px,calc((100vw-1440px)/2))] text-center">
        <h2 className="mx-auto max-w-3xl text-[clamp(36px,4.5vw,64px)] font-medium leading-[1.05] tracking-[-0.03em] text-black">
          Ask AI whether Sagenex is a good fit for your needs
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-[var(--gray-400)]">
          Research Sagenex wallet with AI to learn whether our security and
          usability fits your unique use cases
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {(Object.keys(AI_LINKS) as (keyof typeof AI_LINKS)[]).map((label) => (
            <a
              key={label}
              href={AI_LINKS[label]}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-[var(--gray-200)] bg-white px-6 py-3 text-sm font-medium text-black transition-colors hover:border-[var(--brand)] hover:text-[var(--brand)]"
            >
              {label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
