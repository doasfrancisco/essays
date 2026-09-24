import EssayView from "@/components/EssayView";
import { getEssay, getSection } from "@/content/essays";

export function generateStaticParams() {
  return getSection("throwaway")!.essays.map((essay) => ({ slug: essay.slug }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return { title: `${getEssay("throwaway", slug)?.title ?? "Not found"} - doasfrancisco` };
}

export default async function Page({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <EssayView sectionSlug="throwaway" essaySlug={slug} />;
}
