import { pages, sections } from "@/content/essays";
import { site } from "@/content/site";
import { isoDate } from "@/lib/dates";

function organization() {
  const node: Record<string, unknown> = {
    "@type": "Organization",
    "@id": `${site.organization.url}#organization`,
    name: site.organization.name,
    url: site.organization.url,
    sameAs: site.organization.sameAs,
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: site.organization.contactType,
        email: site.organization.email,
        availableLanguage: ["English", "Spanish"]
      }
    ]
  };
  if (site.organization.address) {
    node.address = { "@type": "PostalAddress", ...site.organization.address };
  }
  return node;
}

export default function StructuredData() {
  const essayList = sections.flatMap((section) =>
    section.essays.map((essay) => {
      const post: Record<string, unknown> = {
        "@type": "BlogPosting",
        "@id": `${site.url}/${section.slug}/${essay.slug}#post`,
        headline: essay.title,
        url: `${site.url}/${section.slug}/${essay.slug}`,
        inLanguage: "en",
        author: { "@id": `${site.url}#person` }
      };
      const iso = isoDate(essay.date);
      if (iso) post.datePublished = iso;
      return post;
    })
  );

  const graph = [
    {
      "@type": "WebSite",
      "@id": `${site.url}#website`,
      url: site.url,
      name: site.name,
      description: site.description,
      inLanguage: "en",
      publisher: { "@id": `${site.organization.url}#organization` },
      author: { "@id": `${site.url}#person` },
      hasPart: pages.map((page) => ({
        "@type": "WebPage",
        "@id": `${site.url}/${page.slug}#webpage`,
        url: `${site.url}/${page.slug}`,
        name: page.title,
        description: page.description
      }))
    },
    {
      "@type": "Person",
      "@id": `${site.url}#person`,
      name: site.author.name,
      url: site.author.url,
      description: site.description,
      sameAs: site.author.sameAs,
      worksFor: { "@id": `${site.organization.url}#organization` },
      knowsAbout: [
        "programming language design",
        "artificial intelligence",
        "software abstraction",
        "code comprehension"
      ]
    },
    organization(),
    {
      "@type": "Blog",
      "@id": `${site.url}#blog`,
      url: `${site.url}/essays`,
      name: "Essays",
      description: site.description,
      inLanguage: ["en", "es"],
      author: { "@id": `${site.url}#person` },
      blogPost: essayList
    }
  ];

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({ "@context": "https://schema.org", "@graph": graph })
      }}
    />
  );
}
