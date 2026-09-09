import { useState, useEffect, useCallback, useRef } from 'react'

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
    { href: '#contact', label: 'Contact' }
  ]

  return (
    <nav
      className={`navbar ${isScrolled ? 'navbar-scrolled' : ''}`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="navbar-container">
        <a href="#hero" className="navbar-brand" aria-label="Go to homepage">
          Deepak R
        </a>

        <div className="navbar-desktop">
          <ul className="navbar-links" role="menubar">
            {navLinks.map((link) => (
              <li key={link.href} role="none">
                <a
                  href={link.href}
                  role="menuitem"
                  className="navbar-link"
                  onClick={closeMenu}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href="#contact"
            className="btn btn-primary navbar-cta"
            onClick={closeMenu}
          >
            Contact Me
          </a>
        </div>

        <button
          ref={hamburgerRef}
          className="navbar-toggle"
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          type="button"
        >
          <span className="hamburger" aria-hidden="true">
            <span className="hamburger-line" />
            <span className="hamburger-line" />
            <span className="hamburger-line" />
          </span>
        </button>
      </div>

      <div
        id="mobile-menu"
        className={`navbar-mobile ${isMenuOpen ? 'navbar-mobile-open' : ''}`}
        role="navigation"
        aria-label="Mobile navigation"
        hidden={!isMenuOpen}
      >
        <ul className="navbar-mobile-links" role="menubar">
          {navLinks.map((link) => (
            <li key={link.href} role="none">
              <a
                href={link.href}
                role="menuitem"
                className="navbar-mobile-link"
                onClick={closeMenu}
              >
                {link.label}
              </a>
            </li>
          ))}
          <li role="none">
            <a
              href="#contact"
              role="menuitem"
              className="btn btn-primary navbar-mobile-cta"
              onClick={closeMenu}
            >
              Contact Me
            </a>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar