import { motion } from 'framer-motion'
import { ExternalLink, GitFork } from 'lucide-react'

export function ProjectCard({ project, index, onViewDetails }) {

  return (
    <motion.article
      className="project-card"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      whileHover={{ y: -8 }}
      role="listitem"
    >
      <div className="project-visual">
        {project.image ? (
          <motion.img
            src={project.image}
            alt=""
            loading="lazy"
            initial={{ scale: 1 }}
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.4 }}
          />
        ) : (
          <motion.div
            className="project-placeholder"
            initial={{ opacity: 0.4 }}
            animate={{ opacity: 0.6 }}
            transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse' }}
            aria-hidden="true"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <path d="M21 15l-5-5L5 21" />
            </svg>
          </motion.div>
        )}
        <div className="project-category-badge">{getCategoryLabel(project.category)}</div>
      </div>

      <div className="project-card-content">
        <motion.h3
          className="project-title"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          {project.title}
        </motion.h3>

        <motion.p
          className="project-description"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          {project.shortDescription || project.description}
        </motion.p>

        <motion.div
          className="project-tech"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          {project.technologies.slice(0, 6).map((tech, techIndex) => (
            <motion.span
              key={techIndex}
              className="tech-tag"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.3 + techIndex * 0.05 }}
              whileHover={{ scale: 1.1 }}
            >
              {tech}
            </motion.span>
          ))}
          {project.technologies.length > 6 && (
            <motion.span
              className="tech-tag tech-tag-more"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.3 + 6 * 0.05 }}
            >
              +{project.technologies.length - 6} more
            </motion.span>
          )}
        </motion.div>

        <motion.div
          className="project-links"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
        >
          <motion.button
            className="project-link project-link-secondary"
            onClick={() => onViewDetails(project)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            aria-label={`View details for ${project.title}`}
          >
            <GitFork size={16} aria-hidden="true" />
            View Details
          </motion.button>

          {project.liveUrl && (
            <motion.a
              href={project.liveUrl}
              className="project-link project-link-primary"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              aria-label={`View live demo for ${project.title}`}
            >
              <ExternalLink size={16} aria-hidden="true" />
              Live Demo
            </motion.a>
          )}

          {project.githubUrl && (
            <motion.a
              href={project.githubUrl}
              className="project-link project-link-secondary"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              aria-label={`View source code for ${project.title}`}
            >
              <GitFork size={16} aria-hidden="true" />
              GitFork
            </motion.a>
          )}
        </motion.div>
      </div>
    </motion.article>
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