import CuacaClient from "@/app/_components/cuaca-client";

export default function CuacaPage({ params }: { params: { desaId: string } }) {
   return <CuacaClient paramsDesaId={params.desaId} />;
}
