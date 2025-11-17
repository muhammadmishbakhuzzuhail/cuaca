"use server";

import { parseError, ServerResponse } from "@/types/server-response";
import { getDesaByInput } from "@/services/desa.service";
import { getKecamatanByInput } from "@/services/kecamatan.service";
import { getKotaByInput } from "@/services/kota.service";

interface DataRow {
  desaId: string;
  namaDesa: string;
  namaKecamatan: string;
  namaKota: string;
}

type DesaServiceRow = {
  desaId: string;
  namaDesa: string;
  kecamatanId?: string;
  namaKecamatan?: string;
  kotaId?: string;
  namaKota?: string;
};

export const getAllDataDesa = async (
  input: string
): Promise<ServerResponse<DataRow[]>> => {
  if (!input) throw new Error("Parameter input tidak boleh kosong");

  try {
    const rows = (await getDesaByInput(input)) as DesaServiceRow[];

    const kecamatanIds = Array.from(
      new Set(rows.map((r) => r.kecamatanId).filter(Boolean) as string[])
    );
    const kotaIds = Array.from(
      new Set(rows.map((r) => r.kotaId).filter(Boolean) as string[])
    );

    const [kecamatanList, kotaList] = await Promise.all([
      kecamatanIds.length
        ? getKecamatanByInput(kecamatanIds)
        : Promise.resolve([]),
      kotaIds.length ? getKotaByInput(kotaIds) : Promise.resolve([]),
    ]);

    const kecMap: Record<string, string> = {};
    kecamatanList.forEach((k) => (kecMap[k.kecamatanId] = k.namaKecamatan));

    const kotaMap: Record<string, string> = {};
    kotaList.forEach((k) => (kotaMap[k.kotaId] = k.namaKota));

    const normalized: DataRow[] = rows.map((r) => ({
      desaId: r.desaId,
      namaDesa: r.namaDesa ?? "",
      namaKecamatan:
        r.namaKecamatan ?? (r.kecamatanId ? kecMap[r.kecamatanId] ?? "" : ""),
      namaKota: r.namaKota ?? (r.kotaId ? kotaMap[r.kotaId] ?? "" : ""),
    }));

    return {
      code: 200,
      success: true,
      message: "Berhasil mencari desa",
      data: normalized,
    };
  } catch (err: unknown) {
    const parsed = parseError(err);
    return {
      code: 500,
      success: false,
      message: `Gagal mengambil data desa: ${parsed.message}`,
      errors: parsed.errors,
    };
  }
};
