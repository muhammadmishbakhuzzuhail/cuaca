"use server";

import { Kota } from "@/types/base";
import { Response } from "@/types/server-response";
import axios from "axios";

export const getListKota = async ({ provinsiId }: { provinsiId: string }) => {
   if (!provinsiId) {
      throw new Error("Parameter id tidak boleh kosong");
   }

   try {
      const res = await axios.post<Response<Omit<Kota, "kecamatan">[]>>(
         "http://localhost:3000/api/data/kota",
         { provinsiId },
         {
            timeout: 5000,
            timeoutErrorMessage: "Server is busy",
         }
      );

      return res.data;
   } catch (error) {
      if (error instanceof Error) {
         throw new Error(`Gagal mengambil list kota: ${error.message}`);
      } else {
         throw new Error("Terjadi kesalahan yang tidak diketahui.");
      }
   }
};
