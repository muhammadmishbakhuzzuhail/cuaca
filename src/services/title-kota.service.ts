import { prisma } from "@/lib/prisma";

export const getTitleKota = async ({ kotaId }: { kotaId: string }) => {
   return prisma.kota.findFirst({
      where: {
         id: kotaId,
      },
      select: {
         nama: true,
      },
   });
};
