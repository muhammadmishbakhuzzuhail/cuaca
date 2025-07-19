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

   const namaProvinsi = useDropdownStoreContext((state) => state.namaProvinsi);
   const setNamaProvinsi = useDropdownStoreContext((state) => state.setNamaProvinsi);
   const namaKota = useDropdownStoreContext((state) => state.namaKota);
   const setNamaKota = useDropdownStoreContext((state) => state.setNamaKota);
   const namaKecamatan = useDropdownStoreContext((state) => state.namaKecamatan);
   const setNamaKecamatan = useDropdownStoreContext((state) => state.setNamaKecamatan);
   const namaDesa = useDropdownStoreContext((state) => state.namaDesa);
   const setNamaDesa = useDropdownStoreContext((state) => state.setNamaDesa);

   return {
      provinsiId,
      setProvinsiId,
      kotaId,
      setKotaId,
      kecamatanId,
      setKecamatanId,
      desaId,
      setDesaId,
      namaProvinsi,
      setNamaProvinsi,
      namaKota,
      setNamaKota,
      namaKecamatan,
      setNamaKecamatan,
      namaDesa,
      setNamaDesa,
   };
};
