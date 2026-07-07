import { getApiV1BaseUrl } from "./api-base";

export type Blog = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  imageUrl: string;
  authorName: string;
  authorImageUrl: string;
  tags: string[];
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
};

type BlogsResponse = { blogs: Blog[] };
type BlogResponse = { blog: Blog };

const blogsUrl = () => `${getApiV1BaseUrl()}/blogs`;

export async function fetchPublishedBlogs(): Promise<Blog[]> {
  try {
    const res = await fetch(blogsUrl(), { next: { revalidate: 60 } });
    if (!res.ok) return [];
    const data = (await res.json()) as BlogsResponse;
    return data.blogs ?? [];
  } catch {
    return [];
  }
}

export async function fetchPublishedBlog(slug: string): Promise<Blog | null> {
  try {
    const res = await fetch(`${blogsUrl()}/${encodeURIComponent(slug)}`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return null;
    const data = (await res.json()) as BlogResponse;
    return data.blog ?? null;
  } catch {
    return null;
  }
}

export function formatBlogDate(iso: string | null) {
  if (!iso) return "";
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(iso));
}

export function estimateReadMinutes(html: string) {
  const text = html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  const words = text ? text.split(" ").length : 0;
  return Math.max(1, Math.ceil(words / 200));
}

export function stripHtmlPreview(html: string, maxLength = 180) {
  const text = html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  if (!text) return "";
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength).replace(/\s+\S*$/, "")}…`;
}
