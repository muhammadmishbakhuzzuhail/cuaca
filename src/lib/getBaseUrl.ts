export const getBaseUrl = () => {
  // pakai NEXT_PUBLIC_BASE_URL bila diset (dev + prod)
  const explicit = process.env.NEXT_PUBLIC_BASE_URL;
  if (explicit) return explicit.replace(/\/$/, "");

  // Vercel provides VERCEL_URL (host without protocol) per-deployment
  if (process.env.VERCEL_URL)
    return `https://${process.env.VERCEL_URL}`.replace(/\/$/, "");

  // fallback ke localhost saat dev
  return "http://localhost:3000";
};
