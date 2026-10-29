import test from "node:test";
import assert from "node:assert/strict";
import { isMarkdownCandidate, markdownPath, wantsMarkdown } from "../lib/negotiate.ts";

test("an accept header that asks for markdown is seen", () => {
  assert.equal(wantsMarkdown("text/markdown"), true);
  assert.equal(wantsMarkdown("text/markdown; charset=utf-8"), true);
  assert.equal(wantsMarkdown("text/x-markdown"), true);
  assert.equal(wantsMarkdown("text/html,text/markdown;q=0.9"), true);
  assert.equal(wantsMarkdown("TEXT/MARKDOWN"), true);
});

test("an accept header that asks for html keeps html", () => {
  assert.equal(wantsMarkdown("text/html"), false);
  assert.equal(wantsMarkdown("text/html,application/xhtml+xml,*/*;q=0.8"), false);
  assert.equal(wantsMarkdown("*/*"), false);
  assert.equal(wantsMarkdown(null), false);
  assert.equal(wantsMarkdown(""), false);
});

test("a path gets its markdown twin", () => {
  assert.equal(markdownPath("/"), "/md");
  assert.equal(markdownPath("/essays"), "/md/essays");
  assert.equal(markdownPath("/essays/lang/"), "/md/essays/lang");
  assert.equal(markdownPath("/md/essays"), "/md/essays");
});

test("only a page path is a candidate for markdown", () => {
  assert.equal(isMarkdownCandidate("/"), true);
  assert.equal(isMarkdownCandidate("/essays/lang"), true);
  assert.equal(isMarkdownCandidate("/essays/lang.md"), true);
  assert.equal(isMarkdownCandidate("/sitemap.xml"), false);
  assert.equal(isMarkdownCandidate("/llms.txt"), false);
  assert.equal(isMarkdownCandidate("/logo.svg"), false);
  assert.equal(isMarkdownCandidate("/_next/static/x.js"), false);
  assert.equal(isMarkdownCandidate("/md/essays"), false);
});
