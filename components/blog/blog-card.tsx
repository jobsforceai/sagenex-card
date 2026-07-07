import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Blog } from "@/lib/blogs";
import { estimateReadMinutes, formatBlogDate } from "@/lib/blogs";

type BlogCardProps = {
  blog: Blog;
  featured?: boolean;
};

export function BlogCard({ blog, featured = false }: BlogCardProps) {
  const date = formatBlogDate(blog.publishedAt || blog.createdAt);
  const readTime = estimateReadMinutes(blog.content);

  return (
    <Link
      href={`/blog/${blog.slug}`}
      className={`group relative flex h-full flex-col overflow-hidden rounded-3xl border border-[var(--border)] bg-white transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--brand)]/25 hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] ${
        featured ? "sm:col-span-2 sm:grid sm:grid-cols-2" : ""
      }`}
    >
      <div
        className={`relative overflow-hidden bg-[var(--gray-100)] ${
          featured ? "sm:min-h-full sm:rounded-none" : "aspect-[16/10]"
        }`}
      >
        {blog.imageUrl ? (
          <Image
            src={blog.imageUrl}
            alt={blog.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
            sizes={featured ? "(max-width: 640px) 100vw, 50vw" : "(max-width: 640px) 100vw, 33vw"}
          />
        ) : (
          <div className="absolute inset-0 bg-[linear-gradient(135deg,#f8f9fa_0%,#eceef2_50%,#e2e5ea_100%)]" />
        )}
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_55%,rgba(0,0,0,0.35)_100%)] sm:hidden" />
      </div>

      <div className={`flex flex-1 flex-col p-5 sm:p-6 ${featured ? "sm:justify-center" : ""}`}>
        <div className="flex flex-wrap items-center gap-2 text-xs text-[var(--fg-tertiary)]">
          {blog.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-[var(--border)] bg-[var(--gray-50)] px-2.5 py-1 font-medium capitalize"
            >
              {tag}
            </span>
          ))}
          <span>{date}</span>
          <span aria-hidden>·</span>
          <span>{readTime} min read</span>
        </div>

        <h3
          className={`mt-3 font-medium tracking-[-0.02em] text-[var(--fg)] ${
            featured ? "text-2xl sm:text-[1.75rem] sm:leading-tight" : "text-lg leading-snug"
          }`}
        >
          {blog.title}
        </h3>

        {blog.excerpt ? (
          <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-[var(--fg-secondary)]">
            {blog.excerpt}
          </p>
        ) : null}

        <div className="mt-auto flex items-center justify-between gap-3 pt-5">
          <div className="flex min-w-0 items-center gap-2.5">
            {blog.authorImageUrl ? (
              <Image
                src={blog.authorImageUrl}
                alt={blog.authorName || "Author"}
                width={32}
                height={32}
                className="h-8 w-8 shrink-0 rounded-full object-cover"
              />
            ) : (
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--brand)]/10 text-xs font-semibold text-[var(--brand)]">
                {(blog.authorName || "S").charAt(0)}
              </span>
            )}
            <span className="truncate text-sm font-medium text-[var(--fg)]">
              {blog.authorName || "Sagenex Team"}
            </span>
          </div>
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[var(--border)] text-[var(--fg-secondary)] transition-colors group-hover:border-[var(--brand)] group-hover:bg-[var(--brand)] group-hover:text-white">
            <ArrowUpRight className="h-4 w-4" />
          </span>
        </div>
      </div>
    </Link>
  );
}
