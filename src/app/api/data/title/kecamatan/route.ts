import { getTitleKecamatan } from "@/services/title-kecamatan.service";
import { Response } from "@/types/server-response";
import { NextRequest, NextResponse } from "next/server";

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

      const res = await getTitleKecamatan({ kecamatanId: body.kecamatanId });

      if (!res) {
         return NextResponse.json<Response<null>>(
            {
               success: true,
               message: `Title kecamatan with code ${body.kecamatanId} doesnt exist`,
               data: null,
            },
            {
               status: 200,
            }
         );
      }

      return NextResponse.json<Response<{ nama: string }>>(
         {
            success: true,
            message: "Success get title kecamatan",
            data: res,
         },
         {
            status: 200,
         }
      );
   } catch (error) {
      console.error("FAILED_GET_TITLE_KECAMATAN: ", error);
      return NextResponse.json<Response<null>>(
         {
            success: false,
            message: "Failed get title kecamatan",
            error: "Something went wrong",
         },
         {
            status: 500,
         }
      );
   }
};

export { POST };
