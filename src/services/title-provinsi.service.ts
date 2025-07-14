import { prisma } from "@/lib/prisma";

export const getTitleProvinsi = async ({
   provinsiId,
}: {
   provinsiId: string;
}) => {
   return prisma.provinsi.findFirst({
      where: {
         id: provinsiId,
      },
      select: {
         nama: true,
      },
   });
};
