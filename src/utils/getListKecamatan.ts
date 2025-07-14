"use server";

import { Kecamatan } from "@/types/base";
import { Response } from "@/types/server-response";
import axios from "axios";

export const getListKecamatan = async ({ kotaId }: { kotaId: string }) => {
   if (!kotaId) {
      throw new Error("Parameter id tidak boleh kosong");
   }
   console.log("GEt data", kotaId);
   try {
      const res = await axios.post<Response<Omit<Kecamatan, "desa">[]>>(
         "http://localhost:3000/api/data/kecamatan",
         { kotaId },
         {
            timeout: 5000,
            timeoutErrorMessage: "Server is busy",
         }
      );

      return res.data;
   } catch (error) {
      if (error instanceof Error) {
         throw new Error(`Gagal mengambil list kecamatan: ${error.message}`);
      } else {
         throw new Error("Terjadi kesalahan yang tidak diketahui.");
      }
   }
};
