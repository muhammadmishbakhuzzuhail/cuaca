export interface Provinsi {
   provinsiId: string;
   nama: string;
   kota: Kota[];
}

export interface Kota {
   kotaId: string;
   nama: string;
   kecamatan: Kecamatan[];
}

export interface Kecamatan {
   kecamatanId: string;
   nama: string;
   desa: Desa[];
}

export interface Desa {
   desaId: string;
   nama: string;
}
