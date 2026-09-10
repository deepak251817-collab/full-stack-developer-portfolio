import { motion } from 'framer-motion'
import { getFeaturedCertifications } from '../data/certifications'
import CertificationCard from './CertificationCard'

function Certifications() {
  const featuredCerts = getFeaturedCertifications()

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
          {featuredCerts.map((cert, index) => (
            <CertificationCard key={cert.id} cert={cert} index={index} role="listitem" />
          ))}
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

export default Certifications