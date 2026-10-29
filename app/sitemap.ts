import type { MetadataRoute } from "next";
import { pages, sections } from "@/content/essays";
import { site } from "@/content/site";
import { routes, type Catalog } from "@/lib/markdown";

const catalog: Catalog = { sections, pages, site };
const lastModified = new Date("2026-10-28");

export default function sitemap(): MetadataRoute.Sitemap {
  return routes(catalog).map((route) => ({
    url: `${site.url}${route.path}`,
    lastModified,
    changeFrequency: route.kind === "home" ? "weekly" : "monthly",
    priority: route.kind === "home" ? 1 : route.kind === "essay" ? 0.8 : 0.5
  }));
}
