/**
 * Hand-written fallback for the generated Convex API.
 * Running `npx convex dev` regenerates this file with the real typed API —
 * until then we re-export `anyApi` exactly like the generated module does,
 * so function references resolve (calls fail gracefully before a deployment
 * exists and surface error toasts in the UI).
 */
import { anyApi } from "convex/server"

export const api = anyApi
export { anyApi }
