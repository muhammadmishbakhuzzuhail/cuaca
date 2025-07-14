import { prisma } from "@/lib/prisma";

type Result = { kode: string; nama: string };

export const getListKecamatan = async (kotaId: string): Promise<Result[]> => {
   const data = await prisma.kecamatan.findMany({
      select: {
         id: true,
         nama: true,
      },
      where: {
         kotaId: kotaId,
      },
   });

   return data.map((item) => ({
      kode: item.id,
      nama: item.nama,
   }));
};
