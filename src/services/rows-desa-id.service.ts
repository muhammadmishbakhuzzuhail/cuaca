import { prisma } from "@/lib/prisma";
import { Page } from "@/types/page";

export const getRowsDesaId = async ({
   pageNumber,
}: {
   pageNumber: number;
}): Promise<{ listDesaId: string[] } & Page> => {
   const rows = await prisma.desa.count();
   const data = await prisma.desa.findMany({
      take: 9,
      skip: (pageNumber - 1) * 9,
   });

   const listDesaId: string[] = [];
   data.map((item) => {
      listDesaId.push(item.id);
   });

   const totalPages = Math.ceil(rows / 9);
   return {
      listDesaId,
      page: {
         current: pageNumber,
         size: 9,
         total: rows,
         totalPages,
      },
   };
};
