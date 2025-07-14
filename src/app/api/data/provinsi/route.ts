import { getListProvinsi } from "@/services/provinsi.service";
import type { Response } from "@/types/server-response";
import { NextResponse } from "next/server";

type Data = { kode: string; nama: string };

const GET = async () => {
   try {
      const res = await getListProvinsi();

      if (!res || res.length === 0) {
         return NextResponse.json<Response<null>>(
            {
               success: false,
               message: "List provinsi is empty",
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
            message: "Success get list provinsi",
            data: res,
         },
         {
            status: 200,
         }
      );
   } catch (error) {
      console.error("FAILED_GET_LIST_PROVINSI: ", error);
      return NextResponse.json<Response>(
         {
            success: false,
            message: "Failed get list provinsi",
            error: "Something went wrong",
         },
         {
            status: 500,
         }
      );
   }
};

export { GET };
