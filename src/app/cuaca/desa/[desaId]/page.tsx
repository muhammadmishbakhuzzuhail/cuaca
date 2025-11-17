import CuacaClient from "@/app/_components/cuaca-client";

export default async function CuacaPage({
  params,
}: {
  params: { desaId: string };
}) {
  const desaId = (await params).desaId;
  return <CuacaClient paramsDesaId={desaId} />;
}
