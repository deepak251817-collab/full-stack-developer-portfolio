import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { ConvexProvider, ConvexReactClient } from "convex/react"

import App from "./App"
import "./index.css"

const rootElement = document.getElementById("root")!
if (!rootElement.innerHTML) {
  // When VITE_CONVEX_URL is missing (e.g. before `npx convex dev` has run)
  // we still mount a provider pointed at a placeholder so hooks exist;
  // mutations then fail gracefully and surface error toasts.
  const convexUrl = import.meta.env.VITE_CONVEX_URL ?? "https://not-configured.convex.cloud"
  const client = new ConvexReactClient(convexUrl)

  createRoot(rootElement).render(
    <StrictMode>
      <ConvexProvider client={client}>
        <App />
      </ConvexProvider>
    </StrictMode>
  )
}
