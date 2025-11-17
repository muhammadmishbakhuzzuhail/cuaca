export const getBaseUrl = () => {
  // prefer explicit NEXT_PUBLIC_BASE_URL (set this in .env.local for dev and in Vercel env for prod)
  const explicit = process.env.NEXT_PUBLIC_BASE_URL;
  if (explicit) return explicit.replace(/\/$/, ""); // strip trailing slash

  // if on Vercel, VERCEL_URL is set (without protocol), build https url
  if (process.env.VERCEL_URL)
    return `https://${process.env.VERCEL_URL}`.replace(/\/$/, "");

  // fallback to localhost
  return "http://localhost:3000";
};
