import { getTitleDesa } from "@/services/title-desa.service";
import { Response } from "@/types/server-response";
import { NextRequest, NextResponse } from "next/server";

type Body = { desaId: string };

const POST = async (request: NextRequest) => {
   try {
      const body: Body = await request.json();

      if (!body.desaId) {
         return NextResponse.json<Response<null>>(
            {
               success: false,
               message: "Cannot found ID desa",
               error: "Bad request",
            },
            {
               status: 400,
            }
         );
      }

      const res = await getTitleDesa({ desaId: body.desaId });

      if (!res) {
         return NextResponse.json<Response<null>>(
            {
               success: true,
               message: `Title desa with code ${body.desaId} doesnt exist`,
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
            message: "Success get title desa",
            data: res,
         },
         {
            status: 200,
         }
      );
   } catch (error) {
      console.error("FAILED_GET_TITLE_DESA: ", error);
      return NextResponse.json<Response<null>>(
         {
            success: false,
            message: "Failed get title desa",
            error: "Something went wrong",
         },
         {
            status: 500,
         }
      );
   }
};

export { POST };
