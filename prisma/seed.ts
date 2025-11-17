import fs from "fs";
import csv from "csv-parser";
import path from "path";

import { prisma } from "../src/lib/prisma";
import type { Provinsi, Kota, Kecamatan, Desa } from "../src/types/data";

type Data = { kode: string; nama: string };

// simple local row types used by seeder
type ProvinsiRow = Omit<Provinsi, "kota">;
type KotaRow = Omit<Kota, "kecamatan"> & { provinsiId: string };
type KecamatanRow = Omit<Kecamatan, "desa"> & { kotaId: string };
type DesaRow = Omit<Desa, never> & { kecamatanId: string };

const readCSV = async (): Promise<Data[]> => {
  return new Promise((resolve, reject) => {
    const results: Data[] = [];

    fs.createReadStream(path.join(__dirname, "../src/database/base.csv"))
      .pipe(
        csv({
          headers: ["kode", "nama"],
          separator: ",",
        })
      )
      .on("data", (data) => {
        const kode = data.kode?.trim();
        const nama = data.nama?.trim();

        if (kode && nama) {
          results.push({ kode, nama });
        }
      })
      .on("end", () => {
        resolve(results);
      })
      .on("error", (error) => {
        reject(`Error: ${error}`);
      });
  });
};

const categorizeData = (data: Data[]) => {
  const provinsi: ProvinsiRow[] = [];
  const kota: KotaRow[] = [];
  const kecamatan: KecamatanRow[] = [];
  const desa: DesaRow[] = [];

  data.forEach((item: Data) => {
    const { kode, nama } = item;
    const parts = kode.split(".").length - 1;

    switch (parts) {
      case 0:
        // top-level provinsi; kode is the provinsiId
        provinsi.push({ provinsiId: kode, nama });
        break;
      case 1: {
        // kota level; provinsiId is first 2 chars (adjust slice if your codes differ)
        const provinsiId = kode.slice(0, 2);
        kota.push({ kotaId: kode, nama, provinsiId });
        break;
      }
      case 2: {
        // kecamatan level; kotaId is first 5 chars
        const kotaId = kode.slice(0, 5);
        kecamatan.push({ kecamatanId: kode, nama, kotaId });
        break;
      }
      case 3: {
        // desa level; kecamatanId is first 8 chars
        const kecamatanId = kode.slice(0, 8);
        desa.push({ desaId: kode, nama, kecamatanId });
        break;
      }
      default:
        console.log("invalid item", item);
    }
  });

  return { provinsi, kota, kecamatan, desa };
};

async function main() {
  const data = await readCSV();

  const { provinsi, kota, kecamatan, desa } = categorizeData(data);

  // delete children first to avoid FK constraint issues
  await prisma.desa.deleteMany();
  await prisma.kecamatan.deleteMany();
  await prisma.kota.deleteMany();
  await prisma.provinsi.deleteMany();

  for (const item of provinsi) {
    await prisma.provinsi.create({
      data: {
        id: item.provinsiId,
        nama: item.nama,
      },
    });
  }

  for (const item of kota) {
    const getProvinsi = await prisma.provinsi.findUnique({
      where: { id: item.provinsiId },
    });

    if (!getProvinsi) {
      console.warn(`❌ Provinsi ID ${item.provinsiId} tidak ditemukan.`);
      continue;
    }

    await prisma.kota.create({
      data: {
        id: item.kotaId,
        nama: item.nama,
        provinsiId: item.provinsiId,
      },
    });
  }

  for (const item of kecamatan) {
    const getKota = await prisma.kota.findUnique({
      where: { id: item.kotaId },
    });

    if (!getKota) {
      console.warn(`❌ Kota ID ${item.kotaId} tidak ditemukan.`);
      continue;
    }

    await prisma.kecamatan.create({
      data: {
        id: item.kecamatanId,
        nama: item.nama,
        kotaId: item.kotaId,
      },
    });
  }

  for (const item of desa) {
    const getKecamatan = await prisma.kecamatan.findUnique({
      where: { id: item.kecamatanId },
    });

    if (!getKecamatan) {
      console.warn(`❌ Kecamatan ID ${item.kecamatanId} tidak ditemukan.`);
      continue;
    }

    await prisma.desa.create({
      data: {
        id: item.desaId,
        nama: item.nama,
        kecamatanId: item.kecamatanId,
      },
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
    console.log("Seeding selesai.");
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
