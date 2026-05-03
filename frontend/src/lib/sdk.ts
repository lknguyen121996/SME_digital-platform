import Medusa from "@medusajs/js-sdk";

const MEDUSA_BACKEND_URL =
  process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || "http://localhost:9000";

/**
 * Medusa JS SDK client instance
 * Use this for all Medusa API calls
 */
export const sdk = new Medusa({
  baseUrl: MEDUSA_BACKEND_URL,
  publishableKey: process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY || "",
  debug: process.env.NODE_ENV === "development",
});
