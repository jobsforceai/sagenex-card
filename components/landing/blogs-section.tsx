import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Blog } from "@/lib/blogs";
import {
  estimateReadMinutes,
  fetchPublishedBlogs,
  formatBlogDate,
  stripHtmlPreview,
} from "@/lib/blogs";

function AuthorRow({ blog }: { blog: Blog }) {
  const date = formatBlogDate(blog.publishedAt || blog.createdAt);

  return (
    <div className="flex items-center gap-3">
      {blog.authorImageUrl ? (
        <Image
          src={blog.authorImageUrl}
          alt={blog.authorName || "Author"}
          width={36}
          height={36}
          className="h-9 w-9 shrink-0 rounded-full object-cover ring-2 ring-white"
        />
      ) : (
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--gray-100)] text-xs font-semibold text-[var(--brand)]">
          {(blog.authorName || "S").charAt(0)}
        </span>
      )}
      <div className="min-w-0 text-sm leading-tight">
        <p className="truncate font-medium text-[var(--fg)]">
          {blog.authorName || "Sagenex Team"}
        </p>
        <p className="mt-0.5 text-xs text-[var(--fg-tertiary)]">
          {date}
          <span aria-hidden className="mx-1.5">
            ·
          </span>
          {estimateReadMinutes(blog.content)} min read
        </p>
      </div>
    </div>
  );
}

function FeaturedPost({ blog }: { blog: Blog }) {
  const preview = blog.excerpt || stripHtmlPreview(blog.content, 220);

  return (
    <Link
      href={`/blog/${blog.slug}`}
      className="group grid gap-8 border-b border-[var(--border)] pb-10 sm:grid-cols-[1.05fr_1fr] sm:gap-10 sm:pb-12 lg:gap-14"
    >
      <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-[var(--gray-100)] sm:aspect-[4/3]">
        {blog.imageUrl ? (
          <Image
            src={blog.imageUrl}
            alt={blog.title}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            sizes="(max-width: 640px) 100vw, 50vw"
            priority
          />
        ) : (
          <div className="absolute inset-0 bg-[linear-gradient(145deg,#f4f5f7_0%,#e8eaef_100%)]" />
        )}
      </div>

      <div className="flex flex-col justify-center">
        {blog.tags[0] ? (
          <span className="mb-4 w-fit text-[11px] font-semibold tracking-[0.12em] text-[var(--brand)] uppercase">
            {blog.tags[0]}
          </span>
        ) : null}

        <h3 className="text-[clamp(1.5rem,2.8vw,2rem)] font-medium leading-[1.12] tracking-[-0.03em] text-[var(--fg)] transition-colors group-hover:text-[var(--brand)]">
          {blog.title}
        </h3>

        <p className="mt-4 text-[15px] leading-[1.7] text-[var(--fg-secondary)]">
          {preview}
        </p>

        <div className="mt-7 flex flex-wrap items-center justify-between gap-4">
          <AuthorRow blog={blog} />
          <span className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--fg)] transition-colors group-hover:text-[var(--brand)]">
            Read article
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </span>
        </div>
      </div>
    </Link>
  );
}

function CompactPost({ blog }: { blog: Blog }) {
  const preview = stripHtmlPreview(blog.content, 120);

  return (
    <Link
      href={`/blog/${blog.slug}`}
      className="group grid gap-5 border-b border-[var(--border)] py-8 last:border-b-0 last:pb-0 sm:grid-cols-[140px_1fr] sm:items-center sm:gap-8"
    >
      <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-[var(--gray-100)] sm:aspect-square sm:h-[108px] sm:w-[108px]">
        {blog.imageUrl ? (
          <Image
            src={blog.imageUrl}
            alt={blog.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
            sizes="108px"
          />
        ) : (
          <div className="absolute inset-0 bg-[var(--gray-100)]" />
        )}
      </div>

      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[var(--fg-tertiary)]">
          {blog.tags[0] ? (
            <span className="font-semibold tracking-[0.08em] text-[var(--brand)] uppercase">
              {blog.tags[0]}
            </span>
          ) : null}
          <span>{formatBlogDate(blog.publishedAt || blog.createdAt)}</span>
        </div>

        <h3 className="mt-2 text-lg font-medium leading-snug tracking-[-0.02em] text-[var(--fg)] transition-colors group-hover:text-[var(--brand)]">
          {blog.title}
        </h3>

        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-[var(--fg-secondary)]">
          {blog.excerpt || preview}
        </p>

        <div className="mt-4">
          <AuthorRow blog={blog} />
        </div>
      </div>
    </Link>
  );
}

export async function BlogsSection() {
  const blogs = await fetchPublishedBlogs();

  if (blogs.length === 0) return null;

  const [featured, ...rest] = blogs;

  return (
    <section id="blog" className="border-t border-[var(--border)] bg-[var(--surface)] py-16 sm:py-24">
      <div className="mx-auto w-full max-w-[920px] px-6">
        <header className="mb-10 flex flex-wrap items-end justify-between gap-4 sm:mb-12">
          <div>
            <p className="m-0 mb-2 text-[0.8125rem] font-medium tracking-[0.14em] uppercase text-[var(--fg-tertiary)]">
              Journal
            </p>
            <h2 className="m-0 text-[clamp(1.75rem,3vw,2.25rem)] font-medium leading-[1.1] tracking-[-0.03em] text-[var(--fg)]">
              Latest from Sagenex
            </h2>
          </div>
          <Link
            href="/blog"
            className="inline-flex min-h-[44px] items-center gap-1.5 text-sm font-medium text-[var(--fg-secondary)] transition-colors hover:text-[var(--brand)]"
          >
            View all
            <ArrowRight className="h-4 w-4" />
          </Link>
        </header>

        <FeaturedPost blog={featured} />

        {rest.length > 0 ? (
          <div className="mt-2">
            {rest.slice(0, 3).map((blog) => (
              <CompactPost key={blog.id} blog={blog} />
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
