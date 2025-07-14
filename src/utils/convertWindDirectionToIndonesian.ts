export const convertWindDirectionToIndonesian = ({ direction }: { direction: string }) => {
   const arahMap: Record<string, string> = {
      N: "Utara",
      NE: "Timur Laut",
      E: "Timur",
      SE: "Tenggara",
      S: "Selatan",
      SW: "Barat Daya",
      W: "Barat",
      NW: "Barat Laut",
   };
   return arahMap[direction];
};
