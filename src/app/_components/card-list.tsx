import {
   Card,
   CardContent,
   CardDescription,
   CardFooter,
   CardHeader,
   CardTitle,
} from "@/components/ui/card";
import { convertToIndonesianDate } from "@/utils/convertToIndonesianDate";
import { convertWindDirectionToIndonesian } from "@/utils/convertWindDirectionToIndonesian";
import Image from "next/image";
// import { CuacaListItem } from "@/types/list-cuaca";
import Link from "next/link";
import { IoInformationCircleOutline } from "react-icons/io5";
interface CuacaListItem {
   desa?: string;
   kecamatan?: string;
   kotkab?: string;
   provinsi?: string;
   cuaca?: {
      local_datetime?: string;
      weather_desc?: string;
      t?: number;
      hu?: number;
      ws?: number;
      wd?: string;
      wd_to?: string;
   };
}

const CardList = ({
   cuaca: {
      hu = 83,
      local_datetime = "2025-07-11 02:00:00",
      t = 24,
      wd = "S",
      wd_to = "N",
      weather_desc = "Cerah Berawan",
      ws = 4.5,
   } = {},
   desa = "Gambir",
   kecamatan = "Gebog",
   kotkab = "Jepara",
   provinsi = "Jawa Tengah",
}: CuacaListItem) => {
   let image_weather_desc;

   const tanggal = new Date(local_datetime);
   const jam = tanggal.getHours();
   const isMalam = jam >= 18 || jam < 6;

   switch (weather_desc) {
      case "Cerah Berawan":
         if (isMalam) {
            image_weather_desc = "/Malam cerah berawan.png";
         } else {
            image_weather_desc = "/Pagi cerah berawan.png";
         }
         break;
      case "Cerah":
         if (isMalam) {
            image_weather_desc = "/Malam cerah.png";
         } else {
            image_weather_desc = "/Pagi cerah.png";
         }
         break;
      case "Berawan":
         image_weather_desc = "/Berawan.png";
         break;
      case "Hujan Ringan":
      case "Hujan Sedang":
      case "Hujan Lebat":
         image_weather_desc = "/Hujan.png";
         break;
      case "Hujan Petir":
         image_weather_desc = "/Hujan petir.png";
         break;
      default:
         image_weather_desc = "/Berangin.png";
   }

   const formatted = convertToIndonesianDate({ datetime: local_datetime });

   return (
      <Card className="relative p-0 rounded-sm shadow-purple-200 py-2 gap-0">
         <CardHeader className="gap-0">
            <CardTitle className="text-center">
               <Link
                  href={"#"}
                  className="text-purple-700 hover:text-white text-lg bg-purple-100 hover:bg-purple-500 rounded-xs px-8"
               >
                  Desa {desa}
               </Link>
            </CardTitle>
         </CardHeader>
         <div className="flex flex-row items-center px-4">
            <CardDescription className="flex-1 space-y-1 text-black">
               {/* Kelembapan */}
               <div className="flex items-center gap-1">
                  <div className="relative w-6">
                     <Image
                        alt="kelembapan"
                        src="/Kelembapan.png"
                        width={20}
                        height={20}
                        quality={100}
                        unoptimized
                        className="mx-auto"
                     />
                  </div>
                  <div className="relative w-22 flex items-center font-medium">
                     Kelembapan <span className="ml-auto">:</span>
                  </div>
                  <p>{hu}%</p>
               </div>
               {/* Kecepatan Angin */}
               <div className="flex items-center gap-1">
                  <div className="relative w-6">
                     <Image
                        alt="Kecepatan angin"
                        src="/wind-speed.png"
                        width={20}
                        height={20}
                        quality={100}
                        unoptimized
                        className="mx-auto"
                     />
                  </div>
                  <div className="relative w-22 flex items-center font-medium">
                     Kecepatan<span className="ml-auto">:</span>
                  </div>
                  <p>{ws}km/jam</p>
               </div>
               {/* Arah Angin */}
               <div className="flex items-center gap-1">
                  <div className="relative w-6">
                     <Image
                        alt="Arah angin"
                        src="/wind-direction.png"
                        width={20}
                        height={20}
                        quality={100}
                        unoptimized
                        className="mx-auto"
                     />
                  </div>
                  <div className="relative w-22 flex items-center font-medium">
                     Arah<span className="ml-auto">:</span>
                  </div>
                  <p>
                     {convertWindDirectionToIndonesian({ direction: wd })} ke{" "}
                     {convertWindDirectionToIndonesian({ direction: wd_to })}
                  </p>
               </div>
            </CardDescription>
            {/* Image */}
            <CardContent className="w-48 h-32 p-6 relative z-10">
               <Image
                  src={image_weather_desc}
                  alt="image weather"
                  className="object-contain"
                  fill
                  unoptimized
                  quality={100}
               />
            </CardContent>
         </div>
         {/* Informasi Tambahan */}
         <CardFooter className="text-xs block px-6 pb-2">
            <div className="relative py-1 px-2 rounded-sm bg-slate-100">
               <div className="flex items-center gap-1 mb-1">
                  <IoInformationCircleOutline size={12} />
                  <span>Detail information</span>
               </div>
               <hr className="border-slate-300" />
               <div className="leading-none space-y-1 px-4 py-1">
                  <div className="flex items-center gap-1">
                     <div className="relative w-12 flex items-center ">
                        Waktu <span className="ml-auto">:</span>
                     </div>
                     <p>{local_datetime.slice(11, 16)} WIB</p>
                  </div>
                  <div className="flex items-center gap-1">
                     <div className="relative w-12 flex items-center ">
                        Tanggal <span className="ml-auto">:</span>
                     </div>
                     <p>{formatted}</p>
                  </div>
                  <div className="flex items-center gap-1">
                     <div className="relative w-12 flex items-center self-start shrink-0 ">
                        Lokasi <span className="ml-auto">:</span>
                     </div>
                     <p className="whitespace-normal relative">
                        {kecamatan}, {kotkab}, {provinsi}
                     </p>
                  </div>
               </div>
            </div>
         </CardFooter>

         {/* Suhu */}
         <div className="absolute right-1 top-1 flex items-center gap-0.5 z-10">
            <span
               className={`px-1 rounded-xs text-sm font-medium leading-none py-0.5 ${
                  t > 24 ? "bg-red-300" : "bg-blue-300"
               }`}
            >
               {t}&deg;C
            </span>
            <Image
               src={t > 24 ? "/Suhu panas.png" : "/Suhu dingin.png"}
               alt="suhu"
               width={15}
               height={30}
               quality={100}
               unoptimized
            />
         </div>
      </Card>
   );
};

export default CardList;
