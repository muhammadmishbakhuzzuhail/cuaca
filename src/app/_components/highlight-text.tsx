const highlightText = (text: string, keyword: string) => {
   if (!keyword) return text;

   const regex = new RegExp(`(${keyword})`, "gi");
   const parts = text.split(regex);

   return parts.map((part, index) =>
      regex.test(part) ? (
         <span key={index} className="text-red-500 group-hover/show-list:text-white">
            {part}
         </span>
      ) : (
         <span key={index}>{part}</span>
      )
   );
};

export default highlightText;
