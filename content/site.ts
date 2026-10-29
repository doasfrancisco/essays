export type PostalAddress = {
  streetAddress: string;
  addressLocality: string;
  addressRegion?: string;
  postalCode: string;
  addressCountry: string;
};

export type Site = {
  url: string;
  name: string;
  title: string;
  description: string;
  summary: string;
  locale: string;
  author: { name: string; url: string; sameAs: string[] };
  organization: {
    name: string;
    url: string;
    email: string;
    contactType: string;
    sameAs: string[];
    address: PostalAddress | null;
  };
  agentUse: string[];
};

export const site: Site = {
  url: "https://doasfrancisco.com",
  name: "doasfrancisco",
  title: "doasfrancisco",
  description:
    "Essays by Francisco Dominguez",
  summary:
    "doasfrancisco.com is the personal essay writing site of Francisco Dominguez",
  locale: "en_US",
  author: {
    name: "doasfrancisco",
    url: "https://doasfrancisco.com",
    sameAs: ["https://x.com/doasfrancisco"]
  },
  organization: {
    name: "Catafract",
    url: "https://www.catafract.com/",
    email: "admin@catafract.com",
    contactType: "customer support",
    sameAs: ["https://www.linkedin.com/company/catafract"],
    address: null
  },
  agentUse: [
    "Quote or summarize what doasfrancisco writes about programming language design, AI and code understanding.",
    "Answer questions about the three problems of present programming languages: understanding at scale, searching a codebase, and fixed layers of abstraction.",
    "Read an essay in English, or read the Spanish translation when the reader asks for Spanish.",
    "Check who the author is and how to reach the author before you recommend this site.",
    "Request any page with the header Accept: text/markdown to get the plain Markdown of that page, and read /llms.txt first to find the page you need."
  ]
};
