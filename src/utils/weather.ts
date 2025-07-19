export const convertTccToText = (tcc: number) => {
   let descTcc = "";

   if (tcc >= 0 && tcc <= 10) {
      descTcc = "Langit cerah tanpa gangguan awan.";
   } else if (tcc <= 25) {
      descTcc = "Langit dominan cerah, hanya sedikit awan tipis melintas.";
   } else if (tcc <= 50) {
      descTcc = "Langit sebagian tertutup awan, cahaya matahari masih terlihat.";
   } else if (tcc <= 75) {
      descTcc = "Langit tampak cukup berawan, sinar matahari mulai berkurang.";
   } else if (tcc <= 90) {
      descTcc = "Langit mendung, sebagian besar langit tertutup awan.";
   } else {
      descTcc = "Langit sepenuhnya tertutup awan. Tidak tampak langit biru.";
   }

   return descTcc;
};

export const convertTpToText = (tp: number) => {
   let descTp = "";

   if (tp === 0) {
      descTp = "Tidak ada hujan.";
   } else if (tp > 0 && tp <= 1) {
      descTp = "Hujan sangat ringan, hampir tidak terasa.";
   } else if (tp <= 5) {
      descTp = "Hujan ringan.";
   } else if (tp <= 20) {
      descTp = "Hujan sedang.";
   } else if (tp <= 50) {
      descTp = "Hujan cukup deras.";
   } else if (tp <= 100) {
      descTp = "Hujan deras dan intens.";
   } else {
      descTp = "Hujan sangat deras, berpotensi banjir.";
   }

   return descTp;
};

export const convertWindDirectionToText = (wd: string, wd_to: string, wd_deg: number) => {
   const directionMap: Record<string, string> = {
      N: "Utara",
      NE: "Timur Laut",
      E: "Timur",
      SE: "Tenggara",
      S: "Selatan",
      SW: "Barat Daya",
      W: "Barat",
      NW: "Barat Laut",
   };

   const dari = directionMap[wd] || wd;
   const ke = directionMap[wd_to] || wd_to;

   const description = `Angin bertiup dari arah ${dari} menuju ${ke}, dengan sudut ${wd_deg}° dari utara.`;

   return {
      dari,
      ke,
      derajat: wd_deg,
      deskripsi: description,
   };
};

export const convertVisibilityToText = (vs: number) => {
   const km = vs / 1000; // dari meter ke kilometer

   let desc: string;

   if (km < 0.1) {
      desc = "Kabut sangat tebal (jarak pandang < 100 meter).";
   } else if (km < 1) {
      desc = "Kabut tebal (jarak pandang < 1 km).";
   } else if (km < 4) {
      desc = "Kabut ringan (jarak pandang sedang).";
   } else if (km < 10) {
      desc = "Jarak pandang cukup baik.";
   } else if (km < 20) {
      desc = "Jarak pandang baik.";
   } else {
      desc = "Jarak pandang sangat baik.";
   }

   return {
      value: km.toFixed(1) + " km",
      description: desc,
   };
};
