import { DetailCuaca } from "@/types/cuaca";

type OmitDetailCuaca =
   | "datetime"
   | "weather"
   | "weather_desc_en"
   | "vs_text"
   | "time_index"
   | "analysis_date"
   | "image"
   | "utc_datetime";

type CategorizeByDate = Omit<DetailCuaca, OmitDetailCuaca>;

export const categorizeByDate = (listDate: CategorizeByDate[]) => {
   const TIME_IN_A_DAY = 24 * 60 * 60 * 1000;
   const todayDate = new Date(listDate[0].local_datetime.slice(0, 10));

   const result: Record<"today" | "tomorrow" | "afterTomorrow", CategorizeByDate[]> = {
      today: [],
      tomorrow: [],
      afterTomorrow: [],
   };

   const formatDateOnly = (date: Date): string => {
      const yyyy = date.getFullYear();
      const mm = String(date.getMonth() + 1).padStart(2, "0");
      const dd = String(date.getDate()).padStart(2, "0");
      return `${yyyy}-${mm}-${dd}`;
   };

   const today = formatDateOnly(todayDate);
   const tomorrow = formatDateOnly(new Date(todayDate.getTime() + 1 * TIME_IN_A_DAY));
   const afterTomorrow = formatDateOnly(new Date(todayDate.getTime() + 2 * TIME_IN_A_DAY));

   listDate.forEach((item) => {
      const itemDateOnly = item.local_datetime.slice(0, 10);

      if (itemDateOnly === today) {
         result.today.push(item);
      } else if (itemDateOnly === tomorrow) {
         result.tomorrow.push(item);
      } else if (itemDateOnly === afterTomorrow) {
         result.afterTomorrow.push(item);
      }
   });

   return { today: result.today, tomorrow: result.tomorrow, afterTomorrow: result.afterTomorrow };
};
