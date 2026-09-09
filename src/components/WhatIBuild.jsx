import { motion } from 'framer-motion'

const buildCategories = [
  {
    id: 1,
    title: 'Full Stack Applications',
    description: 'Building responsive web applications with modern frontend and backend technologies including React, Node.js, FastAPI, and REST APIs.',
    icon: 'layout'
  },
  {
    id: 2,
    title: 'AI-Powered Applications',
    description: 'Combining practical web applications with machine learning capabilities using Scikit-learn, Pandas, NumPy for forecasting, categorization, and anomaly detection.',
    icon: 'brain'
  },
  {
    id: 3,
    title: 'Data-Driven Interfaces',
    description: 'Building dashboards, maps and visualizations using data and API integrations with Recharts, Leaflet, Mapbox GL JS, and real-time data feeds.',
    icon: 'chart'
  }
]

const icons = {
  layout: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
      <line x1="3" y1="9" x2="21" y2="9" />
      <line x1="9" y1="21" x2="9" y2="9" />
    </svg>
  ),
  brain: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d="M12 5a3 3 0 1 0-5.99.01A3 3 0 0 0 12 5Z" />
      <path d="M19 12c0 1.5-1.5 3-3.5 3.5S10 15 10 16.5" />
      <path d="M5 12c0 1.5 1.5 3 3.5 3.5S14 15 14 16.5" />
      <path d="M12 19a3 3 0 1 0 5.99.01A3 3 0 0 0 12 19Z" />
      <path d="M5 12c0-1.5 1.5-3 3.5-3.5S14 9 14 10.5" />
      <path d="M19 12c0-1.5-1.5-3-3.5-3.5S10 9 10 10.5" />
    </svg>
  ),
  chart: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <line x1="18" y1="20" x2="18" y2="10" />
      <line x1="12" y1="20" x2="12" y2="4" />
      <line x1="6" y1="20" x2="6" y2="14" />
    </svg>
  )
}

function BuildCard({ category, index }) {
  return (
    <motion.article
      className="build-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={{ y: -4 }}
    >
      <div className="build-icon" aria-hidden="true">
        {icons[category.icon]}
      </div>
      <h3 className="build-title">{category.title}</h3>
      <p className="build-description">{category.description}</p>
    </motion.article>
  )
}

function WhatIBuild() {
  return (
    <section id="what-i-build" className="what-i-build" aria-labelledby="what-i-build-heading">
      <div className="section-container">
        <div className="section-header">
          <motion.p className="section-label" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>What I Build</motion.p>
          <motion.h2 id="what-i-build-heading" className="section-title" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>My Focus Areas</motion.h2>
        </div>
        <div className="build-grid" role="list">
          {buildCategories.map((category, index) => (
            <BuildCard key={category.id} category={category} index={index} role="listitem" />
          ))}
        </div>
      </div>
    </section>
  )
}

export default WhatIBuild