import PageView from "@/components/PageView";
import { getPage } from "@/content/essays";

const page = getPage("privacy")!;

export const metadata = {
  title: `${page.title} - doasfrancisco`,
  description: page.description,
  alternates: { canonical: "/privacy" }
};

export default function Page() {
  return <PageView slug="privacy" />;
}
