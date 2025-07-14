"use server";

import axios from "axios";
import { Response } from "@/types/server-response";

export const getTitleDesa = async ({ desaId }: { desaId: string }) => {
   try {
      const res = await axios.post<Response<{ nama: string }>>(
         "http://localhost:3000/api/data/title/desa",
         { desaId },
         {
            timeout: 5000,
            timeoutErrorMessage: "Server is busy",
         }
      );

      return res.data;
   } catch (error) {
      if (error instanceof Error) {
         throw new Error(`Gagal mengambil title desa: ${error.message}`);
      } else {
         throw new Error("Terjadi kesalahan yang tidak diketahui.");
      }
   }
};
