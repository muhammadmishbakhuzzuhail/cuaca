import { getRowsDesaId } from "@/services/rows-desa-id.service";
import type { WeatherResponse } from "@/types/axios-response";
import { CuacaListItem } from "@/types/list-cuaca";
import { Page } from "@/types/page";
import type { Response } from "@/types/server-response";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

// row.count kemudian tampilkan page sekarang, default 1
// ambil kode juga untuk klik user dan fetch GET api/data/desa?kode=....
// return harus CuacaListItem + kode

const GET = async (request: NextRequest, { params }: { params: { page: string } }) => {
   try {
      const pageNumber = parseInt(params.page);

      if (!pageNumber || isNaN(pageNumber) || pageNumber <= 0) {
         return NextResponse.json<Response>(
            {
               success: false,
               message: "Params page is invalid",
               error: "Bad request",
            },
            {
               status: 400,
            }
         );
      }

      const { listDesaId, page } = await getRowsDesaId({ pageNumber });

      const result: CuacaListItem[] = [];

      for (const id of listDesaId) {
         const response = await axios.get<WeatherResponse>(
            `http://localhost:3000/api/cuaca/desa?id=${id}`
         );

         const {
            lokasi: { desa, kecamatan, kotkab, provinsi },
            data,
         } = response.data;

         const { local_datetime, weather_desc, hu, t, ws, wd, wd_to } = data[0].cuaca[0][0];

         result.push({
            id,
            desa,
            kecamatan,
            kotkab,
            provinsi,
            cuaca: { local_datetime, weather_desc, t, hu, ws, wd, wd_to },
         });
      }

      return NextResponse.json<Response<CuacaListItem[]> & Page>(
         {
            success: true,
            message: "Success fetch page information",
            data: result,
            page,
         },
         {
            status: 200,
         }
      );
   } catch (error) {
      console.error("FAILED_FETCH_LIST_ID_DESA: ", error);
      return NextResponse.json<Response>(
         {
            success: false,
            message: "Failed fetch page information",
            error: "Something went wrong",
         },
         {
            status: 500,
         }
      );
   }
};

export { GET };
