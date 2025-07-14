import { prisma } from "@/lib/prisma";

type Result = { kode: string; nama: string };

export const getListKota = async (provinsiId: string): Promise<Result[]> => {
   const data = await prisma.kota.findMany({
      select: {
         id: true,
         nama: true,
      },
      where: {
         provinsiId: provinsiId,
      },
   });

   return data.map((item) => ({
      kode: item.id,
      nama: item.nama,
   }));
};
