import { prisma } from "@/lib/prisma";

export const getTitleKecamatan = async ({
   kecamatanId,
}: {
   kecamatanId: string;
}) => {
   return prisma.kecamatan.findFirst({
      where: {
         id: kecamatanId,
      },
      select: {
         nama: true,
      },
   });
};
