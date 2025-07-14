import { prisma } from "@/lib/prisma";

type Result = { kode: string; nama: string };

export const getListDesa = async (kecamatanId: string): Promise<Result[]> => {
   const data = await prisma.desa.findMany({
      select: {
         id: true,
         nama: true,
      },
      where: {
         kecamatanId: kecamatanId,
      },
   });

   return data.map((item) => ({
      kode: item.id,
      nama: item.nama,
   }));
};
