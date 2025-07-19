import { getDesaByKecamatanId } from "@/services/desa.service";
import { isKecamatanIdValid } from "@/services/validation.service";
import { Desa } from "@/types/data";
import { ServerResponse } from "@/types/server-response";
import { NextRequest, NextResponse } from "next/server";

const GET = async (request: NextRequest) => {
   try {
      const searchParams = request.nextUrl.searchParams;
      const kecamatanId = searchParams.get("kecamatanId")!;

      if (!kecamatanId) {
         return NextResponse.json<ServerResponse>(
            {
               code: 400,
               success: false,
               message: "Permintaan buruk",
               errors: {
                  kotaId: ["Query kecamatan ID tidak boleh kosong"],
               },
            },
            {
               status: 400,
            }
         );
      }

      const isKecamatanIdExist = await isKecamatanIdValid(kecamatanId);

      if (!isKecamatanIdExist) {
         return NextResponse.json<ServerResponse>({
            code: 400,
            success: false,
            message: "Permintaan buruk",
            errors: {
               kecamatanId: ["Kecamatan ID tidak valid"],
            },
         });
      }

      const res = await getDesaByKecamatanId(kecamatanId);

      if (!res || res.length === 0) {
         return NextResponse.json<ServerResponse>(
            {
               code: 404,
               success: false,
               message: "Data desa tidak ditemukan",
               errors: {
                  data: [`Data desa dengan kecamatan ID ${kecamatanId} tidak ditemukan`],
               },
            },
            {
               status: 404,
            }
         );
      }

      return NextResponse.json<ServerResponse<Desa[]>>(
         {
            code: 200,
            success: true,
            message: "Berhasil mengambil data desa",
            data: res,
         },
         {
            status: 200,
         }
      );
   } catch (error) {
      console.error("FAILED_GET_DESA: ", error);
      return NextResponse.json<ServerResponse>(
         {
            code: 500,
            success: false,
            message: "Gagal mengambil data desa",
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
