import { prisma } from "@/lib/prisma";
import { Desa } from "@/types/data";

export const getDesaByKecamatanId = async (kecamatanId: string): Promise<Desa[]> => {
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
      desaId: item.id,
      nama: item.nama,
   }));
};

export const countDesa = async () => {
   return await prisma.desa.count();
};

export const getDesaByPageAndLimit = async (
   page: number,
   limit: number
): Promise<Pick<Desa, "desaId">[]> => {
   const data = await prisma.desa.findMany({
      skip: (page - 1) * limit,
      take: limit,
   });

   return data.map((item) => ({
      desaId: item.id,
   }));
};

export const getDesaByInput = async (
   input: string
): Promise<{ desaId: string; namaDesa: string }[]> => {
   const data = await prisma.desa.findMany({
      select: { id: true, nama: true },
      where: {
         nama: {
            contains: input,
         },
      },
   });

   const filteredData = data.filter((desa) =>
      desa.nama.toLowerCase().includes(input.toLowerCase())
   );

   return filteredData.map((item) => ({ desaId: item.id, namaDesa: item.nama }));
};
