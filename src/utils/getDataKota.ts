"use server";

import { parseError, ServerResponse } from "@/types/server-response";
import type { Kota } from "@/types/data";
import { getKotaByProvinsiId } from "@/services/kota.service";

export const getDataKota = async (
  provinsiId: string
): Promise<ServerResponse<Omit<Kota, "kecamatan">[]>> => {
  if (!provinsiId) throw new Error("Parameter provinsiId tidak boleh kosong");
  try {
    const data = await getKotaByProvinsiId(provinsiId);
    return {
      code: 200,
      success: true,
      message: "Berhasil mengambil data kota",
      data,
    };
  } catch (error: unknown) {
    const parsed = parseError(error);
    return {
      code: 500,
      success: false,
      message: `Gagal mengambil data kota: ${parsed.message ?? "unknown"}`,
      errors: parsed.errors,
    };
  }
};
