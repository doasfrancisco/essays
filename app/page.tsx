import Link from "next/link";
import { pages, sections } from "@/content/essays";
import { site } from "@/content/site";

export const metadata = {
  title: site.title,
  description: site.description,
  alternates: { canonical: "/" }
};

export default function HomePage() {
  const recent = sections[0].essays.slice(0, 2);

  return (
    <>
      <h1 className="visually-hidden">{site.name}</h1>
      <div className="banner banner-new">
        <strong>New:</strong>{" "}
        {recent.map((essay, index) => (
          <span key={essay.slug}>
            {index > 0 ? " | " : ""}
            <Link href={`/essays/${essay.slug}`}>{essay.title}</Link>
          </span>
        ))}
      </div>
      <div className="banner banner-alt">
        <strong>Want to work together?</strong>{" "}
        <a href="https://www.catafract.com/">Check Catafract.</a>
      </div>
      <section className="visually-hidden">
        <h2>{site.title}</h2>
        <p>{site.description}</p>
        <p>{site.summary}</p>
        {sections.map((section) => (
          <div key={section.slug}>
            <h3>{section.title}</h3>
            <p>{section.intro}</p>
            <ul>
              {section.essays.map((essay) => (
                <li key={essay.slug}>
                  <Link href={`/${section.slug}/${essay.slug}`}>{essay.title}</Link>, {essay.date}
                </li>
              ))}
            </ul>
          </div>
        ))}
        <h3>Pages</h3>
        <ul>
          {pages.map((page) => (
            <li key={page.slug}>
              <Link href={`/${page.slug}`}>{page.title}</Link>, {page.description}
            </li>
          ))}
        </ul>
        <p>
          Agents can read every page as Markdown with the header Accept: text/markdown, and{" "}
          <a href="/llms.txt">/llms.txt</a> lists what this site is for.
        </p>
      </section>
    </>
  );
}
