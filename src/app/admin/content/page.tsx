import { getContentMap } from "@/actions/content";
import ContentClient from "./ContentClient";

export const dynamic = "force-dynamic";

export default async function SiteContentPage() {
  const contentMap = await getContentMap();

  return <ContentClient initialContentMap={contentMap} />;
}
