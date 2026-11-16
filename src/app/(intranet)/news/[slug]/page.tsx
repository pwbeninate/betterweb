import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { Tag } from "@/components/card";
import { news } from "@/lib/data/news";
import { formatDate } from "@/lib/format";

export function generateStaticParams() {
  return news.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/news/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  return { title: news.find((n) => n.slug === slug)?.title ?? "News" };
}

export default function NewsPostPage({ params }: PageProps<"/news/[slug]">) {
  return (
    <Suspense fallback={<p className="text-sm text-muted">Loading…</p>}>
      <Article params={params} />
    </Suspense>
  );
}

async function Article({
  params,
}: Pick<PageProps<"/news/[slug]">, "params">) {
  const { slug } = await params;
  const post = news.find((n) => n.slug === slug);
  if (!post) notFound();

  return (
    <article className="mx-auto max-w-2xl">
      <Link
        href="/news"
        className="text-sm font-medium text-brand hover:underline"
      >
        ← All news
      </Link>
      <div className="mt-6 flex flex-wrap items-center gap-2 text-xs text-muted">
        <Tag>{post.category}</Tag>
        <time dateTime={post.date}>{formatDate(post.date)}</time>
        <span>· {post.author}</span>
      </div>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight">
        {post.title}
      </h1>
      <p className="mt-4 text-lg text-muted">{post.summary}</p>
      <div className="mt-6 space-y-4 leading-7">
        {post.body.map((para) => (
          <p key={para}>{para}</p>
        ))}
      </div>
    </article>
  );
}
