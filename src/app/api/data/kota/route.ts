import { getListKota } from "@/services/kota.service";
import type { Response } from "@/types/server-response";
import { NextRequest, NextResponse } from "next/server";

type Data = { kode: string; nama: string };
type Body = { provinsiId: string };

const POST = async (request: NextRequest) => {
   try {
      const body: Body = await request.json();

      if (!body.provinsiId) {
         return NextResponse.json<Response<null>>(
            {
               success: false,
               message: "Cannot found ID provinsi",
               error: "Bad request",
            },
            {
               status: 400,
            }
         );
      }

      const res = await getListKota(body.provinsiId);

      if (!res || res.length === 0) {
         return NextResponse.json<Response<null>>(
            {
               success: false,
               message: "List kota is empty",
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
            message: "Success get list kota",
            data: res,
         },
         {
            status: 200,
         }
      );
   } catch (error) {
      console.error("FAILED_GET_LIST_KOTA: ", error);
      return NextResponse.json<Response>(
         {
            success: false,
            message: "Failed get list kota",
            error: "Something went wrong",
         },
         {
            status: 500,
         }
      );
   }
};

export { POST };
