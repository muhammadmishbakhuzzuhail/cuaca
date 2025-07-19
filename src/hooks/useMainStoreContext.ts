import { MainStoreContext } from "@/context/main-store";
import { MainStore } from "@/types/main-store";
import { useContext } from "react";
import { useStore } from "zustand";

export const useMainStoreContext = <T>(selector: (state: MainStore) => T): T => {
   const store = useContext(MainStoreContext);
   if (!store) {
      throw new Error("useMainStore must be used within MainStoreProvider");
   }
   return useStore(store, selector);
};
