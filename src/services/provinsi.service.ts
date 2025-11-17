import { prisma } from "@/lib/prisma";
import { Provinsi } from "@/types/data";

export const getAllProvinsi = async (): Promise<Omit<Provinsi, "kota">[]> => {
  const data = await prisma.provinsi.findMany({
    select: {
      id: true,
      nama: true,
    },
  });

  return data.map((item) => ({
    provinsiId: item.id,
    nama: item.nama,
  }));
};
