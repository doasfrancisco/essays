import { notFound } from "next/navigation";
import { getEssay } from "@/content/essays";
import RichText from "./RichText";

export default function EssayView({
  sectionSlug,
  essaySlug
}: {
  sectionSlug: string;
  essaySlug: string;
}) {
  const essay = getEssay(sectionSlug, essaySlug);
  if (!essay) notFound();

  return (
    <article className="essay">
      <h1 className="essay-title">{essay.title}</h1>
      <p className="essay-date">{essay.date}</p>
      {essay.body.map((block, index) =>
        block.type === "quote" ? (
          <blockquote key={index} className="pullquote">
            <RichText text={block.text} />
          </blockquote>
        ) : block.type === "lead" ? (
          <p key={index}>
            <strong>{block.lead}</strong> <RichText text={block.text} />
          </p>
        ) : block.type === "thanks" ? (
          <p key={index} className="thanks">
            <strong>Thanks</strong> <RichText text={block.text} />
          </p>
        ) : (
          <p key={index}>
            <RichText text={block.text} />
          </p>
        )
      )}
      {essay.notes ? (
        <div className="notes">
          <p className="notes-title">Notes</p>
          {essay.notes.map((note, index) => (
            <p key={index}>{note}</p>
          ))}
        </div>
      ) : null}
    </article>
  );
}
