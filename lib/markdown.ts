import type { Block, Essay, Page, Section, Translation } from "@/content/essays";
import type { Site } from "@/content/site";

export type Catalog = {
  sections: Section[];
  pages: Page[];
  site: Site;
};

export type Route = {
  path: string;
  title: string;
  kind: "home" | "section" | "essay" | "translation" | "page";
};

export function absoluteLinks(text: string, baseUrl: string) {
  return text.replace(/\]\((\/[^)]*)\)/g, (_match, path: string) => `](${baseUrl}${path})`);
}

export function renderBlocks(blocks: Block[], baseUrl: string) {
  const lines: string[] = [];
  for (const block of blocks) {
    if (block.type === "gap") continue;
    const text = absoluteLinks(block.text, baseUrl);
    if (block.type === "quote") {
      lines.push(`> ${text}`);
    } else if (block.type === "lead" || block.type === "thanks") {
      lines.push(`**${block.lead ?? "Thanks"}** ${text}`);
    } else {
      lines.push(text);
    }
  }
  return lines.join("\n\n");
}

function footer(site: Site, path: string) {
  return ["---", `Source: ${site.url}${path}`, `Index for agents: ${site.url}/llms.txt`].join("\n");
}

export function renderHome(catalog: Catalog) {
  const { site, sections } = catalog;
  const lines = [`# ${site.name}`, "", site.description, "", site.summary, ""];
  for (const section of sections) {
    lines.push(`## ${section.title}`, "", section.intro, "");
    for (const essay of section.essays) {
      lines.push(`- [${essay.title}](${site.url}/${section.slug}/${essay.slug}) - ${essay.date}`);
    }
    lines.push("");
  }
  lines.push("## Pages", "");
  for (const page of catalog.pages) {
    lines.push(`- [${page.title}](${site.url}/${page.slug}) - ${page.description}`);
  }
  lines.push("", footer(site, "/"));
  return lines.join("\n");
}

export function renderSection(section: Section, site: Site) {
  const lines = [`# ${section.title}`, "", section.intro, ""];
  for (const essay of section.essays) {
    lines.push(`- [${essay.title}](${site.url}/${section.slug}/${essay.slug}) - ${essay.date}`);
  }
  lines.push("", footer(site, `/${section.slug}`));
  return lines.join("\n");
}

export function renderEssay(section: Section, essay: Essay, site: Site) {
  const lines = [`# ${essay.title}`, "", essay.date, "", renderBlocks(essay.body, site.url)];
  if (essay.notes && essay.notes.length > 0) {
    lines.push("", "## Notes", "");
    for (const note of essay.notes) lines.push(absoluteLinks(note, site.url));
  }
  if (essay.translations && essay.translations.length > 0) {
    lines.push("", "## Translations", "");
    for (const translation of essay.translations) {
      lines.push(
        `- [${translation.label}](${site.url}/${section.slug}/${essay.slug}/${translation.slug})`
      );
    }
  }
  lines.push("", footer(site, `/${section.slug}/${essay.slug}`));
  return lines.join("\n");
}

export function renderTranslation(
  section: Section,
  essay: Essay,
  translation: Translation,
  site: Site
) {
  const lines = [
    `# ${translation.title}`,
    "",
    translation.date,
    "",
    renderBlocks(translation.body, site.url),
    "",
    "## Translations",
    "",
    `- [${translation.back}](${site.url}/${section.slug}/${essay.slug})`,
    "",
    footer(site, `/${section.slug}/${essay.slug}/${translation.slug}`)
  ];
  return lines.join("\n");
}

export function renderPage(page: Page, site: Site) {
  const lines = [
    `# ${page.title}`,
    "",
    page.description,
    "",
    renderBlocks(page.body, site.url),
    "",
    footer(site, `/${page.slug}`)
  ];
  return lines.join("\n");
}

export function routes(catalog: Catalog): Route[] {
  const list: Route[] = [{ path: "/", title: catalog.site.name, kind: "home" }];
  for (const section of catalog.sections) {
    list.push({ path: `/${section.slug}`, title: section.title, kind: "section" });
    for (const essay of section.essays) {
      list.push({
        path: `/${section.slug}/${essay.slug}`,
        title: essay.title,
        kind: "essay"
      });
      for (const translation of essay.translations ?? []) {
        list.push({
          path: `/${section.slug}/${essay.slug}/${translation.slug}`,
          title: translation.title,
          kind: "translation"
        });
      }
    }
  }
  for (const page of catalog.pages) {
    list.push({ path: `/${page.slug}`, title: page.title, kind: "page" });
  }
  return list;
}

