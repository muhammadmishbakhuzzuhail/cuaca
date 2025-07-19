import { MainStore } from "@/types/main-store";
import { createStore } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";

export const mainStore = createStore<MainStore>()(
   devtools(
      persist(
         (set) => ({
            mainDesaId: "11.01.01.2001", // ketika klik card tertentu
            setMainDesaId: (id: string) => set({ mainDesaId: id }),
         }),
         {
            name: "main-store",
            storage: createJSONStorage(() => localStorage),
         }
      )
   )
);
