const projectData = [
  {
    id: 1,
    title: 'FinTrack – AI Expense Manager',
    description:
      'An AI-powered expense management application for tracking transactions, budgets and spending patterns. Features expense forecasting using Linear Regression, automatic transaction categorization using TF-IDF and Logistic Regression, and Isolation Forest-based anomaly detection, all exposed via FastAPI REST endpoints.',
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

function ProjectCard({ project }) {
  const handlePlaceholderClick = (e) => {
    e.preventDefault()
  }

  return (
    <article className="project-card">
      <div className="project-visual">
        {project.image ? (
          <img src={project.image} alt="" loading="lazy" />
        ) : (
          <div className="project-placeholder" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <path d="M21 15l-5-5L5 21" />
            </svg>
          </div>
        )}
      </div>
      <div className="project-card-content">
        <h3 className="project-title">{project.title}</h3>
        <p className="project-description">{project.description}</p>
        <div className="project-tech">
          {project.technologies.map((tech, index) => (
            <span key={index} className="tech-tag">{tech}</span>
          ))}
        </div>
        <div className="project-links">
          <a
            href={project.liveUrl}
            className="project-link project-link-primary"
            target="_blank"
            rel="noopener noreferrer"
            onClick={project.liveUrl ? undefined : handlePlaceholderClick}
            aria-disabled={!project.liveUrl}
            aria-label={`View live demo for ${project.title}`}
          >
            <svg className="link-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
            Live Demo
          </a>
          <a
            href={project.githubUrl}
            className="project-link project-link-secondary"
            target="_blank"
            rel="noopener noreferrer"
            onClick={project.githubUrl ? undefined : handlePlaceholderClick}
            aria-disabled={!project.githubUrl}
            aria-label={`View source code for ${project.title}`}
          >
            <svg className="link-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
            </svg>
            GitHub
          </a>
        </div>
      </div>
    </article>
  )
}

function Projects() {
  return (
    <section id="projects" className="projects fade-in" aria-labelledby="projects-heading">
      <div className="section-container">
        <div className="projects-header">
          <p className="section-label">Projects</p>
          <h2 id="projects-heading" className="section-title">Featured Projects</h2>
        </div>
        <div className="projects-grid">
          {projectData.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
        <p className="placeholder-note">
          [GitHub and Live Demo links are placeholders. Add real URLs when available.]
        </p>
      </div>
    </section>
  )
}

export default Projects