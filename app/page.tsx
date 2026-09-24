import Link from "next/link";
import { sections } from "@/content/essays";

export default function HomePage() {
  const recent = sections[0].essays.slice(0, 2);

  return (
    <>
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
    </>
  );
}
