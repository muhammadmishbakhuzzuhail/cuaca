"use server";

import { Kecamatan } from "@/types/data";
import { ServerResponse } from "@/types/server-response";
import axios from "axios";

export const getDataKecamatan = async (kotaId: string) => {
   if (!kotaId) {
      throw new Error("Parameter kotaId tidak boleh kosong");
   }

   try {
      const res = await axios.get<ServerResponse<Omit<Kecamatan, "desa">[]>>(
         "http://localhost:3000/api/data/kecamatan",
         {
            params: {
               kotaId,
            },
            timeout: 5000,
            timeoutErrorMessage: "Server sedang sibuk",
         }
      );

      return res.data;
   } catch (error) {
      if (error instanceof Error) {
         throw new Error(`Gagal mengambil data kecamatan: ${error.message}`);
      } else {
         throw new Error("Terjadi kesalahan yang tidak diketahui.");
      }
   }
};
