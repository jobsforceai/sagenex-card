export function CommunitySection() {
  const platforms = [
    { name: "X", count: "600K+ members" },
    { name: "Discord", count: "26K+ members" },
    { name: "Telegram", count: "120K+ members" },
    { name: "YouTube", count: "10K+ followers" },
    { name: "Reddit", count: "31K+ members" },
    { name: "Instagram", count: "26K+ followers" },
  ];

  return (
    <section className="border-t border-[var(--gray-200)] bg-[var(--surface)] py-24 text-[var(--fg)]">
      <div className="mx-auto w-full max-w-[1920px] px-[max(24px,calc((100vw-1440px)/2))] text-center">
        <h2 className="text-[clamp(36px,4.5vw,64px)] font-medium leading-[1.05] tracking-[-0.03em] text-black">
          Join our community
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-[var(--gray-400)]">
          Over 1,000,000 members across your favorite platforms. Connect with
          fellow users, ask questions and get support.
        </p>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {platforms.map((p) => (
            <a
              key={p.name}
              href="#"
              className="rounded-2xl border border-[var(--gray-200)] bg-white p-6 transition-all hover:border-[var(--brand)]/30 hover:shadow-md"
            >
              <p className="font-medium text-black">{p.name}</p>
              <p className="mt-1 text-sm text-[var(--gray-400)]">{p.count}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
