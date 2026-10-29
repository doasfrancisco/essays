import PageView from "@/components/PageView";
import { getPage } from "@/content/essays";

const page = getPage("about")!;

export const metadata = {
  title: `${page.title} - doasfrancisco`,
  description: page.description,
  alternates: { canonical: "/about" }
};

export default function Page() {
  return <PageView slug="about" />;
}
