"use server";

import { getBaseUrl } from "@/lib/getBaseUrl";
import { Kecamatan } from "@/types/data";
import { ServerResponse } from "@/types/server-response";
import axios from "axios";

export const getDataKecamatan = async (kotaId: string) => {
  if (!kotaId) {
    throw new Error("Parameter kotaId tidak boleh kosong");
  }

  try {
    const BASE = getBaseUrl();
    const res = await axios.get<ServerResponse<Omit<Kecamatan, "desa">[]>>(
      `${BASE}/api/data/kecamatan`,
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
