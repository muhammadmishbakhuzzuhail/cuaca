import { prisma } from "@/lib/prisma";

type Result = { kode: string; nama: string };

export const getListProvinsi = async (): Promise<Result[]> => {
   const data = await prisma.provinsi.findMany({
      select: {
         id: true,
         nama: true,
      },
   });

   return data.map((item) => ({
      kode: item.id,
      nama: item.nama,
   }));
};