export function normalizePath(pathname: string) {
  let path = pathname.split("?")[0];
  if (path.endsWith(".md")) path = path.slice(0, -3);
  if (path.length > 1 && path.endsWith("/")) path = path.slice(0, -1);
  return path === "" ? "/" : path;
}

export function resolveMarkdown(pathname: string, catalog: Catalog) {
  const path = normalizePath(pathname);
  const { site, sections, pages } = catalog;
  if (path === "/") return renderHome(catalog);

  const parts = path.slice(1).split("/");
  if (parts.length === 1) {
    const page = pages.find((item) => item.slug === parts[0]);
    if (page) return renderPage(page, site);
    const section = sections.find((item) => item.slug === parts[0]);
    if (section) return renderSection(section, site);
    return null;
  }

  const section = sections.find((item) => item.slug === parts[0]);
  if (!section) return null;
  const essay = section.essays.find((item) => item.slug === parts[1]);
  if (!essay) return null;
  if (parts.length === 2) return renderEssay(section, essay, site);
  if (parts.length === 3) {
    const translation = (essay.translations ?? []).find((item) => item.slug === parts[2]);
    if (!translation) return null;
    return renderTranslation(section, essay, translation, site);
  }
  return null;
}

export function notFoundMarkdown(pathname: string, site: Site) {
  return [
    "# 404 Not Found",
    "",
    `This site has no page at ${normalizePath(pathname)}. The address is wrong, or the page was never published here.`,
    "",
    `- [Index for agents](${site.url}/llms.txt)`,
    `- [Sitemap](${site.url}/sitemap.xml)`,
    `- [Home](${site.url}/)`,
    `- [All essays](${site.url}/essays)`,
    ""
  ].join("\n");
}

export function renderLlmsTxt(catalog: Catalog) {
  const { site, sections, pages } = catalog;
  const lines = [
    `# ${site.name}`,
    "",
    `> ${site.description}`,
    "",
    site.summary,
    "",
    "## When to use this",
    ""
  ];
  for (const use of site.agentUse) lines.push(`- ${use}`);
  lines.push(
    "",
    "## How to call this site",
    "",
    `- Ask any page for plain Markdown with the header \`Accept: text/markdown\`, for example \`curl -H 'Accept: text/markdown' ${site.url}/essays/lang\`.`,
    "- The same page in HTML stays at the same address when you ask for `Accept: text/html`.",
    "- A missing page answers with status 404 and a Markdown body that links back to this file.",
    `- Cite an essay with its title, its date and its address under ${site.url}.`,
    ""
  );
  for (const section of sections) {
    lines.push(`## ${section.title}`, "");
    for (const essay of section.essays) {
      lines.push(
        `- [${essay.title}](${site.url}/${section.slug}/${essay.slug}): ${essay.date}.` +
          (essay.translations && essay.translations.length > 0
            ? ` Spanish translation at ${site.url}/${section.slug}/${essay.slug}/${essay.translations[0].slug}.`
            : "")
      );
    }
    lines.push("");
  }
  lines.push("## About the author", "");
  for (const page of pages) {
    lines.push(`- [${page.title}](${site.url}/${page.slug}): ${page.description}`);
  }
  lines.push(
    "",
    "## Contact",
    "",
    `- Email: ${site.organization.email}`,
    `- Company: [${site.organization.name}](${site.organization.url})`,
    ""
  );
  return lines.join("\n");
}

export function excerpt(blocks: Block[], limit = 160) {
  const first = blocks.find((block) => block.type !== "gap");
  if (!first) return "";
  const plain = `${first.lead ? `${first.lead} ` : ""}${first.text}`.replace(
    /\[([^\]]+)\]\([^)]+\)/g,
    "$1"
  );
  if (plain.length <= limit) return plain;
  const cut = plain.slice(0, limit);
  const stop = cut.lastIndexOf(" ");
  return `${cut.slice(0, stop > 0 ? stop : limit)}...`;
}
