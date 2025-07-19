export interface DropdownStore {
   provinsiId: string;
   kotaId: string;
   kecamatanId: string;
   desaId: string;
   setProvinsiId: (id: string) => void;
   setKotaId: (id: string) => void;
   setKecamatanId: (id: string) => void;
   setDesaId: (id: string) => void;
   namaProvinsi: string;
   namaKota: string;
   namaKecamatan: string;
   namaDesa: string;
   setNamaProvinsi: (nama: string) => void;
   setNamaKota: (nama: string) => void;
   setNamaKecamatan: (nama: string) => void;
   setNamaDesa: (nama: string) => void;
}
