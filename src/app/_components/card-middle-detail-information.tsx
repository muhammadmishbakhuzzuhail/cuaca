import { DetailCuaca } from "@/types/cuaca";
import {
   convertTccToText,
   convertTpToText,
   convertVisibilityToText,
   convertWindDirectionToText,
} from "@/utils/weather";
import { GiWindsock } from "react-icons/gi";
import { IoIosArrowRoundForward } from "react-icons/io";
import { IoCloudOutline } from "react-icons/io5";
import { MdOutlineVisibility } from "react-icons/md";
import { WiRaindrops } from "react-icons/wi";

type OmitDetailCuaca =
   | "datetime"
   | "weather"
   | "weather_desc_en"
   | "vs_text"
   | "time_index"
   | "analysis_date"
   | "image"
   | "utc_datetime";

type Data = Omit<DetailCuaca, OmitDetailCuaca>;

const CardMiddleDetailInformation = ({ currentWeather }: { currentWeather: Data }) => {
   return (
      <div className="flex justify-center text-slate-700">
         <div className="flex gap-8">
            <div className="relative space-y-1 w-52 px-2 py-1 bg-white rounded-xl border border-purple-200 shadow-md shadow-purple-200 h-32 flex flex-col">
               <div className="flex items-center gap-1.5 justify-center font-semibold">
                  <div className="w-5 h-5 relative overflow-hidden text-blue-700">
                     <IoCloudOutline size={18} />
                  </div>
                  <span className="text-xs">Tutupan awan</span>
               </div>
               <p className="text-lg font-medium text-center text-purple-700">
                  {currentWeather.tcc}%
               </p>
               <p className="text-[10px] border-t border-t-slate-300 p-2 rounded-md shadow grow">
                  {convertTccToText(currentWeather.tcc)}
               </p>
            </div>
            <div className="relative space-y-1 w-52 px-2 py-1 bg-white rounded-xl border border-purple-200 shadow-md shadow-purple-200 h-32 flex flex-col">
               <div className="flex items-center gap-1.5 justify-center font-semibold">
                  <div className="w-5 h-5 relative overflow-hidden text-blue-700">
                     <WiRaindrops className="w-[40px] h-[40px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 absolute" />
                  </div>
                  <span className="text-xs">Curah hujan</span>
               </div>
               <p className="text-lg font-medium text-center text-purple-700">
                  {currentWeather.tp}mm
               </p>
               <p className="text-[10px] border-t border-t-slate-300 p-2 rounded-md shadow grow">
                  {convertTpToText(currentWeather.tp)}
               </p>
            </div>
            <div className="relative space-y-1 w-52 px-2 py-1 bg-white rounded-xl border border-purple-200 shadow-md shadow-purple-200 h-32 flex flex-col">
               <div className="flex items-center gap-1.5 justify-center font-semibold">
                  <div className="w-5 h-5 relative overflow-hidden text-blue-700">
                     <GiWindsock size={16} />
                  </div>
                  <span className="text-xs">Arah angin</span>
               </div>
               <p className="text-lg font-medium text-center text-purple-700 flex items-center justify-center">
                  {currentWeather.wd}
                  <IoIosArrowRoundForward size={24} />
                  {currentWeather.wd_to}
               </p>
               <p className="text-[10px] border-t border-t-slate-300 p-2 rounded-md shadow grow">
                  {
                     convertWindDirectionToText(
                        currentWeather.wd,
                        currentWeather.wd_to,
                        currentWeather.wd_deg
                     ).deskripsi
                  }
               </p>
            </div>
            <div className="relative space-y-1 w-52 px-2 py-1 bg-white rounded-xl border border-purple-200 shadow-md shadow-purple-200 h-32 flex flex-col">
               <div className="flex items-center gap-1.5 justify-center font-semibold">
                  <div className="w-5 h-5 relative text-blue-700">
                     <MdOutlineVisibility className="w-[16px] h-[16px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 absolute" />
                  </div>
                  <span className="text-xs">Visibilitas</span>
               </div>
               <p className="text-lg font-medium text-center text-purple-700 flex items-center justify-center">
                  {convertVisibilityToText(currentWeather.vs).value}
               </p>
               <p className="text-[10px] border-t border-t-slate-300 p-2 rounded-md shadow grow">
                  {convertVisibilityToText(currentWeather.vs).description}
               </p>
            </div>
         </div>
      </div>
   );
};

export default CardMiddleDetailInformation;
