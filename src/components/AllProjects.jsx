import { useState, useMemo } from 'react'
import SearchToolbar from './SearchToolbar'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Filter, X, ChevronDown } from 'lucide-react'
import { projectData, projectCategories, getProjectsByCategory } from '../data/projects'
import { ProjectCard } from './ProjectCard'
import { ProjectDetailsModal } from './ProjectDetailsModal'

export function AllProjects() {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('all')
  const [selectedProject, setSelectedProject] = useState(null)
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false)

  const filteredProjects = useMemo(() => {
    let projects = getProjectsByCategory(activeCategory)

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim()
      projects = projects.filter(project =>
        project.title.toLowerCase().includes(query) ||
        project.description.toLowerCase().includes(query) ||
        project.technologies.some(tech => tech.toLowerCase().includes(query)) ||
        project.category.toLowerCase().includes(query)
      )
    }

    return projects
  }, [searchQuery, activeCategory])

  const handleOpenDetails = (project) => {
    setSelectedProject(project)
  }

  const handleCloseDetails = () => {
    setSelectedProject(null)
  }

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value)
  }

  const handleCategoryChange = (category) => {
    setActiveCategory(category)
    setIsMobileFilterOpen(false)
  }

  const clearSearch = () => {
    setSearchQuery('')
  }

  return (
    <section id="all-projects" className="all-projects" aria-labelledby="all-projects-heading">
      <div className="section-container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="section-label">Projects</p>
          <h2 id="all-projects-heading" className="section-title">All Projects</h2>
          <p className="section-subtitle">
            Explore all projects with filtering and search capabilities.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <SearchToolbar
            placeholder="Search projects by title, description, or technology..."
            searchQuery={searchQuery}
            onSearchChange={handleSearchChange}
            onClearSearch={clearSearch}
            categories={projectCategories}
            activeCategory={activeCategory}
            onCategorySelect={handleCategoryChange}
          />
        </motion.div>

        <motion.div
          className="projects-results"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <p className="results-count" aria-live="polite">
            {filteredProjects.length} project{filteredProjects.length !== 1 ? 's' : ''} found
          </p>

          {filteredProjects.length === 0 ? (
            <motion.div
              className="no-results"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <p>No projects match your search criteria.</p>
              <p className="no-results-hint">
                Try adjusting your filters or search terms.
              </p>
            </motion.div>
          ) : (
            <div className="projects-grid" role="list">
              {filteredProjects.map((project, index) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={index}
                  onViewDetails={handleOpenDetails}
                  role="listitem"
                />
              ))}
            </div>
          )}
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <ProjectDetailsModal
            project={selectedProject}
            onClose={handleCloseDetails}
          />
        )}
      </AnimatePresence>
    </section>
  )
}

export default AllProjects