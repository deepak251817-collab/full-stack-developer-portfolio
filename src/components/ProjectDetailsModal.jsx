import { motion, AnimatePresence } from 'framer-motion'
import { X, ExternalLink, GitFork, Star, Code, Database, Cpu, Layers } from 'lucide-react'

export function ProjectDetailsModal({ project, onClose }) {
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose()
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') onClose()
  }

  const categoryIcons = {
    frontend: Layers,
    fullstack: Code,
    aiml: Cpu,
    other: Database
  }

  const CategoryIcon = categoryIcons[project.category] || Database

  return (
    <AnimatePresence>
      <motion.div
        className="modal-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={handleOverlayClick}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <motion.div
          className="modal-container"
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          onKeyDown={handleKeyDown}
        >
          <button
            className="modal-close"
            onClick={onClose}
            aria-label="Close project details"
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
          >
            <X size={24} aria-hidden="true" />
          </button>

          {project.image && (
            <div className="modal-image">
              <img src={project.image} alt="" loading="lazy" />
            </div>
          )}

          <div className="modal-content">
            <div className="modal-header">
              <div className="modal-category">
                <CategoryIcon size={16} aria-hidden="true" />
                <span>{getCategoryLabel(project.category)}</span>
              </div>
              <motion.h2
                id="modal-title"
                className="modal-title"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                {project.title}
              </motion.h2>
            </div>

            <motion.div
              className="modal-description"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <p>{project.description}</p>
            </motion.div>

            {project.details && (
              <>
                <motion.div
                  className="modal-section"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                >
                  <h3 className="modal-section-title">Overview</h3>
                  <p>{project.details.overview}</p>
                </motion.div>

                {project.details.features && project.details.features.length > 0 && (
                  <motion.div
                    className="modal-section"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.3 }}
                  >
                    <h3 className="modal-section-title">Key Features</h3>
                    <ul className="modal-features">
                      {project.details.features.map((feature, index) => (
                        <motion.li
                          key={index}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: 0.4 + index * 0.05 }}
                        >
                          <Star size={16} className="feature-bullet" aria-hidden="true" />
                          {feature}
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                )}

                {project.details.challenges && project.details.challenges.length > 0 && (
                  <motion.div
                    className="modal-section"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.4 }}
                  >
                    <h3 className="modal-section-title">Technical Challenges</h3>
                    <ul className="modal-challenges">
                      {project.details.challenges.map((challenge, index) => (
                        <motion.li
                          key={index}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: 0.5 + index * 0.05 }}
                        >
                          {challenge}
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                )}

                {project.details.outcomes && project.details.outcomes.length > 0 && (
                  <motion.div
                    className="modal-section"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.5 }}
                  >
                    <h3 className="modal-section-title">Outcomes</h3>
                    <ul className="modal-outcomes">
                      {project.details.outcomes.map((outcome, index) => (
                        <motion.li
                          key={index}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: 0.6 + index * 0.05 }}
                        >
                          {outcome}
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </>
            )}

            <motion.div
              className="modal-tech"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              <h3 className="modal-section-title">Technologies</h3>
              <div className="modal-tech-tags">
                {project.technologies.map((tech, index) => (
                  <motion.span
                    key={index}
                    className="tech-tag"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.4 + index * 0.05 }}
                    whileHover={{ scale: 1.1 }}
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </motion.div>

            <motion.div
              className="modal-actions"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.5 }}
            >
              {project.liveUrl && (
                <motion.a
                  href={project.liveUrl}
                  className="btn btn-primary"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <ExternalLink size={18} aria-hidden="true" />
                  Live Demo
                </motion.a>
              )}
              {project.githubUrl && (
                <motion.a
                  href={project.githubUrl}
                  className="btn btn-secondary"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <GitFork size={18} aria-hidden="true" />
                  GitFork
                </motion.a>
              )}
              {!project.liveUrl && !project.githubUrl && (
                <motion.p className="modal-placeholder-note">
                  [GitFork and Live Demo links are placeholders. Add real URLs when available.]
                </motion.p>
              )}
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

function getCategoryLabel(category) {
  const labels = {
    all: 'All',
    frontend: 'Frontend',
    fullstack: 'Full Stack',
    aiml: 'AI/ML',
    other: 'Other'
  }
  return labels[category] || category
}