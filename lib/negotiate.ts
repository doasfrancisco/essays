const markdownTypes = ["text/markdown", "text/x-markdown"];

export function wantsMarkdown(accept: string | null) {
  if (!accept) return false;
  return accept
    .split(",")
    .map((part) => part.split(";")[0].trim().toLowerCase())
    .some((type) => markdownTypes.includes(type));
}

export function markdownPath(pathname: string) {
  if (pathname === "/md" || pathname.startsWith("/md/")) return pathname;
  if (pathname === "/") return "/md";
  return `/md${pathname.endsWith("/") ? pathname.slice(0, -1) : pathname}`;
}

export function isMarkdownCandidate(pathname: string) {
  if (pathname.startsWith("/_next") || pathname.startsWith("/md")) return false;
  const last = pathname.split("/").pop() ?? "";
  if (last.includes(".") && !last.endsWith(".md")) return false;
  return true;
}
