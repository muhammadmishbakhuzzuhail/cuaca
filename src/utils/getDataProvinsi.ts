"use server";

import axios from "axios";
import { ServerResponse } from "@/types/server-response";
import { Provinsi } from "@/types/data";

export const getDataProvinsi = async () => {
   try {
      const res = await axios.get<ServerResponse<Omit<Provinsi, "kota">[]>>(
         "http://localhost:3000/api/data/provinsi",
         {
            timeout: 5000,
            timeoutErrorMessage: "Server sedang sibuk",
         }
      );

      return res.data;
   } catch (error) {
      if (error instanceof Error) {
         throw new Error(`Gagal mengambil data provinsi: ${error.message}`);
      } else {
         throw new Error("Terjadi kesalahan yang tidak diketahui.");
      }
   }
};
