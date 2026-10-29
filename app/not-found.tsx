import Link from "next/link";
import { site } from "@/content/site";

export const metadata = {
  title: "Not found - doasfrancisco",
  robots: { index: false, follow: true }
};

export default function NotFound() {
  return (
    <article className="essay">
      <h1 className="essay-title">Not found</h1>
      <p>This site has no page at that address.</p>
      <p>
        Read the <Link href="/essays">essays</Link>, the{" "}
        <Link href="/throwaway">throwaway writings</Link>, or go back to the{" "}
        <Link href="/">home page</Link>. An agent can read{" "}
        <a href="/llms.txt">/llms.txt</a> or <a href="/sitemap.xml">/sitemap.xml</a> to see every
        page of {site.name}.
      </p>
    </article>
  );
}
