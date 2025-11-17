export const getBaseUrl = () => {
  // client runtime: pakai origin dari browser (preview/prod akan ikut domain yang sedang diakses)
  if (typeof window !== "undefined")
    return window.location.origin.replace(/\/$/, "");

  // server/runtime: prioritaskan explicit env jika diset
  const explicit = process.env.NEXT_PUBLIC_BASE_URL;
  if (explicit) return explicit.replace(/\/$/, "");

  // Vercel sets VERCEL_URL automatically for each deployment (preview/prod)
  if (process.env.VERCEL_URL)
    return `https://${process.env.VERCEL_URL}`.replace(/\/$/, "");

  // fallback localhost untuk dev
  return "http://localhost:3000";
};
