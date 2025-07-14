import { DropdownStoreContext } from "@/context/dropdown-store";
import { DropdownStore } from "@/types/dropdown-store";
import { useContext } from "react";
import { useStore } from "zustand";

export const useDropdownStoreContext = <T>(selector: (state: DropdownStore) => T): T => {
   const store = useContext(DropdownStoreContext);
   if (!store) {
      throw new Error("useDropdownStore must be used within ListStoreProvider");
   }
   return useStore(store, selector);
};
