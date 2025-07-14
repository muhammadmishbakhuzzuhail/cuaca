import { MainStore } from "@/types/main-store";
import { createStore } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";

export const mainStore = createStore<MainStore>()(
   devtools(
      persist(
         (set) => ({
            kode: "11.01.01.2001",
            setKode: (id) => set({ kode: id }),
         }),
         {
            name: "main-store",
            storage: createJSONStorage(() => localStorage),
         }
      )
   )
);
