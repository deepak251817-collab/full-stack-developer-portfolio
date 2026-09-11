import { BrowserRouter, Route, Routes } from "react-router"
import { Toaster } from "@/components/ui/sonner"

import { Footer } from "@/components/layout/Footer"
import { Navbar } from "@/components/layout/Navbar"
import { ScrollToTop } from "@/components/layout/ScrollToTop"
import { About } from "@/components/sections/About"
import Achievements from "@/components/sections/Achievements"
import Certificates from "@/components/sections/Certificates"
import { Contact } from "@/components/sections/Contact"
import { Hero } from "@/components/sections/Hero"
import { Journey } from "@/components/sections/Journey"
import { Projects } from "@/components/sections/Projects"
import { Skills } from "@/components/sections/Skills"
import { ThemeProvider } from "@/components/theme-provider"

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          {/* The portfolio is the landing page at "/" */}
          <Route
            path="/"
            element={
              <div className="min-h-dvh">
                <Navbar />
                <main>
                  <Hero />
                  <About />
                  <Skills />
                  <Projects />
                  <Journey />
                  <Certificates />
                  <Achievements />
                  <Contact />
                </main>
                <Footer />
                <ScrollToTop />
                <Toaster position="bottom-right" />
              </div>
            }
          />
          <Route path="*" element={<div className="grid min-h-dvh place-items-center">
            <a href="/" className="text-primary underline">Back home</a>
          </div>} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}
