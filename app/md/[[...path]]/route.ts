import { pages, sections } from "@/content/essays";
import { site } from "@/content/site";
import { notFoundMarkdown, resolveMarkdown, type Catalog } from "@/lib/markdown";

export const dynamic = "force-dynamic";

const catalog: Catalog = { sections, pages, site };

const headers = {
  "Content-Type": "text/markdown; charset=utf-8",
  Vary: "Accept",
  "Cache-Control": "public, max-age=0, must-revalidate"
};

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ path?: string[] }> }
) {
  const { path } = await params;
  const pathname = `/${(path ?? []).join("/")}`;
  const body = resolveMarkdown(pathname, catalog);

  if (!body) {
    return new Response(notFoundMarkdown(pathname, site), { status: 404, headers });
  }

  return new Response(`${body}\n`, { status: 200, headers });
}
