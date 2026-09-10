import { motion } from 'framer-motion'
import { Award, Code, Layout, Briefcase } from 'lucide-react'
import { getFeaturedCertifications } from '../data/certifications'

function Certifications() {
  const featuredCerts = getFeaturedCertifications()

  const categoryIcons = {
    'data-analytics': Briefcase,
    'programming': Code,
    'ui-ux': Layout
  }

  return (
    <section id="certifications" className="certifications" aria-labelledby="certifications-heading">
      <div className="section-container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <p className="section-label">Certifications</p>
          <h2 id="certifications-heading" className="section-title">Featured Certifications</h2>
        </motion.div>

        <motion.div
          className="certifications-grid"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
          role="list"
        >
          {featuredCerts.map((cert, index) => {
            const CategoryIcon = categoryIcons[cert.category] || Award
            return (
              <motion.article
                key={cert.id}
                className="certification-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.5, delay: index * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
                whileHover={{ y: -4 }}
                role="listitem"
              >
                <div className="certification-icon" aria-hidden="true">
                  <CategoryIcon size={28} />
                </div>
                <div className="certification-content">
                  <h3 className="certification-title">{cert.title}</h3>
                  <div className="certification-meta">
                    <span className="certification-provider">{cert.provider}</span>
                    <span className="certification-year">{cert.year}</span>
                  </div>
                  <p className="certification-description">{cert.description}</p>
                  <div className="certification-category">
                    <span className="certification-category-badge">{getCategoryLabel(cert.category)}</span>
                  </div>
                </div>
              </motion.article>
            )
          })}
        </motion.div>

        <motion.div
          className="certifications-footer"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <a href="#all-certifications" className="btn btn-secondary">
            View All Certifications
          </a>
        </motion.div>
      </div>
    </section>
  )
}

function getCategoryLabel(category) {
  const labels = {
    all: 'All',
    'data-analytics': 'Data Analytics',
    programming: 'Programming',
    'ui-ux': 'UI/UX'
  }
  return labels[category] || category
}

export default Certifications