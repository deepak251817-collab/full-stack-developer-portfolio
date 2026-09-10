import { useState, useMemo } from 'react'
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
          className="projects-toolbar"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="search-wrapper">
            <label htmlFor="project-search" className="sr-only">Search projects</label>
            <Search className="search-icon" aria-hidden="true" />
            <input
              id="project-search"
              type="search"
              className="search-input"
              placeholder="Search projects by title, description, or technology..."
              value={searchQuery}
              onChange={handleSearchChange}
              aria-describedby="search-hint"
            />
            {searchQuery && (
              <motion.button
                className="search-clear"
                onClick={clearSearch}
                aria-label="Clear search"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <X size={16} aria-hidden="true" />
              </motion.button>
            )}
            <span id="search-hint" className="sr-only">
              {filteredProjects.length} of {projectData.length} projects shown
            </span>
          </div>

          <div className="filter-wrapper">
            <button
              className={`filter-trigger ${isMobileFilterOpen ? 'open' : ''}`}
              onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
              aria-expanded={isMobileFilterOpen}
              aria-haspopup="listbox"
              aria-label="Filter by category"
            >
              <Filter className="filter-icon" aria-hidden="true" />
              <span>{projectCategories.find(c => c.id === activeCategory)?.label || 'All'}</span>
              <ChevronDown className={`chevron ${isMobileFilterOpen ? 'open' : ''}`} aria-hidden="true" />
            </button>

            <AnimatePresence>
              {isMobileFilterOpen && (
                <motion.div
                  className="filter-dropdown"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  role="listbox"
                  aria-label="Project categories"
                >
                  {projectCategories.map(category => (
                    <button
                      key={category.id}
                      className={`filter-option ${activeCategory === category.id ? 'active' : ''}`}
                      onClick={() => handleCategoryChange(category.id)}
                      role="option"
                      aria-selected={activeCategory === category.id}
                    >
                      {category.label}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
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