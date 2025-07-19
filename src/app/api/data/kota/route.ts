import { getKotaByProvinsiId } from "@/services/kota.service";
import { isProvinsiIdValid } from "@/services/validation.service";
import { Kota } from "@/types/data";
import { ServerResponse } from "@/types/server-response";
import { NextRequest, NextResponse } from "next/server";

const GET = async (request: NextRequest) => {
   try {
      const searchParams = request.nextUrl.searchParams;
      const provinsiId = searchParams.get("provinsiId")!;

      if (!provinsiId) {
         return NextResponse.json<ServerResponse>(
            {
               code: 400,
               success: false,
               message: "Permintaan buruk",
               errors: {
                  provinsiId: ["Query provinsi ID tidak boleh kosong"],
               },
            },
            {
               status: 400,
            }
         );
      }

      const isProvinsiIdExist = await isProvinsiIdValid(provinsiId);

      if (!isProvinsiIdExist) {
         return NextResponse.json<ServerResponse>({
            code: 400,
            success: false,
            message: "Permintaan buruk",
            errors: {
               kecamatanId: ["Kota ID tidak valid"],
            },
         });
      }

      const res = await getKotaByProvinsiId(provinsiId);

      if (!res || res.length === 0) {
         return NextResponse.json<ServerResponse>(
            {
               code: 404,
               success: false,
               message: `Data kota tidak ditemukan`,
               errors: {
                  data: [`Data kota dengan provinsi ID ${provinsiId} tidak ditemukan`],
               },
            },
            {
               status: 404,
            }
         );
      }

      return NextResponse.json<ServerResponse<Omit<Kota, "kecamatan">[]>>(
         {
            code: 200,
            success: true,
            message: "Berhasil mengambil data kota",
            data: res,
         },
         {
            status: 200,
         }
      );
   } catch (error) {
      console.error("FAILED_GET_KOTA: ", error);
      return NextResponse.json<ServerResponse>(
         {
            code: 500,
            success: false,
            message: "Gagal mengambil data kota",
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
