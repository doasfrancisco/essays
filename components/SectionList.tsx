import Link from "next/link";
import { notFound } from "next/navigation";
import { getSection } from "@/content/essays";

export default function SectionList({ slug }: { slug: string }) {
  const section = getSection(slug);
  if (!section) notFound();

  const picks = section.essays.slice(0, 3);

  return (
    <>
      <h1 className="page-title">{section.title}</h1>
      {section.intro ? (
        <p className="section-intro">
          {section.intro}
          {section.introLinks ? (
            <>
              {" "}
              {picks.map((essay, index) => (
                <span key={essay.slug}>
                  {index > 0 ? (index === picks.length - 1 ? ", or " : ", ") : ""}
                  <Link href={`/${section.slug}/${essay.slug}`}>{essay.title}</Link>
                </span>
              ))}
              .
            </>
          ) : null}
        </p>
      ) : null}
      <ul className="essay-list">
        {section.essays.map((essay) => (
          <li key={essay.slug}>
            <Link href={`/${section.slug}/${essay.slug}`}>{essay.title}</Link>
          </li>
        ))}
      </ul>
    </>
  );
}
