"use server";

import { parseError, ServerResponse } from "@/types/server-response";
import type { Desa } from "@/types/data";
import { getDesaByKecamatanId } from "@/services/desa.service";

export const getDataDesa = async (
  kecamatanId: string
): Promise<ServerResponse<Desa[]>> => {
  if (!kecamatanId) throw new Error("Parameter kecamatanId tidak boleh kosong");
  try {
    const data = await getDesaByKecamatanId(kecamatanId);
    return {
      code: 200,
      success: true,
      message: "Berhasil mengambil data desa",
      data,
    };
  } catch (error: unknown) {
    const parsed = parseError(error);
    return {
      code: 500,
      success: false,
      message: `Gagal mengambil data desa: ${parsed.message ?? "unknown"}`,
      errors: parsed.errors,
    };
  }
};
