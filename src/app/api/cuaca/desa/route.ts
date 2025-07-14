import { WeatherResponse } from "@/types/axios-response";
import { Response } from "@/types/server-response";
import axios from "axios";
import { NextResponse } from "next/server";

const POST = async ({ params }: { params: { id: string } }) => {
   try {
      const id = parseInt(params.id);

      if (!id) {
         return NextResponse.json<Response>(
            {
               success: false,
               message: "Params id is invalid",
               error: "Bad request",
            },
            {
               status: 400,
            }
         );
      }

      const response = await axios.get<WeatherResponse>(
         `https://api.bmkg.go.id/publik/prakiraan-cuaca?adm4=${id}`
      );

      return NextResponse.json<Response<WeatherResponse>>(
         {
            success: true,
            message: "Success fetch data",
            data: response.data,
         },
         { status: 200 }
      );
   } catch (error) {
      console.error("FAILED_FETCH_DETAIL_INFORMATION: ", error);
      return NextResponse.json<Response>(
         {
            success: false,
            message: "Failed fetch information",
            error: "Something went wrong",
         },
         {
            status: 500,
         }
      );
   }
};

export { POST };
