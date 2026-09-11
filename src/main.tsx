import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { ConvexProvider, ConvexReactClient } from "convex/react"

import App from "./App"
import "./index.css"

const rootElement = document.getElementById("root")!
if (!rootElement.innerHTML) {
  // Convex is optional (the UI doesn't use it — the contact form uses
  // FormSubmit). An empty/missing VITE_CONVEX_URL (e.g. on Vercel) must
  // never crash the app: use || so "" also falls back, and try/catch so a
  // bad URL can never blank the page.
  const convexUrl = import.meta.env.VITE_CONVEX_URL || "https://not-configured.convex.cloud"

  let client: ConvexReactClient | null = null
  try {
    client = new ConvexReactClient(convexUrl)
  } catch {
    client = null
  }

  createRoot(rootElement).render(
    <StrictMode>
      {client ? (
        <ConvexProvider client={client}>
          <App />
        </ConvexProvider>
      ) : (
        <App />
      )}
    </StrictMode>
  )
}
