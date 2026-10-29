import SectionList from "@/components/SectionList";
import { getSection } from "@/content/essays";
import { site } from "@/content/site";

const section = getSection("throwaway")!;

export const metadata = {
  title: `${section.title} - doasfrancisco`,
  description: `Writings by ${site.name} kept but not meant to be read.`,
  alternates: { canonical: "/throwaway" }
};

export default function Page() {
  return <SectionList slug="throwaway" />;
}
