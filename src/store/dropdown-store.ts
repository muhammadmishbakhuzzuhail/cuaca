import { DropdownStore } from "@/types/dropdown-store";
import { createStore } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";

export const dropdownStore = createStore<DropdownStore>()(
   devtools(
      persist(
         (set) => ({
            provinsiId: "11",
            kotaId: "11.01",
            kecamatanId: "11.01.01",
            desaId: "11.01.01.2001",
            setProvinsiId: (id) => set({ provinsiId: id, kotaId: "", kecamatanId: "", desaId: "" }),
            setKotaId: (id) => set({ kotaId: id, kecamatanId: "", desaId: "" }),
            setKecamatanId: (id) => set({ kecamatanId: id, desaId: "" }),
            setDesaId: (id) => set({ desaId: id }),
            resetDropdown: () =>
               set({
                  provinsiId: "",
                  kotaId: "",
                  kecamatanId: "",
                  desaId: "",
               }),
         }),
         {
            name: "dropdown-store",
            storage: createJSONStorage(() => localStorage),
         }
      )
   )
);
