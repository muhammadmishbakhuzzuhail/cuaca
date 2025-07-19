import { getDesaByInput } from "@/services/desa.service";
import { getKecamatanByInput } from "@/services/kecamatan.service";
import { getKotaByInput } from "@/services/kota.service";
import { ServerResponse } from "@/types/server-response";
import { NextRequest, NextResponse } from "next/server";

interface Data {
   desaId: string;
   namaDesa: string;
   kecamatanId: string;
   namaKecamatan: string;
   kotaId: string;
   namaKota: string;
}

const GET = async (request: NextRequest) => {
   try {
      const input = request.nextUrl.searchParams.get("input");

      if (!input) {
         return NextResponse.json<ServerResponse>(
            {
               code: 400,
               success: false,
               message: "Permintaan buruk",
               errors: {
                  input: ["Query input tidak boleh kosong"],
               },
            },
            {
               status: 400,
            }
         );
      }

      const dataDesa = await getDesaByInput(input);

      const setKecamatanId = new Set<string>();
      const setKotaId = new Set<string>();

      dataDesa.forEach((item) => {
         const [provinsiId, partKotaId, partKecamatanId] = item.desaId.split(".");

         const kecamatanId = `${provinsiId}.${partKotaId}.${partKecamatanId}`;
         const kotaId = `${provinsiId}.${partKotaId}`;

         setKecamatanId.add(kecamatanId);
         setKotaId.add(kotaId);
      });

      const listKecamatanId = Array.from(setKecamatanId);
      const listKotaId = Array.from(setKotaId);

      const dataKecamatan = await getKecamatanByInput(listKecamatanId);
      const dataKota = await getKotaByInput(listKotaId);

      const res: Data[] = [];

      dataDesa.forEach((desa) => {
         dataKecamatan.forEach((kecamatan) => {
            const isSameKecamatanId = desa.desaId.slice(0, 8) === kecamatan.kecamatanId;
            dataKota.forEach((kota) => {
               const isSameKotaId = desa.desaId.slice(0, 5) === kota.kotaId;

               if (isSameKecamatanId && isSameKotaId) {
                  res.push({
                     ...desa,
                     ...kecamatan,
                     ...kota,
                  });
               }
            });
         });
      });

      return NextResponse.json<ServerResponse<Data[]>>(
         {
            code: 200,
            success: true,
            message: "Berhasil mengambil semua nama desa",
            data: res,
         },
         { status: 200 }
      );
   } catch (error) {
      console.error("FAILED_GET_DESA: ", error);
      return NextResponse.json<ServerResponse>({
         code: 500,
         success: false,
         message: "Gagal mengambil semua nama desa",
         errors: {
            input: ["Terjadi kesalahan pada server. Silahkan coba lagi nanti"],
         },
      });
   }
};

export { GET };
