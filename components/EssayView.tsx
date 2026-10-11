import { notFound } from "next/navigation";
import { getEssay } from "@/content/essays";
import EssayBody from "./EssayBody";
import Translations from "./Translations";

export default function EssayView({
  sectionSlug,
  essaySlug
}: {
  sectionSlug: string;
  essaySlug: string;
}) {
  const essay = getEssay(sectionSlug, essaySlug);
  if (!essay) notFound();

  const translations = (essay.translations ?? []).map((translation) => ({
    href: `/${sectionSlug}/${essaySlug}/${translation.slug}`,
    label: translation.label
  }));

  return (
    <article className="essay">
      <h1 className="essay-title">{essay.title}</h1>
      <p className="essay-date">{essay.date}</p>
      <EssayBody blocks={essay.body} />
      {essay.notes ? (
        <div className="notes">
          <p className="notes-title">Notes</p>
          {essay.notes.map((note, index) => (
            <p key={index}>{note}</p>
          ))}
        </div>
      ) : null}
      <Translations items={translations} />
    </article>
  );
}
