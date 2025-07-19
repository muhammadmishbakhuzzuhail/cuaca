import { getAllProvinsi } from "@/services/provinsi.service";
import { ServerResponse } from "@/types/server-response";
import { NextResponse } from "next/server";
import { Provinsi } from "@/types/data";

const GET = async () => {
   try {
      const res = await getAllProvinsi();

      if (!res || res.length === 0) {
         return NextResponse.json<ServerResponse>(
            {
               code: 404,
               success: false,
               message: "Data provinsi tidak ditemukan",
               errors: {
                  data: [`Data provinsi tidak ditemukan di dalam tabel provinsi`],
               },
            },
            {
               status: 404,
            }
         );
      }

      return NextResponse.json<ServerResponse<Omit<Provinsi, "kota">[]>>(
         {
            code: 200,
            success: true,
            message: "Berhasil mengambil data provinsi",
            data: res,
         },
         {
            status: 200,
         }
      );
   } catch (error) {
      console.error("FAILED_GET_PROVINSI: ", error);
      return NextResponse.json<ServerResponse>(
         {
            code: 500,
            success: false,
            message: "Gagal mengambil data provinsi",
            errors: { server: ["Terjadi kesalahan pada server. Silakan coba lagi nanti."] },
         },
         {
            status: 500,
         }
      );
   }
};

export { GET };
