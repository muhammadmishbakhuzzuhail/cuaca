export interface ServerResponse<T = null> {
   code: number;
   success: boolean;
   message: string;
   data?: T;
   errors?: Partial<Record<Fields, string[]>>;
}

type Fields =
   | "server"
   | "desaId"
   | "kecamatanId"
   | "kotaId"
   | "provinsiId"
   | "data"
   | "limit"
   | "page"
   | "input";
