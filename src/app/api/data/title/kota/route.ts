import { getTitleKota } from "@/services/title-kota.service";
import { Response } from "@/types/server-response";
import { NextRequest, NextResponse } from "next/server";

type Body = { kotaId: string };

const POST = async (request: NextRequest) => {
   try {
      const body: Body = await request.json();

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

      const res = await getTitleKota({ kotaId: body.kotaId });

      if (!res) {
         return NextResponse.json<Response<null>>(
            {
               success: true,
               message: `Title kecamatan with code ${body.kotaId} doesnt exist`,
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
            message: "Success get title kota",
            data: res,
         },
         {
            status: 200,
         }
      );
   } catch (error) {
      console.error("FAILED_GET_TITLE_KOTA: ", error);
      return NextResponse.json<Response<null>>(
         {
            success: false,
            message: "Failed get title kota",
            error: "Something went wrong",
         },
         {
            status: 500,
         }
      );
   }
};

export { POST };
