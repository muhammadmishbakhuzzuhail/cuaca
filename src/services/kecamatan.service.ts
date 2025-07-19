import { prisma } from "@/lib/prisma";
import { Kecamatan } from "@/types/data";

export const getKecamatanByKotaId = async (kotaId: string): Promise<Omit<Kecamatan, "desa">[]> => {
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
      kecamatanId: item.id,
      nama: item.nama,
   }));
};

export const getKecamatanByInput = async (
   listKecamatanId: string[]
): Promise<{ kecamatanId: string; namaKecamatan: string }[]> => {
   if (!listKecamatanId.length) return [];

   const data = await prisma.kecamatan.findMany({
      where: {
         id: {
            in: listKecamatanId,
         },
      },
      select: {
         id: true,
         nama: true,
      },
   });

   return data.map((item) => ({ kecamatanId: item.id, namaKecamatan: item.nama }));
};
