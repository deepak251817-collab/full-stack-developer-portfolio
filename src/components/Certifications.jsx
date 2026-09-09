import { motion } from 'framer-motion'

const certifications = [
  {
    id: 1,
    title: 'Deloitte Australia Data Analytics Job Simulation',
    provider: 'Forage',
    year: '2026',
    icon: 'briefcase'
  },
  {
    id: 2,
    title: 'Scientific Computing with Python',
    provider: 'freeCodeCamp',
    year: '2026',
    icon: 'code'
  },
  {
    id: 3,
    title: 'Python Fundamentals',
    provider: 'Infosys Springboard',
    year: '2025',
    icon: 'code'
  },
  {
    id: 4,
    title: 'Java for Beginners',
    provider: 'Infosys Springboard',
    year: '2025',
    icon: 'coffee'
  },
  {
    id: 5,
    title: 'Java Programming',
    provider: 'Great Learning',
    year: '2025',
    icon: 'coffee'
  },
  {
    id: 6,
    title: 'UI/UX for Beginners',
    provider: 'Great Learning',
    year: '2025',
    icon: 'layout'
  }
]

const icons = {
  briefcase: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  code: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  ),
  coffee: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d="M10 2v2" />
      <path d="M14 2v2" />
      <path d="M16 8a1 1 0 0 1 1 1v8a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V9a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v2a1 1 0 0 1 1 1v2a1 1 0 0 1 1 1v2" />
      <path d="M6 18h12" />
    </svg>
  ),
  layout: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
      <line x1="3" y1="9" x2="21" y2="9" />
      <line x1="9" y1="21" x2="9" y2="9" />
    </svg>
  )
}

function CertificationCard({ cert, index }) {
  return (
    <motion.article
      className="certification-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={{ y: -4 }}
    >
      <div className="certification-icon" aria-hidden="true">
        {icons[cert.icon]}
      </div>
      <div className="certification-content">
        <h3 className="certification-title">{cert.title}</h3>
        <div className="certification-meta">
          <span className="certification-provider">{cert.provider}</span>
          <span className="certification-year">{cert.year}</span>
        </div>
      </div>
    </motion.article>
  )
}

function Certifications() {
  return (
    <section id="certifications" className="certifications" aria-labelledby="certifications-heading">
      <div className="section-container">
        <div className="section-header">
          <motion.p className="section-label" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>Certifications</motion.p>
          <motion.h2 id="certifications-heading" className="section-title" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>Professional Development</motion.h2>
        </div>
        <div className="certifications-grid" role="list">
          {certifications.map((cert, index) => (
            <CertificationCard key={cert.id} cert={cert} index={index} role="listitem" />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Certifications