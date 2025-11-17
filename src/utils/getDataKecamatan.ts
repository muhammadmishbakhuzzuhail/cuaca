"use server";

import { parseError, ServerResponse } from "@/types/server-response";
import type { Kecamatan } from "@/types/data";
import { getKecamatanByKotaId } from "@/services/kecamatan.service";

export const getDataKecamatan = async (
  kotaId: string
): Promise<ServerResponse<Omit<Kecamatan, "desa">[]>> => {
  if (!kotaId) throw new Error("Parameter kotaId tidak boleh kosong");
  try {
    const data = await getKecamatanByKotaId(kotaId);
    return {
      code: 200,
      success: true,
      message: "Berhasil mengambil data kecamatan",
      data,
    };
  } catch (error: unknown) {
    const parsed = parseError(error);
    return {
      code: 500,
      success: false,
      message: `Gagal mengambil data kecamatan: ${parsed.message ?? "unknown"}`,
      errors: parsed.errors,
    };
  }
};
