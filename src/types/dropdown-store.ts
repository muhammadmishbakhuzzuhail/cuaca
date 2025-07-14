export interface DropdownStore {
   provinsiId: string;
   kotaId: string;
   kecamatanId: string;
   desaId: string;
   setProvinsiId: (id: string) => void;
   setKotaId: (id: string) => void;
   setKecamatanId: (id: string) => void;
   setDesaId: (id: string) => void;
   resetDropdown: () => void;
}
