"use client";

import { dropdownStore } from "@/store/dropdown-store";
import { DropdownStore } from "@/types/dropdown-store";
import { createContext, ReactNode } from "react";
import { StoreApi } from "zustand";

export const DropdownStoreContext = createContext<
   StoreApi<DropdownStore> | undefined
>(undefined);

export const ListStoreProvider = ({ children }: { children: ReactNode }) => {
   return (
      <DropdownStoreContext.Provider value={dropdownStore}>
         {children}
      </DropdownStoreContext.Provider>
   );
};
