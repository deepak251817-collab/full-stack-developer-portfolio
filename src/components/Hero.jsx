import { motion } from 'framer-motion'
import { Mail, Phone } from 'lucide-react'

const GitHubIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
)

const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
)

function Hero() {
  return (
    <section id="hero" className="hero" aria-labelledby="hero-heading">
      <div className="hero-background" aria-hidden="true">
        <div className="hero-gradient-orb orb-1" />
        <div className="hero-gradient-orb orb-2" />
        <div className="hero-gradient-orb orb-3" />
        <div className="hero-grid-pattern" />
      </div>

      <div className="hero-container">
        <div className="hero-content">
          <motion.div
            className="hero-badge"
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <span className="badge-dot" aria-hidden="true" />
            <span>Open to opportunities</span>
          </motion.div>

          <motion.p
            className="hero-greeting"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Hello, I'm
          </motion.p>

          <motion.h1
            id="hero-heading"
            className="hero-name"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <span className="hero-name-text">Deepak R</span>
          </motion.h1>

          <motion.p
            className="hero-title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            Full Stack Developer & AI/ML Undergraduate
          </motion.p>

          <motion.p
            className="hero-description"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            Artificial Intelligence and Machine Learning undergraduate interested in building practical software applications that combine frontend, backend, data and AI/ML technologies. I work with Python, Java, JavaScript and SQL, and have experience with modern frontend and backend technologies including React, Vite, Node.js, FastAPI and REST APIs.
          </motion.p>

          <motion.div
            className="hero-buttons"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <a href="#projects" className="btn btn-primary">
              View Projects
            </a>
            <a href="#contact" className="btn btn-secondary">
              Contact Me
            </a>
            <a
              href="#"
              className="btn btn-ghost"
              aria-label="Download Resume"
              download="Deepak_R_Resume.pdf"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true" className="btn-icon">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Download Resume
            </a>
          </motion.div>

          <motion.div
            className="hero-social"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <a
              href="#"
              className="social-link"
              aria-label="GitHub"
              aria-disabled="true"
              onClick={(e) => e.preventDefault()}
            >
              <GitHubIcon size={20} aria-hidden="true" />
            </a>
            <a
              href="#"
              className="social-link"
              aria-label="LinkedIn"
              aria-disabled="true"
              onClick={(e) => e.preventDefault()}
            >
              <LinkedInIcon size={20} aria-hidden="true" />
            </a>
            <a
              href="mailto:deepak251817@gmail.com"
              className="social-link"
              aria-label="Email"
            >
              <Mail size={20} aria-hidden="true" />
            </a>
            <a
              href="tel:+918867034217"
              className="social-link"
              aria-label="Phone"
            >
              <Phone size={20} aria-hidden="true" />
            </a>
          </motion.div>
        </div>

        <motion.div
          className="hero-visual"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          whileHover={{ y: -10 }}
          aria-hidden="true"
        >
          <div className="hero-profile-card">
            <div className="profile-header">
              <div className="profile-avatar">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </div>
              <div className="profile-info">
                <span className="profile-name">Deepak R</span>
                <span className="profile-role">AI/ML Undergraduate</span>
              </div>
            </div>
            <div className="profile-divider" />
            <div className="profile-stats">
              <div className="stat">
                <span className="stat-value">4</span>
                <span className="stat-label">Years</span>
              </div>
              <div className="stat">
                <span className="stat-value">3</span>
                <span className="stat-label">Projects</span>
              </div>
              <div className="stat">
                <span className="stat-value">6+</span>
                <span className="stat-label">Certifications</span>
              </div>
            </div>
            <div className="profile-divider" />
            <div className="profile-skills">
              <span className="skill-chip">React</span>
              <span className="skill-chip">Python</span>
              <span className="skill-chip">FastAPI</span>
              <span className="skill-chip">AI/ML</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero