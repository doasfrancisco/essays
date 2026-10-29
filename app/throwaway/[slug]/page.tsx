import EssayView from "@/components/EssayView";
import { getEssay, getSection } from "@/content/essays";
import { excerpt } from "@/lib/markdown";
import { isoDate } from "@/lib/dates";

export function generateStaticParams() {
  return getSection("throwaway")!.essays.map((essay) => ({ slug: essay.slug }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const essay = getEssay("throwaway", slug);
  if (!essay) return { title: "Not found - doasfrancisco" };

  const published = isoDate(essay.date);
  return {
    title: `${essay.title} - doasfrancisco`,
    description: excerpt(essay.body),
    alternates: { canonical: `/throwaway/${essay.slug}` },
    openGraph: {
      type: "article",
      title: essay.title,
      description: excerpt(essay.body),
      url: `/throwaway/${essay.slug}`,
      ...(published ? { publishedTime: published } : {})
    }
  };
}

export default async function Page({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <EssayView sectionSlug="throwaway" essaySlug={slug} />;
}
