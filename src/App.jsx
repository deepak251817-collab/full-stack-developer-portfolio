import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import About from './components/About.jsx'
import Skills from './components/Skills.jsx'
import Projects from './components/Projects.jsx'
import AllProjects from './components/AllProjects.jsx'
import Achievements from './components/Achievements.jsx'
import Certifications from './components/Certifications.jsx'
import AllCertifications from './components/AllCertifications.jsx'
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
        <AllProjects />
        <Achievements />
        <Certifications />
        <AllCertifications />
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