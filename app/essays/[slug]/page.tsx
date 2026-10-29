import EssayView from "@/components/EssayView";
import { getEssay, getSection } from "@/content/essays";
import { excerpt } from "@/lib/markdown";
import { isoDate } from "@/lib/dates";

export function generateStaticParams() {
  return getSection("essays")!.essays.map((essay) => ({ slug: essay.slug }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const essay = getEssay("essays", slug);
  if (!essay) return { title: "Not found - doasfrancisco" };

  const published = isoDate(essay.date);
  return {
    title: `${essay.title} - doasfrancisco`,
    description: excerpt(essay.body),
    alternates: {
      canonical: `/essays/${essay.slug}`,
      languages: Object.fromEntries(
        (essay.translations ?? []).map((translation) => [
          translation.slug,
          `/essays/${essay.slug}/${translation.slug}`
        ])
      )
    },
    openGraph: {
      type: "article",
      title: essay.title,
      description: excerpt(essay.body),
      url: `/essays/${essay.slug}`,
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
  return <EssayView sectionSlug="essays" essaySlug={slug} />;
}
