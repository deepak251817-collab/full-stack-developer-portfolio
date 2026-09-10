export const certificationCategories = [
  { id: 'all', label: 'All' },
  { id: 'data-analytics', label: 'Data Analytics' },
  { id: 'programming', label: 'Programming' },
  { id: 'ui-ux', label: 'UI/UX' }
]

export const certificationData = [
  {
    id: 1,
    title: 'Deloitte Australia Data Analytics Job Simulation',
    provider: 'Forage',
    year: '2026',
    category: 'data-analytics',
    description: 'Completed a virtual job simulation covering data analytics fundamentals, data cleaning, visualization, and business insights presentation.',
    pdf: null,
    credentialUrl: null,
    credentialId: null,
    image: null,
    featured: true
  },
  {
    id: 2,
    title: 'Scientific Computing with Python',
    provider: 'freeCodeCamp',
    year: '2026',
    category: 'programming',
    description: 'Comprehensive course covering Python for scientific computing including NumPy, Pandas, Matplotlib, and data analysis workflows.',
    pdf: null,
    credentialUrl: null,
    credentialId: null,
    image: null,
    featured: true
  },
  {
    id: 3,
    title: 'Python Fundamentals',
    provider: 'Infosys Springboard',
    year: '2025',
    category: 'programming',
    description: 'Foundational Python programming course covering syntax, data structures, functions, modules, and basic OOP concepts.',
    pdf: null,
    credentialUrl: null,
    credentialId: null,
    image: null,
    featured: false
  },
  {
    id: 4,
    title: 'Java for Beginners',
    provider: 'Infosys Springboard',
    year: '2025',
    category: 'programming',
    description: 'Introduction to Java programming including syntax, control structures, OOP principles, collections, and exception handling.',
    pdf: null,
    credentialUrl: null,
    credentialId: null,
    image: null,
    featured: false
  },
  {
    id: 5,
    title: 'Java Programming',
    provider: 'Great Learning',
    year: '2025',
    category: 'programming',
    description: 'Intermediate Java course covering advanced OOP, multithreading, collections framework, streams, and JDBC basics.',
    pdf: null,
    credentialUrl: null,
    credentialId: null,
    image: null,
    featured: false
  },
  {
    id: 6,
    title: 'UI/UX for Beginners',
    provider: 'Great Learning',
    year: '2025',
    category: 'ui-ux',
    description: 'Fundamentals of user interface and user experience design including design principles, wireframing, prototyping, and usability testing.',
    pdf: null,
    credentialUrl: null,
    credentialId: null,
    image: null,
    featured: false
  }
]

export const getFeaturedCertifications = () => certificationData.filter(c => c.featured)
export const getCertificationById = (id) => certificationData.find(c => c.id === id)
export const getCertificationsByCategory = (category) => {
  if (category === 'all') return certificationData
  return certificationData.filter(c => c.category === category)
}