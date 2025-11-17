"use server";

import { parseError, ServerResponse } from "@/types/server-response";
import type { Provinsi } from "@/types/data";
import { getAllProvinsi } from "@/services/provinsi.service";

export const getDataProvinsi = async (): Promise<
  ServerResponse<Omit<Provinsi, "kota">[]>
> => {
  try {
    const data = await getAllProvinsi();
    return {
      code: 200,
      success: true,
      message: "Berhasil mengambil data provinsi",
      data,
    };
  } catch (error: unknown) {
    const parsed = parseError(error);
    return {
      code: 500,
      success: false,
      message: `Gagal mengambil data provinsi: ${parsed.message ?? "unknown"}`,
      errors: parsed.errors,
    };
  }
};
