"use server";

import axios from "axios";
import { Response } from "@/types/server-response";

export const getTitleKecamatan = async ({
   kecamatanId,
}: {
   kecamatanId: string;
}) => {
   try {
      const res = await axios.post<Response<{ nama: string }>>(
         "http://localhost:3000/api/data/title/kecamatan",
         { kecamatanId },
         {
            timeout: 5000,
            timeoutErrorMessage: "Server is busy",
         }
      );

      return res.data;
   } catch (error) {
      if (error instanceof Error) {
         throw new Error(`Gagal mengambil title kecamatan: ${error.message}`);
      } else {
         throw new Error("Terjadi kesalahan yang tidak diketahui.");
      }
   }
};
