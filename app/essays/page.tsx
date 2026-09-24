import SectionList from "@/components/SectionList";
import { getSection } from "@/content/essays";

export const metadata = {
  title: `${getSection("essays")?.title} - doasfrancisco`
};

export default function Page() {
  return <SectionList slug="essays" />;
}
