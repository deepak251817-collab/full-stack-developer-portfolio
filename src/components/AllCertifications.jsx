import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Filter, X, ChevronDown } from 'lucide-react'
import { certificationData, certificationCategories, getCertificationsByCategory } from '../data/certifications'
import CertificationCard from './CertificationCard'

export function AllCertifications() {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('all')
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false)

  const filteredCertifications = useMemo(() => {
    let certs = getCertificationsByCategory(activeCategory)

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim()
      certs = certs.filter(cert =>
        cert.title.toLowerCase().includes(query) ||
        cert.provider.toLowerCase().includes(query) ||
        cert.description.toLowerCase().includes(query) ||
        cert.category.toLowerCase().includes(query)
      )
    }

    return certs
  }, [searchQuery, activeCategory])

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
    <section id="all-certifications" className="all-certifications" aria-labelledby="all-certifications-heading">
      <div className="section-container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="section-label">Certifications</p>
          <h2 id="all-certifications-heading" className="section-title">All Certifications</h2>
          <p className="section-subtitle">
            Explore all professional certifications with filtering and search.
          </p>
        </motion.div>

        <motion.div
          className="certifications-toolbar"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="search-wrapper">
            <label htmlFor="cert-search" className="sr-only">Search certifications</label>
            <Search className="search-icon" aria-hidden="true" />
            <input
              id="cert-search"
              type="search"
              className="search-input"
              placeholder="Search certifications by title, provider, or description..."
              value={searchQuery}
              onChange={handleSearchChange}
              aria-describedby="cert-search-hint"
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
            <span id="cert-search-hint" className="sr-only">
              {filteredCertifications.length} of {certificationData.length} certifications shown
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
              <span>{certificationCategories.find(c => c.id === activeCategory)?.label || 'All'}</span>
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
                  aria-label="Certification categories"
                >
                  {certificationCategories.map(category => (
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
          className="certifications-results"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <p className="results-count" aria-live="polite">
            {filteredCertifications.length} certification{filteredCertifications.length !== 1 ? 's' : ''} found
          </p>

          {filteredCertifications.length === 0 ? (
            <motion.div
              className="no-results"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <p>No certifications match your search criteria.</p>
              <p className="no-results-hint">
                Try adjusting your filters or search terms.
              </p>
            </motion.div>
          ) : (
            <div className="certifications-grid" role="list">
              {filteredCertifications.map((cert, index) => (
                <CertificationCard
                  key={cert.id}
                  cert={cert}
                  index={index}
                  role="listitem"
                />
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  )
}

export default AllCertifications