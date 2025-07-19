"use client";

import { Button } from "@/components/ui/button";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";

const ButtonBack = () => {
   return (
      <Button
         className={
            "rounded-full hover:bg-white bg-purple-500 text-white hover:text-purple-500 border-1 border-purple-500 w-20 px-0 gap-0 active:scale-95"
         }
         size={"sm"}
      >
         <MdOutlineKeyboardArrowLeft className="scale-125" />
         <div className="flex-1" onClick={() => window.history.back()}>
            Back
         </div>
      </Button>
   );
};

export default ButtonBack;
