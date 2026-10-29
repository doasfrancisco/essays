import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import Shell from "@/components/Shell";
import StructuredData from "@/components/StructuredData";
import { site } from "@/content/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.title,
    template: "%s"
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.author.name, url: site.author.url }],
  creator: site.author.name,
  publisher: site.organization.name,
  keywords: [
    "doasfrancisco",
    "doasfrancisco essays",
    "programming languages",
    "programming language design",
    "artificial intelligence",
    "code understanding"
  ],
  alternates: { canonical: "./" },
  openGraph: {
    type: "website",
    url: site.url,
    siteName: site.name,
    title: site.title,
    description: site.description,
    locale: site.locale
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description
  },
  robots: { index: true, follow: true }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Shell>{children}</Shell>
        <StructuredData />
        <Analytics />
      </body>
    </html>
  );
}
