"use server";

import axios from "axios";
import { Response } from "@/types/server-response";
import { Base } from "@/types/base";

export const getListProvinsi = async () => {
   try {
      const res = await axios.get<Response<Omit<Base, "kota">[]>>(
         "http://localhost:3000/api/data/provinsi",
         {
            timeout: 5000,
            timeoutErrorMessage: "Server is busy",
         }
      );

      return res.data;
   } catch (error) {
      if (error instanceof Error) {
         throw new Error(`Gagal mengambil list provinsi: ${error.message}`);
      } else {
         throw new Error("Terjadi kesalahan yang tidak diketahui.");
      }
   }
};
