import PageView from "@/components/PageView";
import { getPage } from "@/content/essays";

const page = getPage("contact")!;

export const metadata = {
  title: `${page.title} - doasfrancisco`,
  description: page.description,
  alternates: { canonical: "/contact" }
};

export default function Page() {
  return <PageView slug="contact" />;
}
