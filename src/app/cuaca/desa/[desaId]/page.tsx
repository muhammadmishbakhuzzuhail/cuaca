import CuacaClient from "@/app/_components/cuaca-client";

export default async function CuacaPage({
  params,
}: {
  params: Promise<{ desaId: string }>;
}) {
  const { desaId } = await params;
  return <CuacaClient paramsDesaId={desaId} />;
}
