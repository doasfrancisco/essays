import { notFound } from "next/navigation";
import { getTranslation } from "@/content/essays";
import EssayBody from "./EssayBody";
import Translations from "./Translations";

export default function TranslationView({
  sectionSlug,
  essaySlug,
  lang
}: {
  sectionSlug: string;
  essaySlug: string;
  lang: string;
}) {
  const translation = getTranslation(sectionSlug, essaySlug, lang);
  if (!translation) notFound();

  return (
    <article className="essay">
      <h1 className="essay-title">{translation.title}</h1>
      <p className="essay-date">{translation.date}</p>
      <EssayBody blocks={translation.body} />
      <Translations
        items={[{ href: `/${sectionSlug}/${essaySlug}`, label: translation.back }]}
      />
    </article>
  );
}
