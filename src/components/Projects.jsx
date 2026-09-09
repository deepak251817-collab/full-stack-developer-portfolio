import { motion } from 'framer-motion'
import { ExternalLink } from 'lucide-react'

const GitHubIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
)

const projectData = [
  {
    id: 1,
    title: 'FinTrack – AI Expense Manager',
    description:
      'An AI-powered expense management application for tracking transactions, budgets and spending patterns. Features expense forecasting using Linear Regression, automatic transaction categorization using TF-IDF and Logistic Regression, and Isolation Forest-based anomaly detection exposed via FastAPI REST endpoints.',
    technologies: ['Python', 'FastAPI', 'Pandas', 'NumPy', 'Scikit-learn', 'JavaScript'],
    githubUrl: null,
    liveUrl: null,
    image: null,
    featured: false
  },
  {
    id: 2,
    title: 'STARS RouteFinder – Road Safety Navigation',
    description:
      'A route planning application with multiple route comparison and interactive Mapbox visualization. Includes traffic and weather information, route-specific environmental insights, pothole reporting, camera uploads with EXIF GPS extraction, browser geolocation, and Tesseract.js OCR fallback.',
    technologies: ['React', 'Vite', 'Mapbox GL JS', 'Recharts', 'OpenWeather API', 'Tesseract.js'],
    githubUrl: null,
    liveUrl: null,
    image: null,
    featured: false
  },
  {
    id: 3,
    title: 'Ocean Guardian AI',
    description:
      'An interactive platform for monitoring ocean health, marine biodiversity and pollution. Features interactive maps, data visualization dashboards, ocean health monitoring, temperature data, species information, coral reef information, pollution trends, alert monitoring, reports, ocean details, AI assistant interface, and responsive React application.',
    technologies: ['React', 'Vite', 'Tailwind CSS', 'Recharts', 'Leaflet', 'Framer Motion'],
    githubUrl: null,
    liveUrl: null,
    image: null,
    featured: false
  }
]

function ProjectCard({ project, index }) {
  const handlePlaceholderClick = (e) => {
    e.preventDefault()
  }

  return (
    <motion.article
      className="project-card"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
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
          {project.description}
        </motion.p>

        <motion.div
          className="project-tech"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          {project.technologies.map((tech, techIndex) => (
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
        </motion.div>

        <motion.div
          className="project-links"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
        >
          <motion.a
            href={project.liveUrl}
            className="project-link project-link-primary"
            target="_blank"
            rel="noopener noreferrer"
            onClick={project.liveUrl ? undefined : handlePlaceholderClick}
            aria-disabled={!project.liveUrl}
            aria-label={`View live demo for ${project.title}`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <ExternalLink size={16} aria-hidden="true" />
            Live Demo
          </motion.a>

          <motion.a
            href={project.githubUrl}
            className="project-link project-link-secondary"
            target="_blank"
            rel="noopener noreferrer"
            onClick={project.githubUrl ? undefined : handlePlaceholderClick}
            aria-disabled={!project.githubUrl}
            aria-label={`View source code for ${project.title}`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <GitHubIcon size={16} aria-hidden="true" />
            GitHub
          </motion.a>
        </motion.div>
      </div>
    </motion.article>
  )
}

function Projects() {
  return (
    <section id="projects" className="projects" aria-labelledby="projects-heading">
      <div className="section-container">
        <motion.div
          className="projects-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <p className="section-label">Projects</p>
          <h2 id="projects-heading" className="section-title">Featured Projects</h2>
        </motion.div>

        <motion.div
          className="projects-grid"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
        >
          {projectData.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </motion.div>

        <motion.p
          className="placeholder-note"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          [GitHub and Live Demo links are placeholders. Add real URLs when available.]
        </motion.p>
      </div>
    </section>
  )
}

export default Projects