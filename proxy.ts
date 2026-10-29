import { NextResponse, type NextRequest } from "next/server";
import { isMarkdownCandidate, markdownPath, wantsMarkdown } from "@/lib/negotiate";

export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (wantsMarkdown(request.headers.get("accept")) && isMarkdownCandidate(pathname)) {
    const url = request.nextUrl.clone();
    url.pathname = markdownPath(pathname);
    const rewrite = NextResponse.rewrite(url);
    rewrite.headers.set("Vary", "Accept");
    return rewrite;
  }

  const response = NextResponse.next();
  response.headers.append("Vary", "Accept");
  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image).*)"]
};
