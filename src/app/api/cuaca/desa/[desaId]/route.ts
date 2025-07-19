import { isDesaIdValid } from "@/services/validation.service";
import { Cuaca } from "@/types/cuaca";
import { ServerResponse } from "@/types/server-response";
import axios from "axios";
import { NextResponse } from "next/server";

const GET = async (request: Request, { params }: { params: Promise<{ desaId: string }> }) => {
   try {
      console.log("async", request.method);
      const { desaId } = await params;

      if (!desaId) {
         return NextResponse.json<ServerResponse>(
            {
               code: 400,
               success: false,
               message: "Permintaan buruk",
               errors: {
                  desaId: ["Rute dinamis desa ID tidak boleh kosong"],
               },
            },
            {
               status: 400,
            }
         );
      }

      const isDesaIdExist = await isDesaIdValid(desaId);

      if (!isDesaIdExist) {
         return NextResponse.json<ServerResponse>(
            {
               code: 400,
               success: false,
               message: "Permintaan buruk",
               errors: {
                  desaId: ["Desa ID tidak valid"],
               },
            },
            {
               status: 400,
            }
         );
      }

      const response = await axios.get<Cuaca>(
         `https://api.bmkg.go.id/publik/prakiraan-cuaca?adm4=${desaId}`
      );

      return NextResponse.json<ServerResponse<Cuaca>>(
         {
            code: 200,
            success: true,
            message: "Berhasil mengambil data cuaca",
            data: response.data,
         },
         {
            status: 200,
         }
      );
   } catch (error) {
      console.error("FAILED_GET_CUACA: ", error);
      return NextResponse.json<ServerResponse>(
         {
            code: 500,
            success: true,
            message: "Gagal mengambil data cuaca",
            errors: {
               server: ["Terjadi kesalahan pada server. Silahkan coba lagi nanti"],
            },
         },
         {
            status: 500,
         }
      );
   }
};

export { GET };
