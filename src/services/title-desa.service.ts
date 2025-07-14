import { prisma } from "@/lib/prisma";

export const getTitleDesa = async ({ desaId }: { desaId: string }) => {
   return prisma.desa.findFirst({
      where: {
         id: desaId,
      },
      select: {
         nama: true,
      },
   });
};
