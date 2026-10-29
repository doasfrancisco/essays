import SectionList from "@/components/SectionList";
import { getSection } from "@/content/essays";
import { site } from "@/content/site";

const section = getSection("essays")!;

export const metadata = {
  title: `${section.title} - doasfrancisco`,
  description: `Essays by ${site.name} on programming language design, artificial intelligence and code understanding.`,
  alternates: { canonical: "/essays" }
};

export default function Page() {
  return <SectionList slug="essays" />;
}
