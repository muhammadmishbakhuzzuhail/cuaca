import Image from "next/image";

type Data = {
   weatherDesc: string;
   imageWeather: string;
   minTemperature: number;
   maxTemperature: number;
   hari: string;
};

const SummarizeWeather = ({
   today,
   tomorrow,
   afterTomorrow,
}: {
   today: Data;
   tomorrow: Data;
   afterTomorrow: Data;
}) => {
   return (
      <div className="bg-purple-200 rounded-md border border-purple-300 shadow shadow-purple-300 p-2 space-y-2">
         <p className="text-center font-medium text-slate-700">Prediksi Cuaca</p>
         <ul className="text-slate-700 space-y-2">
            <li className="flex gap-1 items-center">
               <div className="relative w-16 aspect-[4/3]">
                  <Image
                     src={today.imageWeather}
                     alt="today weather"
                     fill
                     className="object-contain"
                  />
               </div>
               <div className="flex-1 leading-none space-y-2 self-start">
                  <p className="text-sm">{today.hari}</p>
                  <p className="text-[10px] text-slate-500">{today.weatherDesc}</p>
               </div>
               <div className="relative w-20">
                  {today.minTemperature}-{today.maxTemperature}&deg;c
               </div>
            </li>
            <li className="flex gap-1 items-center">
               <div className="relative w-16 aspect-[4/3]">
                  <Image
                     src={tomorrow.imageWeather}
                     alt="today weather"
                     fill
                     className="object-contain"
                  />
               </div>
               <div className="flex-1 leading-none space-y-2 self-start">
                  <p className="text-sm">{tomorrow.hari}</p>
                  <p className="text-[10px] text-slate-500">{tomorrow.weatherDesc}</p>
               </div>
               <div className="relative w-20">
                  {tomorrow.minTemperature}-{tomorrow.maxTemperature}&deg;c
               </div>
            </li>
            <li className="flex gap-1 items-center">
               <div className="relative w-16 aspect-[4/3]">
                  <Image
                     src={afterTomorrow.imageWeather}
                     alt="today weather"
                     fill
                     className="object-contain"
                  />
               </div>
               <div className="flex-1 leading-none space-y-2 self-start">
                  <p className="text-sm">{afterTomorrow.hari}</p>
                  <p className="text-[10px] text-slate-500">{afterTomorrow.weatherDesc}</p>
               </div>
               <div className="relative w-20">
                  {afterTomorrow.minTemperature}-{afterTomorrow.maxTemperature}&deg;c
               </div>
            </li>
         </ul>
      </div>
   );
};

export default SummarizeWeather;
