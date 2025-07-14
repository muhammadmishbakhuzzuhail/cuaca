"use server";

import { Desa } from "@/types/base";
import { Response } from "@/types/server-response";
import axios from "axios";

export const getListDesa = async ({ kecamatanId }: { kecamatanId: string }) => {
   if (!kecamatanId) {
      throw new Error("Parameter id tidak boleh kosong");
   }

   try {
      const res = await axios.post<Response<Desa[]>>(
         "http://localhost:3000/api/data/desa",
         { kecamatanId },
         {
            timeout: 5000,
            timeoutErrorMessage: "Server is busy",
         }
      );

      return res.data;
   } catch (error) {
      if (error instanceof Error) {
         throw new Error(`Gagal mengambil list desa: ${error.message}`);
      } else {
         throw new Error("Terjadi kesalahan yang tidak diketahui.");
      }
   }
};
