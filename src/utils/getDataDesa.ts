"use server";

import { Desa } from "@/types/data";
import { ServerResponse } from "@/types/server-response";
import axios from "axios";

export const getDataDesa = async (kecamatanId: string) => {
   if (!kecamatanId) {
      throw new Error("Parameter kecamatan Id tidak boleh kosong");
   }

   try {
      const res = await axios.get<ServerResponse<Desa[]>>(`http://localhost:3000/api/data/desa`, {
         params: {
            kecamatanId,
         },
         timeout: 5000,
         timeoutErrorMessage: "Server sedang sibuk",
      });

      return res.data;
   } catch (error) {
      if (error instanceof Error) {
         throw new Error(`Gagal mengambil data desa: ${error.message}`);
      } else {
         throw new Error("Terjadi kesalahan yang tidak diketahui.");
      }
   }
};
