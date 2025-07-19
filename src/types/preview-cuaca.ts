export interface PreviewCuaca {
   desaId: string;
   desa: string;
   kecamatan: string;
   kotkab: string;
   provinsi: string;
   cuaca: {
      local_datetime: string;
      weather_desc: string;
      t: number;
      hu: number;
      ws: number;
      wd: string;
      wd_to: string;
   };
}
