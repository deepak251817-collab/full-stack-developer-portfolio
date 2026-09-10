import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, X, ChevronDown } from 'lucide-react';
import { useState } from 'react';

/**
 * SearchToolbar
 * A reusable search and category filter toolbar.
 *
 * Props:
 * - placeholder: string – placeholder for the search input
 * - searchQuery: string – current search value
 * - onSearchChange: (e) => void – handler for input change
 * - onClearSearch: () => void – clear button handler
 * - categories: Array<{ id: string, label: string }> – filter options
 * - activeCategory: string – currently selected category id
 * - onCategorySelect: (id: string) => void – category change handler
 */
export default function SearchToolbar({
  placeholder,
  searchQuery,
  onSearchChange,
  onClearSearch,
  categories,
  activeCategory,
  onCategorySelect,
}) {
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  return (
    <motion.div
      className="search-toolbar"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      {/* Search Input */}
      <div className="search-wrapper">
        <label htmlFor="toolbar-search" className="sr-only">
          {placeholder}
        </label>
        <Search className="search-icon" aria-hidden="true" />
        <input
          id="toolbar-search"
          type="search"
          className="search-input"
          placeholder={placeholder}
          value={searchQuery}
          onChange={onSearchChange}
          aria-describedby="search-hint"
        />
        {searchQuery && (
          <motion.button
            className="search-clear"
            onClick={onClearSearch}
            aria-label="Clear search"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <X size={16} aria-hidden="true" />
          </motion.button>
        )}
        <span id="search-hint" className="sr-only"></span>
      </div>

      {/* Category Filters (chips) */}
      <div className="filter-wrapper">
        <button
          className={`filter-trigger ${isMobileFilterOpen ? 'open' : ''}`}
          onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
          aria-expanded={isMobileFilterOpen}
          aria-haspopup="listbox"
          aria-label="Filter by category"
        >
          <Filter className="filter-icon" aria-hidden="true" />
          <span>{categories.find(c => c.id === activeCategory)?.label || 'All'}</span>
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
              aria-label="Category options"
            >
              {categories.map(category => (
                <button
                  key={category.id}
                  className={`filter-option ${activeCategory === category.id ? 'active' : ''}`}
                  onClick={() => {
                    onCategorySelect(category.id);
                    setIsMobileFilterOpen(false);
                  }}
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
  );
}
