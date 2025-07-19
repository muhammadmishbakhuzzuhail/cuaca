import { prisma } from "@/lib/prisma";
import { Kota } from "@/types/data";

export const getKotaByProvinsiId = async (
   provinsiId: string
): Promise<Omit<Kota, "kecamatan">[]> => {
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
      kotaId: item.id,
      nama: item.nama,
   }));
};

export const getKotaByInput = async (
   listKotaId: string[]
): Promise<{ kotaId: string; namaKota: string }[]> => {
   if (!listKotaId.length) return [];

   const data = await prisma.kota.findMany({
      where: {
         id: {
            in: listKotaId,
         },
      },
      select: {
         id: true,
         nama: true,
      },
   });

   return data.map((item) => ({ kotaId: item.id, namaKota: item.nama }));
};
