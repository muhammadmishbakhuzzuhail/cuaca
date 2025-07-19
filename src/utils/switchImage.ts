export const SwitchImage = (weather_desc: string, jam: number) => {
   const isMalam = jam >= 18 || jam < 6;
   let image_weather_desc;
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

   return image_weather_desc;
};
