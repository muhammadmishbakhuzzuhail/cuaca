import { DetailCuaca } from "@/types/cuaca";
import { SwitchImage } from "./switchImage";

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

export const getMinMaxTemperature = (listData: Data[]) => {
   if (listData.length === 0) {
      return;
   }

   let minTemperature = listData[0].t;
   let maxTemperature = listData[0].t;

   for (let i = 1; i < listData.length; i++) {
      const temp = listData[i].t;
      minTemperature = Math.min(minTemperature, temp);
      maxTemperature = Math.max(maxTemperature, temp);
   }

   return { minTemperature, maxTemperature };
};

export const averageWeatherDesc = (listData: Data[]) => {
   if (listData.length === 0) {
      return;
   }

   const dictAverageWeatherDesc: Record<string, number> = {};

   listData.forEach(({ weather_desc }) => {
      if (weather_desc in dictAverageWeatherDesc) {
         dictAverageWeatherDesc[weather_desc]++;
      } else {
         dictAverageWeatherDesc[weather_desc] = 1;
      }
   });

   let maxCount = -1;
   let mostFrequent = "";

   for (const [key, value] of Object.entries(dictAverageWeatherDesc)) {
      if (value > maxCount) {
         maxCount = value;
         mostFrequent = key;
      }
   }

   const imageWeather = SwitchImage(mostFrequent, 8);

   return {
      weatherDesc: mostFrequent,
      imageWeather,
   };
};
