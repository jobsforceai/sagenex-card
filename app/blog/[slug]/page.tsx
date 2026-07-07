import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { SiteFooter } from "@/components/landing/site-footer";
import { SiteHeader } from "@/components/landing/site-header";
import {
  estimateReadMinutes,
  fetchPublishedBlog,
  fetchPublishedBlogs,
  formatBlogDate,
} from "@/lib/blogs";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const blogs = await fetchPublishedBlogs();
  return blogs.map((blog) => ({ slug: blog.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const blog = await fetchPublishedBlog(slug);
  if (!blog) return { title: "Article not found — Sagenex Card" };

  return {
    title: `${blog.title} — Sagenex Card`,
    description: blog.excerpt || blog.title,
    openGraph: blog.imageUrl
      ? {
          images: [{ url: blog.imageUrl }],
        }
      : undefined,
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const blog = await fetchPublishedBlog(slug);
  if (!blog) notFound();

  const date = formatBlogDate(blog.publishedAt || blog.createdAt);
  const readTime = estimateReadMinutes(blog.content);

  return (
    <>
      <SiteHeader />
      <main className="bg-[var(--surface)] pt-28 pb-20">
        <article className="mx-auto w-full max-w-[760px] px-6">
          <Link
            href="/blog"
            className="inline-flex min-h-[44px] items-center gap-2 text-sm font-medium text-[var(--fg-secondary)] transition-colors hover:text-[var(--brand)]"
          >
            <ArrowLeft className="h-4 w-4" />
            All articles
          </Link>

          <div className="mt-6 flex flex-wrap items-center gap-2 text-sm text-[var(--fg-tertiary)]">
            {blog.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-[var(--border)] bg-[var(--gray-50)] px-3 py-1 font-medium capitalize"
              >
                {tag}
              </span>
            ))}
            <span>{date}</span>
            <span aria-hidden>·</span>
            <span>{readTime} min read</span>
          </div>

          <h1 className="mt-5 text-[clamp(2rem,4.5vw,3rem)] font-medium leading-[1.08] tracking-[-0.03em] text-[var(--fg)]">
            {blog.title}
          </h1>

          {blog.excerpt ? (
            <p className="mt-4 text-lg leading-relaxed text-[var(--fg-secondary)]">
              {blog.excerpt}
            </p>
          ) : null}

          <div className="mt-6 flex items-center gap-3 border-b border-[var(--border)] pb-8">
            {blog.authorImageUrl ? (
              <Image
                src={blog.authorImageUrl}
                alt={blog.authorName || "Author"}
                width={44}
                height={44}
                className="h-11 w-11 rounded-full object-cover"
              />
            ) : (
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[var(--brand)]/10 text-sm font-semibold text-[var(--brand)]">
                {(blog.authorName || "S").charAt(0)}
              </span>
            )}
            <div>
              <p className="text-sm font-medium text-[var(--fg)]">
                {blog.authorName || "Sagenex Team"}
              </p>
              <p className="text-xs text-[var(--fg-tertiary)]">Published {date}</p>
            </div>
          </div>

          {blog.imageUrl ? (
            <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-3xl bg-[var(--gray-100)]">
              <Image
                src={blog.imageUrl}
                alt={blog.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 760px"
                priority
              />
            </div>
          ) : null}

          <div
            className="blog-prose mt-10"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
