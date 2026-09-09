import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const hamburgerRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const closeMenu = () => setIsMenuOpen(false)

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Escape' && isMenuOpen) {
      closeMenu()
      hamburgerRef.current?.focus()
    }
  }, [isMenuOpen])

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  const navLinks = [
    { href: '#hero', label: 'Home' },
    { href: '#about', label: 'About' },
    { href: '#skills', label: 'Skills' },
    { href: '#projects', label: 'Projects' },
    { href: '#achievements', label: 'Achievements' },
    { href: '#certifications', label: 'Certifications' },
    { href: '#what-i-build', label: 'What I Build' },
    { href: '#contact', label: 'Contact' }
  ]

  return (
    <motion.nav
      className={`navbar ${isScrolled ? 'navbar-scrolled' : ''}`}
      role="navigation"
      aria-label="Main navigation"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <div className="navbar-container">
        <motion.a
          href="#hero"
          className="navbar-brand"
          aria-label="Go to homepage"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          whileHover={{ scale: 1.02 }}
        >
          Deepak R
        </motion.a>

        <motion.div
          className="navbar-desktop"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <ul className="navbar-links" role="menubar">
            {navLinks.map((link, index) => (
              <motion.li
                key={link.href}
                role="none"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 + index * 0.05 }}
              >
                <a
                  href={link.href}
                  role="menuitem"
                  className="navbar-link"
                  onClick={closeMenu}
                  whileHover={{ y: -2 }}
                >
                  {link.label}
                </a>
              </motion.li>
            ))}
          </ul>
          <motion.a
            href="#contact"
            className="btn btn-primary navbar-cta"
            onClick={closeMenu}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Contact Me
          </motion.a>
        </motion.div>

        <button
          ref={hamburgerRef}
          className="navbar-toggle"
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          type="button"
          whileTap={{ scale: 0.95 }}
        >
          <AnimatePresence mode="wait">
            {isMenuOpen ? (
              <motion.div
                className="hamburger"
                key="close"
                initial={{ rotate: 0 }}
                animate={{ rotate: 180 }}
                transition={{ duration: 0.3 }}
                aria-hidden="true"
              >
                <motion.span
                  className="hamburger-line"
                  initial={{ rotate: 0, y: 0 }}
                  animate={{ rotate: 45, y: 6 }}
                  transition={{ duration: 0.3 }}
                />
                <motion.span
                  className="hamburger-line"
                  initial={{ opacity: 1 }}
                  animate={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                />
                <motion.span
                  className="hamburger-line"
                  initial={{ rotate: 0, y: 0 }}
                  animate={{ rotate: -45, y: -6 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            ) : (
              <motion.div
                className="hamburger"
                key="open"
                initial={{ rotate: 180 }}
                animate={{ rotate: 0 }}
                transition={{ duration: 0.3 }}
                aria-hidden="true"
              >
                <motion.span
                  className="hamburger-line"
                  initial={{ rotate: 45, y: 6 }}
                  animate={{ rotate: 0, y: 0 }}
                  transition={{ duration: 0.3 }}
                />
                <motion.span
                  className="hamburger-line"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2, delay: 0.2 }}
                />
                <motion.span
                  className="hamburger-line"
                  initial={{ rotate: -45, y: -6 }}
                  animate={{ rotate: 0, y: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </button>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            id="mobile-menu"
            className="navbar-mobile"
            role="navigation"
            aria-label="Mobile navigation"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <ul className="navbar-mobile-links" role="menubar">
              {navLinks.map((link, index) => (
                <motion.li
                  key={link.href}
                  role="none"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <a
                    href={link.href}
                    role="menuitem"
                    className="navbar-mobile-link"
                    onClick={closeMenu}
                    whileHover={{ x: 4 }}
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
              <motion.li
                role="none"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: navLinks.length * 0.05 }}
              >
                <motion.a
                  href="#contact"
                  role="menuitem"
                  className="btn btn-primary navbar-mobile-cta"
                  onClick={closeMenu}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Contact Me
                </motion.a>
              </motion.li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

export default Navbar