import TranslationView from "@/components/TranslationView";
import { getSection, getTranslation } from "@/content/essays";
import { excerpt } from "@/lib/markdown";

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
  const translation = getTranslation("essays", slug, lang);
  if (!translation) return { title: "Not found - doasfrancisco" };

  return {
    title: `${translation.title} - doasfrancisco`,
    description: excerpt(translation.body),
    alternates: { canonical: `/essays/${slug}/${lang}` },
    openGraph: {
      type: "article",
      title: translation.title,
      description: excerpt(translation.body),
      url: `/essays/${slug}/${lang}`,
      locale: lang === "es" ? "es_ES" : undefined
    }
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
