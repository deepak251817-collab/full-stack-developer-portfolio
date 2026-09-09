import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import About from './components/About.jsx'
import Skills from './components/Skills.jsx'
import Projects from './components/Projects.jsx'
import Achievements from './components/Achievements.jsx'
import Certifications from './components/Certifications.jsx'
import WhatIBuild from './components/WhatIBuild.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'
import FloatingNav from './components/FloatingNav.jsx'
import BackToTop from './components/BackToTop.jsx'
import { SmoothScrollProvider } from './components/SmoothScrollProvider.jsx'

function App() {
  return (
    <SmoothScrollProvider>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Achievements />
        <Certifications />
        <WhatIBuild />
        <Contact />
      </main>
      <Footer />
      <FloatingNav />
      <BackToTop />
    </SmoothScrollProvider>
  )
}

export default App