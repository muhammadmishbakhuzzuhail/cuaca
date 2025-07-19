import { getDesaByPageAndLimit } from "@/services/desa.service";
import { Cuaca } from "@/types/cuaca";
import { Page } from "@/types/page";
import { PreviewCuaca } from "@/types/preview-cuaca";
import { ServerResponse } from "@/types/server-response";
import { checkPageAndLimit } from "@/utils/checkPageAndLimit";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

const GET = async (request: NextRequest) => {
   try {
      const searchParams = await request.nextUrl.searchParams;
      const page = searchParams.get("page")!;
      const limit = searchParams.get("limit")!;

      const { errors, total } = await checkPageAndLimit(page, limit);

      if (errors && Object.keys(errors).length > 0) {
         return NextResponse.json<ServerResponse & Page>(
            {
               code: 400,
               success: false,
               message: "Permintaan buruk",
               errors: { ...errors },
               page: {
                  current: Number(page),
                  limit: Number(limit),
                  total: Number(total),
                  totalPages: Math.ceil(Number(total) / Number(limit)),
               },
            },
            { status: 400 }
         );
      }

      const getDesaId = await getDesaByPageAndLimit(Number(page), Number(limit));

      if (!(getDesaId.length > 0)) {
         return NextResponse.json<ServerResponse & Page>(
            {
               code: 404,
               success: false,
               message: "List desa Id kosong",
               errors: {
                  desaId: ["Database tidak mempunyai list desa Id"],
               },
               page: {
                  current: Number(page),
                  limit: Number(limit),
                  total: Number(total),
                  totalPages: Math.ceil(Number(total) / Number(limit)),
               },
            },
            { status: 404 }
         );
      }

      const resultPreviewCuaca = [];

      for (const item of getDesaId) {
         const response = await axios.get<Cuaca>(
            `https://api.bmkg.go.id/publik/prakiraan-cuaca?adm4=${item.desaId}`
         );
         const { cuaca, lokasi } = response.data.data[0];

         const { local_datetime, weather_desc, t, hu, ws, wd, wd_to } = cuaca[0][0];
         const { desa, kecamatan, kotkab, provinsi } = lokasi;

         const obj: PreviewCuaca = {
            desaId: item.desaId,
            desa,
            kecamatan,
            kotkab,
            provinsi,
            cuaca: {
               local_datetime,
               weather_desc,
               hu,
               t,
               wd,
               wd_to,
               ws,
            },
         };
         resultPreviewCuaca.push(obj);
      }

      return NextResponse.json<ServerResponse<PreviewCuaca[]> & Page>(
         {
            code: 200,
            success: true,
            message: "Berhasil mengambil list data cuaca",
            data: resultPreviewCuaca,
            page: {
               current: Number(page),
               limit: Number(limit),
               total: Number(total),
               totalPages: Math.ceil(Number(total) / Number(limit)),
            },
         },
         { status: 200 }
      );
   } catch (error) {
      console.error("FAILED_GET_DATA: ", error);
      return NextResponse.json<ServerResponse>({
         code: 500,
         success: false,
         message: "Gagal mengambil preview cuaca desa",
         errors: {
            server: ["Terjadi kesalahan pada server. Silahkan coba lagi nanti"],
         },
      });
   }
};

export { GET };
