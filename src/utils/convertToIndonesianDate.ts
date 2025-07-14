export const convertToIndonesianDate = ({ datetime }: { datetime: string }) => {
   // YYYY-MM-DD HH:MM:SS
   const dateObj = new Date(datetime.slice(0, 10));
   const options: Intl.DateTimeFormatOptions = { day: "numeric", month: "long", year: "numeric" };
   const formatted = new Intl.DateTimeFormat("id-ID", options).format(dateObj);

   return formatted;
};
