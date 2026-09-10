import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Home, User, Layers, FolderKanban, Award, GraduationCap, Code2, Mail } from 'lucide-react'

const navSections = [
  { id: 'hero', label: 'Home', icon: Home },
  { id: 'about', label: 'About', icon: User },
  { id: 'skills', label: 'Skills', icon: Layers },
  { id: 'projects', label: 'Projects', icon: FolderKanban },
  { id: 'achievements', label: 'Achievements', icon: Award },
  { id: 'certifications', label: 'Certifications', icon: GraduationCap },
  { id: 'what-i-build', label: 'What I Build', icon: Code2 },
  { id: 'contact', label: 'Contact', icon: Mail }
]

function FloatingNav() {
  const [activeSection, setActiveSection] = useState('hero')
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-50% 0px -50% 0px',
      threshold: 0
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id)
        }
      })
    }, observerOptions)

    navSections.forEach(({ id }) => {
      const element = document.getElementById(id)
      if (element) observer.observe(element)
    })

    const handleScroll = () => {
      setVisible(window.scrollY > window.innerHeight * 0.6)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      observer.disconnect()
    }
  }, [])

  const scrollToSection = (id) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  if (typeof window !== 'undefined' && window.innerWidth < 768) {
    return null
  }

  return (
    <motion.div
      className="floating-nav"
      initial={{ opacity: 0, x: 20 }}
      animate={{
        opacity: visible ? 1 : 0,
        x: visible ? 0 : 20,
        pointerEvents: visible ? 'auto' : 'none'
      }}
      transition={{ duration: 0.3 }}
      role="navigation"
      aria-label="Section navigation"
      aria-hidden={!visible}
    >
      <div className="floating-nav-inner">
        {navSections.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            className={`floating-nav-item ${activeSection === id ? 'active' : ''}`}
            onClick={() => scrollToSection(id)}
            aria-label={label}
            aria-current={activeSection === id ? 'location' : undefined}
          >
            <Icon size={18} aria-hidden="true" />
            <span className="floating-nav-tooltip">{label}</span>
          </button>
        ))}
      </div>
    </motion.div>
  )
}

export default FloatingNav