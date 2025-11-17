"use server";

import axios from "axios";
import { parseError, ServerResponse } from "@/types/server-response";
import type { Cuaca } from "@/types/cuaca";
import { isDesaIdValid } from "@/services/validation.service";

export const getDetailCuaca = async (
  desaId: string
): Promise<ServerResponse<Cuaca>> => {
  if (!desaId) throw new Error("desaId tidak boleh kosong");
  try {
    const valid = await isDesaIdValid(desaId);
    if (!valid)
      return { code: 400, success: false, message: "Desa ID tidak valid" };

    const res = await axios.get<Cuaca>(
      `https://api.bmkg.go.id/publik/prakiraan-cuaca?adm4=${desaId}`,
      {
        timeout: 10000,
        timeoutErrorMessage: "Server BMKG sibuk",
      }
    );

    return {
      code: 200,
      success: true,
      message: "Berhasil mengambil data cuaca",
      data: res.data,
    };
  } catch (error: unknown) {
    const parsed = parseError(error);
    return {
      code: 500,
      success: false,
      message: `Gagal mengambil data cuaca: ${parsed.message ?? "unknown"}`,
      errors: parsed.errors,
    };
  }
};
