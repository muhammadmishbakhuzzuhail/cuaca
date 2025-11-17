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

export type ErrorMap = Partial<Record<Fields, string[]>>;

export const parseError = (
  err: unknown
): { message: string; errors?: ErrorMap } => {
  if (err instanceof Error) {
    return { message: err.message };
  }

  if (typeof err === "object" && err !== null) {
    const e = err as Record<string, unknown>;
    const message = typeof e.message === "string" ? e.message : undefined;
    const errors =
      typeof e.errors === "object" && e.errors !== null
        ? (e.errors as ErrorMap)
        : undefined;
    return { message: message ?? "unknown error", errors };
  }

  return { message: String(err) || "unknown error" };
};
