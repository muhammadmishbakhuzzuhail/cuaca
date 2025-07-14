import { useDropdownStoreContext } from "./useDropdownStoreContext";

export const useDropdownStore = () => {
   const provinsiId = useDropdownStoreContext((state) => state.provinsiId);
   const setProvinsiId = useDropdownStoreContext((state) => state.setProvinsiId);
   const kotaId = useDropdownStoreContext((state) => state.kotaId);
   const setKotaId = useDropdownStoreContext((state) => state.setKotaId);
   const kecamatanId = useDropdownStoreContext((state) => state.kecamatanId);
   const setKecamatanId = useDropdownStoreContext((state) => state.setKecamatanId);
   const desaId = useDropdownStoreContext((state) => state.desaId);
   const setDesaId = useDropdownStoreContext((state) => state.setDesaId);
   const resetDropdown = useDropdownStoreContext((state) => state.resetDropdown);

   return {
      provinsiId,
      setProvinsiId,
      kotaId,
      setKotaId,
      kecamatanId,
      setKecamatanId,
      desaId,
      setDesaId,
      resetDropdown,
   };
};
