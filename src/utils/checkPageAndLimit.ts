import { countDesa } from "@/services/desa.service";

export const checkPageAndLimit = async (page: string, limit: string) => {
   const errorPageMsg: string[] = [];
   const errorLimitMsg: string[] = [];

   const total = await countDesa();

   const pageNumber = Number(page);
   if (!page) {
      errorPageMsg.push("Query page tidak boleh kosong");
   } else if (isNaN(pageNumber)) {
      errorPageMsg.push("Query page harus berupa angka");
   } else {
      if (pageNumber <= 0) {
         errorPageMsg.push("Query page tidak boleh kurang dari atau sama dengan 0");
      }
      if (pageNumber > total) {
         errorPageMsg.push("Query page tidak boleh lebih dari jumlah total desa");
      }
   }

   const limitNumber = Number(limit);
   if (!limit) {
      errorLimitMsg.push("Query limit tidak boleh kosong");
   } else if (isNaN(limitNumber)) {
      errorLimitMsg.push("Query limit harus berupa angka");
   } else {
      if (limitNumber <= 0) {
         errorLimitMsg.push("Query limit tidak boleh kurang dari atau sama dengan 0");
      }
      if (limitNumber > total) {
         errorLimitMsg.push("Query limit tidak boleh lebih dari jumlah desa");
      }
   }

   const errors: Partial<Record<"limit" | "page", string[]>> = {};

   if (errorLimitMsg.length > 0) {
      errors["limit"]?.push(...errorLimitMsg);
   }
   if (errorPageMsg.length > 0) {
      errors["page"]?.push(...errorPageMsg);
   }

   return {
      total,
      errors,
   };
};
