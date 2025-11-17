"use server";

import { getBaseUrl } from "@/lib/getBaseUrl";
import { Kota } from "@/types/data";
import { ServerResponse } from "@/types/server-response";
import axios from "axios";

export const getDataKota = async (provinsiId: string) => {
  if (!provinsiId) {
    throw new Error("Parameter provinsiId tidak boleh kosong");
  }

  try {
    const BASE = getBaseUrl();
    const res = await axios.get<ServerResponse<Omit<Kota, "kecamatan">[]>>(
      `${BASE}/api/data/kota`,
      {
        params: { provinsiId },
        timeout: 5000,
        timeoutErrorMessage: "Server sedang sibuk",
      }
    );

    return res.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Gagal mengambil data kota: ${error.message}`);
    } else {
      throw new Error("Terjadi kesalahan yang tidak diketahui.");
    }
  }
};
