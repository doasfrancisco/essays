import { notFound } from "next/navigation";
import { getPage } from "@/content/essays";
import EssayBody from "./EssayBody";

export default function PageView({ slug }: { slug: string }) {
  const page = getPage(slug);
  if (!page) notFound();

  return (
    <article className="essay">
      <h1 className="essay-title">{page.title}</h1>
      <EssayBody blocks={page.body} />
    </article>
  );
}
