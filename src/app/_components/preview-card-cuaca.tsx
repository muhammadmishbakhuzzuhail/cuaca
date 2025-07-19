import {
   Card,
   CardContent,
   CardDescription,
   CardFooter,
   CardHeader,
   CardTitle,
} from "@/components/ui/card";
import { convertToEnglishDate } from "@/utils/convertToEnglishDate";
import Image from "next/image";
import { PreviewCuaca } from "@/types/preview-cuaca";
import Link from "next/link";
import { SwitchImage } from "@/utils/switchImage";

const PreviewCardCuaca = ({
   cuaca: { hu, local_datetime, t, wd, wd_to, weather_desc, ws },
   desa,
   kecamatan,
   kotkab,
   provinsi,
   desaId,
}: PreviewCuaca) => {
   const { jam, hari, bulan, tanggal } = convertToEnglishDate({ datetime: local_datetime });

   const image_weather_desc = SwitchImage(weather_desc, jam);

   const [, waktu] = local_datetime.split(" ");
   const [HH, MM] = waktu.split(":");
   return (
      <Card className="relative p-0 rounded-sm shadow-black/10 shadow-lg py-1 gap-1 bg-white border-1 border-gray-200 select-none font-plus-jakarta-sans">
         <CardHeader className="gap-0 group/title">
            <CardTitle className="text-center ">
               <Link
                  href={`/cuaca/desa/${desaId}`}
                  className="text-purple-700 text-xl font-medium active:scale-95 hover:text-purple-800 transform transition-transform duration-200 inline-block"
               >
                  {desa}
               </Link>
            </CardTitle>
            <CardDescription className="text-center text-slate-500 text-xs">
               {hari}, {tanggal} {bulan} {HH}:{MM}
            </CardDescription>
         </CardHeader>
         <CardContent className="grid grid-cols-2 text-blue-500">
            <h1 className="flex-1 text-center self-center text-7xl">{t}&deg;</h1>
            <div className="p-6 relative h-32">
               <Image
                  src={image_weather_desc}
                  alt="image weather"
                  className="object-contain"
                  fill
                  unoptimized
                  quality={100}
               />
               <p className="absolute z-20 inset-x-0 text-center leading-none -bottom-2 text-xs font-light text-slate-700">
                  {weather_desc}
               </p>
            </div>
         </CardContent>
         {/* Informasi Tambahan */}
         <CardFooter className="font-light py-2">
            <CardDescription className="w-full space-y-1 py-1">
               <div className="grid grid-cols-3 w-72 justify-items-center mx-auto rounded-full bg-blue-500 backdrop-blur-2xl px-4 shadow-gray-900/50 shadow-xs">
                  <div className="flex-col items-center gap-1 w-18">
                     <div className="relative ">
                        <Image
                           alt="kelembapan"
                           src="/Kelembapan.png"
                           width={24}
                           height={24}
                           quality={100}
                           unoptimized
                           className="mx-auto"
                        />
                     </div>
                     <p className="text-xs text-center font-medium text-white">{hu} %</p>
                     <p className="text-[9px] text-center text-slate-200">Kelembapan</p>
                  </div>
                  <div className="flex-col items-center gap-1 w-18">
                     <div className="relative ">
                        <Image
                           alt="Kecepatan angin"
                           src="/wind-speed.png"
                           width={24}
                           height={24}
                           quality={100}
                           unoptimized
                           className="mx-auto"
                        />
                     </div>
                     <p className="text-xs font-medium text-white text-center">{ws} km/h</p>
                     <p className="text-[9px] text-center text-slate-200">Kecepatan</p>
                  </div>
                  <div className="flex-col items-center gap-1 w-18">
                     <div className="relative">
                        <Image
                           alt="Arah angin"
                           src="/wind-direction.png"
                           width={24}
                           height={24}
                           quality={100}
                           unoptimized
                           className="mx-auto"
                        />
                     </div>
                     <p className="text-xs font-medium text-white text-center">
                        {wd} to {wd_to}
                     </p>
                     <p className="text-[9px] text-center text-slate-200">Arah</p>
                  </div>
               </div>
               <p className="text-xs font-light text-slate-700 text-center">
                  {kecamatan}, {kotkab}, {provinsi}
               </p>
            </CardDescription>
         </CardFooter>
         <div className="absolute -right-2 -top-4 flex items-center gap-0.5 z-10">
            <Image
               src={t > 24 ? "/Suhu panas.png" : "/Suhu dingin.png"}
               alt="suhu"
               width={20}
               height={40}
               quality={100}
               unoptimized
            />
         </div>
      </Card>
   );
};

export default PreviewCardCuaca;
