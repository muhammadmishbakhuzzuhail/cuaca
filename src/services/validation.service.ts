import { prisma } from "@/lib/prisma";

export const isProvinsiIdValid = async (provinsiId: string) => {
   const data = await prisma.provinsi.findUnique({
      where: {
         id: provinsiId,
      },
   });

   return data;
};

export const isKotaIdValid = async (kotaId: string) => {
   const data = await prisma.kota.findUnique({
      where: {
         id: kotaId,
      },
   });

   return data;
};

export const isKecamatanIdValid = async (kecamatanId: string) => {
   const data = await prisma.kecamatan.findUnique({
      where: {
         id: kecamatanId,
      },
   });

   return data;
};

export const isDesaIdValid = async (desaId: string) => {
   const data = await prisma.desa.findUnique({
      where: {
         id: desaId,
      },
   });

   return data;
};
