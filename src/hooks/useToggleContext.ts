import { ToggleContext } from "@/context/toggle-context";
import { useContext } from "react";

export const useToggleContext = () => {
   const context = useContext(ToggleContext);
   if (!context)
      throw new Error(
         "useToggleContext must be used within ToggleContextProvider"
      );
   return context;
};
