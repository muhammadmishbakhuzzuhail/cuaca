import fs from "fs";
import csv from "csv-parser";
import path from "path";

import type { Desa, Kecamatan, Kota, Base } from "@/types/base";
import { prisma } from "../src/lib/prisma";

type Data = { kode: string; nama: string };

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
   const provinsi: Omit<Base, "kota">[] = [];
   const kota: (Omit<Kota, "kecamatan"> & { provinsiId: string })[] = [];
   const kecamatan: (Omit<Kecamatan, "desa"> & { kotaId: string })[] = [];
   const desa: (Desa & { kecamatanId: string })[] = [];

   data.forEach((item: Data) => {
      const { kode, nama } = item;
      const parts = kode.split(".").length - 1;

      switch (parts) {
         case 0:
            provinsi.push({ kode, nama });
            break;
         case 1:
            const provinsiId = kode.slice(0, 2);
            kota.push({ kode, nama, provinsiId });
            break;
         case 2:
            const kotaId = kode.slice(0, 5);
            kecamatan.push({ kode, nama, kotaId });
            break;
         case 3:
            const kecamatanId = kode.slice(0, 8);
            desa.push({ kode, nama, kecamatanId });
            break;
         default:
            console.log("invalid item", item);
      }
   });

   return { provinsi, kota, kecamatan, desa };
};

async function main() {
   const data = await readCSV();

   const { provinsi, kota, kecamatan, desa } = categorizeData(data);

   await prisma.provinsi.deleteMany();
   await prisma.kota.deleteMany();
   await prisma.kecamatan.deleteMany();
   await prisma.desa.deleteMany();

   for (const item of provinsi) {
      await prisma.provinsi.create({
         data: {
            id: item.kode,
            nama: item.nama,
         },
      });
   }

   for (const item of kota) {
      const getProvinsiId = await prisma.provinsi.findUnique({
         where: { id: item.provinsiId },
      });

      if (!getProvinsiId) {
         console.warn(`❌ Provinsi ID ${item.provinsiId} tidak ditemukan.`);
         continue;
      }

      await prisma.kota.create({
         data: {
            id: item.kode,
            nama: item.nama,
            provinsiId: item.provinsiId,
         },
      });
   }

   for (const item of kecamatan) {
      const getKotaId = await prisma.kota.findUnique({
         where: { id: item.kotaId },
      });

      if (!getKotaId) {
         console.warn(`❌ Kota ID ${item.kotaId} tidak ditemukan.`);
         continue;
      }

      await prisma.kecamatan.create({
         data: {
            id: item.kode,
            nama: item.nama,
            kotaId: item.kotaId,
         },
      });
   }

   for (const item of desa) {
      const getKecamatanId = await prisma.kecamatan.findUnique({
         where: { id: item.kecamatanId },
      });

      if (!getKecamatanId) {
         console.warn(`❌ Kecamatan ID ${item.kecamatanId} tidak ditemukan.`);
         continue;
      }

      await prisma.desa.create({
         data: {
            id: item.kode,
            nama: item.nama,
            kecamatanId: item.kecamatanId,
         },
      });
   }
}

main()
   .then(async () => {
      await prisma.$disconnect();
   })
   .catch(async (e) => {
      console.error(e);
      await prisma.$disconnect();
      process.exit(1);
   });
