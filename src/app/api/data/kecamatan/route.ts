import { getKecamatanByKotaId } from "@/services/kecamatan.service";
import { ServerResponse } from "@/types/server-response";
import { Kecamatan } from "@/types/data";
import { NextRequest, NextResponse } from "next/server";
import { isKotaIdValid } from "@/services/validation.service";

const GET = async (request: NextRequest) => {
   try {
      const searchParams = request.nextUrl.searchParams;
      const kotaId = searchParams.get("kotaId")!;

      if (!kotaId) {
         return NextResponse.json<ServerResponse>(
            {
               code: 400,
               success: false,
               message: "Permintaan buruk",
               errors: {
                  kotaId: ["Query kota ID tidak boleh kosong"],
               },
            },
            {
               status: 400,
            }
         );
      }

      const isKotaIdExist = await isKotaIdValid(kotaId);

      if (!isKotaIdExist) {
         return NextResponse.json<ServerResponse>({
            code: 400,
            success: false,
            message: "Permintaan buruk",
            errors: {
               kecamatanId: ["Kota ID tidak valid"],
            },
         });
      }

      const res = await getKecamatanByKotaId(kotaId);

      if (!res || res.length === 0) {
         return NextResponse.json<ServerResponse>(
            {
               code: 404,
               success: false,
               message: "Data kecamatan tidak ditemukan",
               errors: {
                  data: [`Data kecamatan dengan kota ID ${kotaId} tidak ditemukan`],
               },
            },
            {
               status: 404,
            }
         );
      }

      return NextResponse.json<ServerResponse<Omit<Kecamatan, "desa">[]>>(
         {
            code: 200,
            success: true,
            message: "Berhasil mengambil data kecamatan",
            data: res,
         },
         {
            status: 200,
         }
      );
   } catch (error) {
      console.error("FAILED_GET_KECAMATAN: ", error);
      return NextResponse.json<ServerResponse>(
         {
            code: 500,
            success: false,
            message: "Gagal mengambil data kecamatan",
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
