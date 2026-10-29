import test from "node:test";
import assert from "node:assert/strict";
import {
  absoluteLinks,
  excerpt,
  normalizePath,
  notFoundMarkdown,
  renderBlocks,
  renderLlmsTxt,
  resolveMarkdown,
  routes
} from "../lib/markdown.ts";

const site = {
  url: "https://example.com",
  name: "example",
  title: "example - title",
  description: "A description of the site.",
  summary: "A longer summary of the site.",
  locale: "en_US",
  author: { name: "example", url: "https://example.com", sameAs: ["https://example.org/"] },
  organization: {
    name: "Org",
    url: "https://org.example/",
    email: "hello@org.example",
    contactType: "customer support",
    sameAs: ["https://org.example/in"],
    address: null
  },
  agentUse: ["Use it to quote an essay."]
};

const translation = {
  slug: "es",
  label: "Spanish Translation",
  back: "English Translation",
  title: "Primer ensayo",
  date: "Enero de 2026",
  body: [{ type: "p" as const, text: "Hola." }]
};

const essay = {
  slug: "first",
  title: "First Essay",
  date: "January 2026",
  body: [
    { type: "p" as const, text: "An opening line with a [link](/essays/first) inside it." },
    { type: "gap" as const, text: "" },
    { type: "quote" as const, text: "A quoted line." },
    { type: "thanks" as const, lead: "Thanks", text: "to the readers." }
  ],
  notes: ["One note."],
  translations: [translation]
};

const sections = [
  {
    slug: "essays" as const,
    label: "Essays",
    title: "Essays",
    intro: "If you're not sure which to read, try",
    introLinks: true,
    essays: [essay]
  },
  {
    slug: "throwaway" as const,
    label: "Throwaway",
    title: "Throwaway",
    intro: "Writings not meant to be read but kept anyway.",
    introLinks: false,
    essays: []
  }
];

const pages = [
  {
    slug: "about",
    title: "About",
    description: "Who writes the site.",
    body: [{ type: "p" as const, text: "About the site and its [contact](/contact) page." }]
  }
];

const catalog = { sections, pages, site };

test("a site relative link becomes absolute", () => {
  assert.equal(
    absoluteLinks("read [this](/essays/first) now", site.url),
    "read [this](https://example.com/essays/first) now"
  );
  assert.equal(
    absoluteLinks("read [this](https://other.example/x)", site.url),
    "read [this](https://other.example/x)"
  );
});

test("blocks render as markdown and a gap is dropped", () => {
  const out = renderBlocks(essay.body, site.url);
  assert.ok(out.includes("[link](https://example.com/essays/first)"));
  assert.ok(out.includes("> A quoted line."));
  assert.ok(out.includes("**Thanks** to the readers."));
  assert.ok(!out.includes("\n\n\n"));
});

test("a path is normalized before it is resolved", () => {
  assert.equal(normalizePath("/essays/first.md"), "/essays/first");
  assert.equal(normalizePath("/essays/"), "/essays");
  assert.equal(normalizePath("/"), "/");
});

test("the home path gives the home markdown", () => {
  const out = resolveMarkdown("/", catalog);
  assert.ok(out);
  assert.ok(out.startsWith("# example"));
  assert.ok(out.includes("## Essays"));
  assert.ok(out.includes("- [First Essay](https://example.com/essays/first) - January 2026"));
  assert.ok(out.includes("Index for agents: https://example.com/llms.txt"));
});

test("a section, an essay, a translation and a page each give markdown", () => {
  assert.ok(resolveMarkdown("/essays", catalog)?.startsWith("# Essays"));
  const one = resolveMarkdown("/essays/first", catalog);
  assert.ok(one?.includes("# First Essay"));
  assert.ok(one?.includes("## Notes"));
  assert.ok(one?.includes("## Translations"));
  assert.ok(resolveMarkdown("/essays/first/es", catalog)?.includes("# Primer ensayo"));
  assert.ok(resolveMarkdown("/about", catalog)?.includes("# About"));
  assert.ok(resolveMarkdown("/essays/first.md", catalog)?.includes("# First Essay"));
});

test("an unknown path resolves to nothing", () => {
  assert.equal(resolveMarkdown("/nothing", catalog), null);
  assert.equal(resolveMarkdown("/essays/nothing", catalog), null);
  assert.equal(resolveMarkdown("/essays/first/fr", catalog), null);
  assert.equal(resolveMarkdown("/essays/first/es/more", catalog), null);
});

test("the markdown of a missing page explains the error and links the index", () => {
  const out = notFoundMarkdown("/__probe", site);
  assert.ok(out.startsWith("# 404 Not Found"));
  assert.ok(out.length > 20);
  assert.ok(out.includes("https://example.com/llms.txt"));
  assert.ok(out.includes("https://example.com/sitemap.xml"));
});

test("llms.txt says when to use the site and how to call it", () => {
  const out = renderLlmsTxt(catalog);
  assert.ok(out.includes("## When to use this"));
  assert.ok(out.includes("- Use it to quote an essay."));
  assert.ok(out.includes("Accept: text/markdown"));
  assert.ok(out.includes("hello@org.example"));
  assert.ok(out.includes("https://example.com/essays/first"));
});

test("the route list holds every page once", () => {
  const list = routes(catalog).map((route) => route.path);
  assert.deepEqual(list, [
    "/",
    "/essays",
    "/essays/first",
    "/essays/first/es",
    "/throwaway",
    "/about"
  ]);
});

test("the excerpt of a body drops the link marks and keeps the words", () => {
  assert.equal(
    excerpt(essay.body, 200),
    "An opening line with a link inside it."
  );
  assert.ok(excerpt(essay.body, 20).endsWith("..."));
  assert.equal(excerpt([{ type: "gap", text: "" }]), "");
});
