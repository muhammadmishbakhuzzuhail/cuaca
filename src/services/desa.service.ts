import { prisma } from "@/lib/prisma";
import { Desa } from "@/types/data";

export const getDesaByKecamatanId = async (
  kecamatanId: string
): Promise<Desa[]> => {
  const data = await prisma.desa.findMany({
    select: {
      id: true,
      nama: true,
    },
    where: {
      kecamatanId: kecamatanId,
    },
    orderBy: { nama: "asc" },
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
    orderBy: { nama: "asc" },
    select: { id: true },
  });

  return data.map((item) => ({
    desaId: item.id,
  }));
};

export const getDesaByInput = async (
  input: string
): Promise<
  {
    desaId: string;
    namaDesa: string;
    namaKecamatan: string;
    namaKota: string;
  }[]
> => {
  if (!input) return [];

  // ambil id/nama desa + relation Kecamatan -> Kota sesuai schema.prisma
  const rows = await prisma.desa.findMany({
    where: {
      nama: {
        contains: input,
      },
    },
    select: {
      id: true,
      nama: true,
      Kecamatan: {
        select: {
          id: true,
          nama: true,
          Kota: {
            select: {
              id: true,
              nama: true,
            },
          },
        },
      },
    },
    take: 50,
    orderBy: {
      nama: "asc",
    },
  });

  return rows.map((r) => ({
    desaId: r.id,
    namaDesa: r.nama,
    namaKecamatan: r.Kecamatan?.nama,
    namaKota: r.Kecamatan?.Kota?.nama,
  }));
};
