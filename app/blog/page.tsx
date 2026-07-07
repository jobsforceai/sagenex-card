import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { BlogCard } from "@/components/blog/blog-card";
import { SiteFooter } from "@/components/landing/site-footer";
import { SiteHeader } from "@/components/landing/site-header";
import { fetchPublishedBlogs } from "@/lib/blogs";

export const metadata: Metadata = {
  title: "Blog — Sagenex Card",
  description: "Security insights, product updates, and guides from the Sagenex team.",
};

export default async function BlogIndexPage() {
  const blogs = await fetchPublishedBlogs();

  return (
    <>
      <SiteHeader />
      <main className="min-h-[70vh] bg-[var(--surface)] pt-28 pb-20">
        <div className="mx-auto w-full max-w-[1200px] px-6">
          <Link
            href="/"
            className="inline-flex min-h-[44px] items-center gap-2 text-sm font-medium text-[var(--fg-secondary)] transition-colors hover:text-[var(--brand)]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to home
          </Link>

          <header className="mt-6 max-w-2xl">
            <p className="m-0 mb-3 text-[0.8125rem] font-medium tracking-[0.14em] uppercase text-[var(--fg-tertiary)]">
              Blog
            </p>
            <h1 className="m-0 text-[clamp(2rem,4vw,3rem)] font-medium leading-[1.05] tracking-[-0.03em] text-[var(--fg)]">
              Latest from Sagenex
            </h1>
            <p className="mt-4 text-lg text-[var(--fg-secondary)]">
              Product news, security explainers, and how-to guides for your Global Pay Card.
            </p>
          </header>

          {blogs.length === 0 ? (
            <div className="mt-16 rounded-3xl border border-dashed border-[var(--border)] bg-[var(--gray-50)] px-6 py-16 text-center">
              <p className="text-lg font-medium text-[var(--fg)]">No articles yet</p>
              <p className="mt-2 text-sm text-[var(--fg-secondary)]">
                Check back soon for updates from the Sagenex team.
              </p>
            </div>
          ) : (
            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
              {blogs.map((blog, index) => (
                <BlogCard key={blog.id} blog={blog} featured={index === 0 && blogs.length > 2} />
              ))}
            </div>
          )}
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
