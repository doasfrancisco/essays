import EssayView from "@/components/EssayView";
import { getEssay, getSection } from "@/content/essays";

export function generateStaticParams() {
  return getSection("essays")!.essays.map((essay) => ({ slug: essay.slug }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return { title: `${getEssay("essays", slug)?.title ?? "Not found"} - doasfrancisco` };
}

export default async function Page({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <EssayView sectionSlug="essays" essaySlug={slug} />;
}
