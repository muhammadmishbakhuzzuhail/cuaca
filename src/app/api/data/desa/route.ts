import { getListDesa } from "@/services/desa.service";
import type { Response } from "@/types/server-response";
import { NextRequest, NextResponse } from "next/server";

type Data = { kode: string; nama: string };
type Body = { kecamatanId: string };

const POST = async (request: NextRequest) => {
   try {
      const body: Body = await request.json();

      if (!body.kecamatanId) {
         return NextResponse.json<Response<null>>(
            {
               success: false,
               message: "Cannot found ID kecamatan",
               error: "Bad request",
            },
            {
               status: 400,
            }
         );
      }

      const res = await getListDesa(body.kecamatanId);

      if (!res || res.length === 0) {
         return NextResponse.json<Response<null>>(
            {
               success: false,
               message: "List desa is empty",
               error: "Not found",
            },
            {
               status: 404,
            }
         );
      }

      return NextResponse.json<Response<Data[]>>(
         {
            success: true,
            message: "Success get list desa",
            data: res,
         },
         {
            status: 200,
         }
      );
   } catch (error) {
      console.error("FAILED_GET_LIST_DESA: ", error);
      return NextResponse.json<Response>(
         {
            success: false,
            message: "Failed get list desa",
            error: "Something went wrong",
         },
         {
            status: 500,
         }
      );
   }
};

export { POST };
