import { motion } from 'framer-motion'
import { Award, Code, Layout, Briefcase, ExternalLink, Download, FileX } from 'lucide-react'

const categoryIcons = {
  'data-analytics': Briefcase,
  'programming': Code,
  'ui-ux': Layout
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

export function CertificationCard({ cert, index = 0, role = 'listitem' }) {
  const CategoryIcon = categoryIcons[cert.category] || Award
  const hasPdf = Boolean(cert.pdf)

  return (
    <motion.article
      className="certification-card"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={{ y: -4 }}
      role={role}
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

        <div className="certification-actions">
          {hasPdf ? (
            <>
              <a
                href={cert.pdf}
                target="_blank"
                rel="noopener noreferrer"
                className="certification-btn"
                aria-label={`View ${cert.title} certificate PDF in new tab`}
              >
                <span>View Certificate</span>
                <ExternalLink size={14} aria-hidden="true" />
              </a>
              <a
                href={cert.pdf}
                download
                className="certification-btn certification-btn-secondary"
                aria-label={`Download ${cert.title} certificate PDF`}
              >
                <span>Download</span>
                <Download size={14} aria-hidden="true" />
              </a>
            </>
          ) : (
            <span className="certification-unavailable" title="Certificate document has not been uploaded yet">
              <FileX size={13} aria-hidden="true" />
              <span>Certificate unavailable</span>
            </span>
          )}

          {cert.credentialUrl && (
            <a
              href={cert.credentialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="certification-btn certification-btn-secondary"
              aria-label={`Verify ${cert.title} credential on ${cert.provider}`}
            >
              <span>Verify Credential</span>
              <ExternalLink size={14} aria-hidden="true" />
            </a>
          )}
        </div>
      </div>
    </motion.article>
  )
}

export default CertificationCard
