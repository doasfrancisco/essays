import TranslationView from "@/components/TranslationView";
import { getSection, getTranslation } from "@/content/essays";

export function generateStaticParams() {
  return getSection("essays")!.essays.flatMap((essay) =>
    (essay.translations ?? []).map((translation) => ({
      slug: essay.slug,
      lang: translation.slug
    }))
  );
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string; lang: string }>;
}) {
  const { slug, lang } = await params;
  return {
    title: `${getTranslation("essays", slug, lang)?.title ?? "Not found"} - doasfrancisco`
  };
}

export default async function Page({
  params
}: {
  params: Promise<{ slug: string; lang: string }>;
}) {
  const { slug, lang } = await params;
  return <TranslationView sectionSlug="essays" essaySlug={slug} lang={lang} />;
}
