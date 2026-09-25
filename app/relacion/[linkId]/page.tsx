import RelationshipView from "./components/RelationshipView";

export default async function RelacionPage(props: {
  params: Promise<{ linkId: string }>;
}) {
  const { linkId } = await props.params;
  return <RelationshipView linkId={linkId} />;
}
