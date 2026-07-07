import Image from "next/image";

export function SiteFooter() {
  const cols = [
    {
      title: "Product",
      links: ["Overview", "Technology", "Security"],
    },
    {
      title: "Resources",
      links: ["Technology", "Security", "Blog", "Academy"],
    },
    {
      title: "Support",
      links: ["Help Center", "Contact", "Status", "GPSR"],
    },
    {
      title: "Legal",
      links: ["Terms of Use", "Privacy Policy", "Cookies"],
    },
  ];

  return (
    <footer className="border-t border-[var(--border)] bg-[var(--surface)] py-16 text-[var(--fg-secondary)]">
      <div className="mx-auto w-full max-w-[1920px] px-[max(24px,calc((100vw-1440px)/2))]">
        <div className="mb-12 flex flex-col justify-between gap-8 md:flex-row">
          <div>
            <div className="flex items-center gap-2">
              <Image
                src="/logo5.png"
                alt="Sagenex"
                width={28}
                height={28}
                className="h-7 w-7 object-contain"
              />
              <p className="text-2xl font-medium text-[var(--fg)]">sagenex</p>
            </div>
            <p className="mt-3 max-w-xs text-sm">
              Your secure crypto hardware wallet. Store, buy, earn, send, swap,
              and spend.
            </p>
          </div>
          <div className="flex gap-3">
            <div className="rounded-xl border border-[var(--border)] px-4 py-2 text-xs text-[var(--fg-secondary)]">
              App coming soon
            </div>
          </div>
        </div>

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {cols.map((col) => (
            <div key={col.title}>
              <p className="mb-4 text-sm font-medium text-[var(--fg)]">{col.title}</p>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href={link === "Blog" ? "/blog" : "#"}
                      className="text-sm hover:text-[var(--fg)]"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 border-t border-[var(--border)] pt-8 text-center text-xs">
          ©2026 Sagenex Limited. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
