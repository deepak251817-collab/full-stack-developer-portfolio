import { motion } from 'framer-motion'
import { getFeaturedProjects } from '../data/projects'
import { ProjectCard } from './ProjectCard'

function Projects() {
  const featuredProjects = getFeaturedProjects()

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
          {featuredProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </motion.div>

        <motion.div
          className="projects-footer"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <a href="#all-projects" className="btn btn-secondary">
            View All Projects
          </a>
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