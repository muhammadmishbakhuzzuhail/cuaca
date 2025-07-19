"use client";

import { convertToEnglishDate } from "@/utils/convertToEnglishDate";
import { getDetailCuaca } from "@/utils/getDetailCuaca";
import { useQuery } from "@tanstack/react-query";
import ButtonBack from "@/app/_components/button-back";
import { IoLocationOutline } from "react-icons/io5";
import { SwitchImage } from "@/utils/switchImage";
import Image from "next/image";
import { BsWind } from "react-icons/bs";
import { WiHumidity } from "react-icons/wi";
import { categorizeByDate } from "@/utils/categorizeDate";
import CardMiddleDetailInformation from "@/app/_components/card-middle-detail-information";
import SummarizeWeather from "@/app/_components/summarize-weather";
import { averageWeatherDesc, getMinMaxTemperature } from "@/utils/summarizeWeather";
import LineChart from "@/app/_components/line-chart";
import { useMainStore } from "@/hooks/ueMainStore";

const CuacaClient = ({ paramsDesaId }: { paramsDesaId: string }) => {
   const { mainDesaId } = useMainStore();

   const queryDesaId = paramsDesaId ?? mainDesaId;

   const { data, isLoading, isError } = useQuery({
      queryKey: ["cuaca", queryDesaId],
      queryFn: () => getDetailCuaca(queryDesaId as string),
      enabled: !!queryDesaId,
   });

   if (isLoading) {
      return <div>Memuat data cuaca...</div>;
   }

   if (isError) {
      return <div>Terjadi kesalahan saat mengambil data cuaca.</div>;
   }

   const main = data?.data;

   const lokasi = main?.lokasi;

   if (!lokasi) return <div>Lokasi tidak ditemukan</div>;
   const { desa, kecamatan, kotkab, provinsi, timezone } = lokasi;

   const cuaca = main?.data?.[0]?.cuaca;
   const listCuaca = [...cuaca[0], ...cuaca[1], ...cuaca[2]];

   const currentWeather = listCuaca[0];

   const [, time] = currentWeather.local_datetime.split(" ");

   const { jam, hari, bulan, tahun } = convertToEnglishDate({
      datetime: currentWeather.local_datetime,
   });

   const { today, tomorrow, afterTomorrow } = categorizeByDate(listCuaca);

   const avgTodayWeather = averageWeatherDesc(today)!;
   const avgTomorrowWeather = averageWeatherDesc(tomorrow)!;
   const avgAfterTomorrowWeather = averageWeatherDesc(afterTomorrow)!;

   const todayTemperature = getMinMaxTemperature(today)!;
   const tomorrowTemperature = getMinMaxTemperature(tomorrow)!;
   const afterTomorrowTemperature = getMinMaxTemperature(afterTomorrow)!;

   const todayNamaHari = convertToEnglishDate({ datetime: today[0].local_datetime }).hari;
   const tomorrowNamaHari = convertToEnglishDate({ datetime: tomorrow[0].local_datetime }).hari;
   const afterTomorrowNamaHari = convertToEnglishDate({
      datetime: afterTomorrow[0].local_datetime,
   }).hari;

   const listTime: string[] = [];
   const listTemperature: number[] = [];
   listCuaca.forEach(({ local_datetime, t }) => {
      listTime.push(local_datetime.slice(11, 16));
      listTemperature.push(t);
   });

   return (
      <div className="h-screen font-plus-jakarta-sans space-y-4">
         <header className="flex item-center bg-white rounded-xl py-2 px-4 border border-purple-200 shadow-md shadow-purple-200">
            <div className="flex-1">
               <ButtonBack />
            </div>
            <div className="flex-1 flex items-center gap-1 font-normal text-sm text-slate-700">
               <IoLocationOutline size={20} className="text-blue-600" />
               {desa}, {kecamatan}, {kotkab}, {provinsi}
            </div>
            <div className="flex gap-12 text-base text-slate-700">
               <div className="flex items-center gap-1 font-light">
                  {time.slice(0, 5)}
                  <span className="text-[10px] leading-none text-slate-500">
                     Local
                     <br />
                     Time
                  </span>
               </div>
               <div className="flex items-center gap-1 font-light">
                  {hari} {currentWeather.local_datetime.slice(0, 2)} {bulan}{" "}
                  <span className="text-[10px] leading-none text-slate-500">
                     {tahun} <br /> Date
                  </span>
               </div>
               <div className="flex items-center gap-1 text-sm">
                  <div className="flex flex-col">
                     <span className="leading-none">{timezone.split("/")[0]}</span>
                     <span className="leading-none">{timezone.split("/")[1]}</span>
                  </div>
                  <span className="text-[10px] text-slate-500 leading-none">
                     Time
                     <br />
                     Zone
                  </span>
               </div>
            </div>
         </header>
         <section className="grid grid-cols-4 gap-4">
            <main className="col-span-3 grid grid-cols-2 text-slate-700">
               <div className="p-4 space-y-4 self-center">
                  <div className="flex items-start relative">
                     <div className="text-9xl leading-none font-light">{currentWeather.t}</div>
                     <div className="text-4xl leading-none relative translate-y-4">&deg;c</div>
                  </div>
                  <p className="text-4xl">{currentWeather.weather_desc}</p>
                  <div className="flex gap-8 mt-12">
                     <div className="space-y-1 bg-purple-300 px-4 py-1.5 rounded-md shadow-md shadow-purple-500">
                        <div className="flex items-center gap-1.5 font-medium">
                           <div className="w-5 h-5 relative">
                              <BsWind size={18} />
                           </div>
                           <span className="text-xs">Angin</span>
                        </div>
                        <p className="text-2xl font-medium text-blue-700">
                           {currentWeather.ws}km/h
                        </p>
                     </div>
                     <div className="space-y-1 bg-purple-300 px-4 py-1.5 rounded-md shadow-md shadow-purple-500">
                        <div className="flex items-center gap-1.5 font-medium">
                           <div className="w-5 h-5 relative overflow-hidden">
                              <WiHumidity className="w-[30px] h-[30px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 absolute" />
                           </div>
                           <span className="text-xs">Kelembapan</span>
                        </div>
                        <p className="text-2xl font-medium text-blue-700">{currentWeather.hu}%</p>
                     </div>
                  </div>
               </div>
               <div className="relative w-full aspect-[4/3]">
                  <div>
                     <Image
                        src={SwitchImage(currentWeather.weather_desc, jam)}
                        alt="Image weather"
                        fill
                        className="object-contain"
                        unoptimized
                        quality={100}
                     />
                  </div>
               </div>
            </main>
            <aside className="relative pl-10 pt-6">
               <SummarizeWeather
                  today={{
                     weatherDesc: avgTodayWeather.weatherDesc,
                     imageWeather: avgTodayWeather.imageWeather,
                     minTemperature: todayTemperature.minTemperature,
                     maxTemperature: todayTemperature.maxTemperature,
                     hari: todayNamaHari,
                  }}
                  tomorrow={{
                     weatherDesc: avgTomorrowWeather.weatherDesc,
                     imageWeather: avgTomorrowWeather.imageWeather,
                     minTemperature: tomorrowTemperature.minTemperature,
                     maxTemperature: tomorrowTemperature.maxTemperature,
                     hari: tomorrowNamaHari,
                  }}
                  afterTomorrow={{
                     weatherDesc: avgAfterTomorrowWeather.weatherDesc,
                     imageWeather: avgAfterTomorrowWeather.imageWeather,
                     minTemperature: afterTomorrowTemperature.minTemperature,
                     maxTemperature: afterTomorrowTemperature.maxTemperature,
                     hari: afterTomorrowNamaHari,
                  }}
               />
            </aside>
         </section>
         <CardMiddleDetailInformation currentWeather={currentWeather} />
         <div className="w-full h-96 p-4 ">
            <LineChart
               data={{
                  labels: listTime,
                  datasets: [{ label: "Suhu (°C)", data: listTemperature }],
               }}
            />
         </div>
      </div>
   );
};

export default CuacaClient;
