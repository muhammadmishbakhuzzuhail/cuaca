export const convertToEnglishDate = ({ datetime }: { datetime: string }) => {
   // YYYY-MM-DD HH:MM:SS
   const date = new Date(datetime);
   return {
      jam: date.getHours(),
      tanggal: date.getDate(),
      bulan: date.toLocaleString("en-US", { month: "long" }),
      hari: date.toLocaleString("en-US", { weekday: "long" }),
      tahun: date.getFullYear(),
   };
};
