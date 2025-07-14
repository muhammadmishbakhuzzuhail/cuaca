"use client";

import { mainStore } from "@/store/main-store";
import { MainStore } from "@/types/main-store";
import { createContext, ReactNode } from "react";
import { StoreApi } from "zustand";

const MainStoreContext = createContext<StoreApi<MainStore> | undefined>(
   undefined
);

export const MainStoreProvider = ({ children }: { children: ReactNode }) => {
   return (
      <MainStoreContext.Provider value={mainStore}>
         {children}
      </MainStoreContext.Provider>
   );
};
