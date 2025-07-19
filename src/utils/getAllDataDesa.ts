"use server";

import { ServerResponse } from "@/types/server-response";
import axios from "axios";

interface Data {
   desaId: string;
   namaDesa: string;
   kecamatanId: string;
   namaKecamatan: string;
   kotaId: string;
   namaKota: string;
}

export const getAllDataDesa = async (input: string) => {
   if (!input) {
      throw new Error("Parameter input tidak boleh kosong");
   }

   try {
      const res = await axios.get<ServerResponse<Data[]>>(
         `http://localhost:3000/api/data/list/desa`,
         {
            params: {
               input,
            },
            timeout: 5000,
            timeoutErrorMessage: "Server sedang sibuk",
         }
      );

      return res.data;
   } catch (error) {
      if (error instanceof Error) {
         throw new Error(`Gagal mengambil data desa: ${error.message}`);
      } else {
         throw new Error("Terjadi kesalahan yang tidak diketahui.");
      }
   }
};
