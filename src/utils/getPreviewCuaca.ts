"use server";

import axios from "axios";
import { parseError, ServerResponse } from "@/types/server-response";
import { PreviewCuaca } from "@/types/preview-cuaca";
import { Page } from "@/types/page";
import { getDesaByPageAndLimit, countDesa } from "@/services/desa.service";
import { isDesaIdValid } from "@/services/validation.service";
import type { Cuaca } from "@/types/cuaca";

export const getPreviewCuaca = async (
  page: string,
  limit: string
): Promise<ServerResponse<PreviewCuaca[]> & Partial<Page>> => {
  try {
    const p = Math.max(1, parseInt(page || "1", 10));
    const l = Math.max(1, parseInt(limit || "9", 10));
    const desaRows = await getDesaByPageAndLimit(p, l);
    const total = await countDesa();

    const previews = await Promise.all(
      desaRows.map(async (d) => {
        try {
          if (!(await isDesaIdValid(d.desaId))) return null;

          const res = await axios.get<Cuaca>(
            `https://api.bmkg.go.id/publik/prakiraan-cuaca?adm4=${d.desaId}`,
            { timeout: 10000 }
          );

          const body = res.data;
          const main = body?.data?.[0];
          const lokasi = main?.lokasi;
          const cuaca = main?.cuaca?.[0]?.[0] ?? main?.cuaca?.[0][0] ?? null;
          if (!cuaca) {
            // log minimal helpful info for debugging
            console.warn("BMKG: missing cuaca for desa", d.desaId, {
              lokasi: lokasi ?? null,
              dataKeys: body ? Object.keys(body) : null,
            });
          }

          return {
            desaId: d.desaId,
            desa: lokasi?.desa,
            kecamatan: lokasi?.kecamatan ?? "",
            kotkab: lokasi?.kotkab ?? "",
            provinsi: lokasi?.provinsi ?? "",
            cuaca,
          } as PreviewCuaca;
        } catch (err: unknown) {
          console.error("failed fetch bmkg for", d.desaId, { err });
          return null;
        }
      })
    );

    const filtered = previews.filter(Boolean) as PreviewCuaca[];
    return {
      code: 200,
      success: true,
      message: "Berhasil mengambil preview cuaca",
      data: filtered,
      page: {
        limit: l,
        total,
        totalPages: Math.ceil(total / l),
        current: p,
      },
    } as ServerResponse<PreviewCuaca[]> & Partial<Page>;
  } catch (err: unknown) {
    const parsed = parseError(err);
    return {
      code: 500,
      success: false,
      message: `Gagal mengambil preview cuaca: ${parsed.message}`,
      errors: parsed.errors,
    };
  }
};
