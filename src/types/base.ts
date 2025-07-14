export interface Base {
   kode: string;
   nama: string;
   kota: Kota[];
}

export interface Kota {
   kode: string;
   nama: string;
   kecamatan: Kecamatan[];
}

export interface Kecamatan {
   kode: string;
   nama: string;
   desa: Desa[];
}

export interface Desa {
   kode: string;
   nama: string;
}
