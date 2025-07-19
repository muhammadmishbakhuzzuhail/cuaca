"use server";

import { Cuaca } from "@/types/cuaca";
import { ServerResponse } from "@/types/server-response";
import axios from "axios";

export const getDetailCuaca = async (desaId: string) => {
   try {
      const res = await axios.get<ServerResponse<Cuaca>>(
         `http://localhost:3000/api/cuaca/desa/${desaId}`,
         {
            timeout: 5000,
            timeoutErrorMessage: "Server sedang sibuk",
         }
      );
      console.log("get", res.config.method);
      return res.data;
   } catch (error) {
      if (error instanceof Error) {
         throw new Error(`Gagal mengambil data desa: ${error.message}`);
      } else {
         throw new Error("Terjadi kesalahan yang tidak diketahui.");
      }
   }
};
