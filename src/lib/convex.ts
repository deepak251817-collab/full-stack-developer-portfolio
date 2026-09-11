import { ConvexHttpClient } from "convex/browser"
import { api } from "../../convex/_generated/api"

/**
 * Shared Convex client for the frontend.
 *
 * The URL comes from VITE_CONVEX_URL. When it's missing (e.g. before
 * `npx convex dev` has ever run), the client is null and the contact form
 * degrades gracefully with an error toast instead of crashing.
 */
const convexUrl = import.meta.env.VITE_CONVEX_URL as string | undefined

export const convex = convexUrl ? new ConvexHttpClient(convexUrl) : null

export { api }
