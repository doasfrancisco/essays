import { pages, sections } from "@/content/essays";
import { site } from "@/content/site";
import { renderLlmsTxt, type Catalog } from "@/lib/markdown";

const catalog: Catalog = { sections, pages, site };

export function GET() {
  return new Response(renderLlmsTxt(catalog), {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=0, must-revalidate"
    }
  });
}
