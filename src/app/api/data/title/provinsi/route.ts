import { getTitleProvinsi } from "@/services/title-provinsi.service";
import { Response } from "@/types/server-response";
import { NextRequest, NextResponse } from "next/server";

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

      const res = await getTitleProvinsi({ provinsiId: body.provinsiId });

      if (!res) {
         return NextResponse.json<Response<null>>(
            {
               success: true,
               message: `Title provinsi with code ${body.provinsiId} doesnt exist`,
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
            message: "Success get title provinsi",
            data: res,
         },
         {
            status: 200,
         }
      );
   } catch (error) {
      console.error("FAILED_GET_TITLE_PROVINSI: ", error);
      return NextResponse.json<Response<null>>(
         {
            success: false,
            message: "Failed get title provinsi",
            error: "Something went wrong",
         },
         {
            status: 500,
         }
      );
   }
};

export { POST };
