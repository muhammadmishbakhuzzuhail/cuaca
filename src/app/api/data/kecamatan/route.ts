import { getListKecamatan } from "@/services/kecamatan.service";
import type { Response } from "@/types/server-response";
import { NextRequest, NextResponse } from "next/server";

type Data = { kode: string; nama: string };
type Body = { kotaId: string };

const POST = async (request: NextRequest) => {
   try {
      const body: Body = await request.json();
      console.log("diterima", body.kotaId);
      if (!body.kotaId) {
         return NextResponse.json<Response<null>>(
            {
               success: false,
               message: "Cannot found ID kota",
               error: "Bad request",
            },
            {
               status: 400,
            }
         );
      }

      const res = await getListKecamatan(body.kotaId);

      if (!res || res.length === 0) {
         return NextResponse.json<Response<null>>(
            {
               success: false,
               message: "List kecamatan is empty",
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
            message: "Success get list kecamatan",
            data: res,
         },
         {
            status: 200,
         }
      );
   } catch (error) {
      console.error("FAILED_GET_LIST_KECAMATAN: ", error);
      return NextResponse.json<Response>(
         {
            success: false,
            message: "Failed get list kecamatan",
            error: "Something went wrong",
         },
         {
            status: 500,
         }
      );
   }
};

export { POST };
