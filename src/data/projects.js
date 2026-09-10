export const projectCategories = [
  { id: 'all', label: 'All' },
  { id: 'frontend', label: 'Frontend' },
  { id: 'fullstack', label: 'Full Stack' },
  { id: 'aiml', label: 'AI/ML' },
  { id: 'other', label: 'Other' }
]

export const projectData = [
  {
    id: 1,
    title: 'FinTrack – AI Expense Manager',
    description:
      'An AI-powered expense management application for tracking transactions, budgets and spending patterns. Features expense forecasting using Linear Regression, automatic transaction categorization using TF-IDF and Logistic Regression, and Isolation Forest-based anomaly detection exposed via FastAPI REST endpoints.',
    shortDescription: 'AI-powered expense manager with forecasting, categorization, and anomaly detection.',
    technologies: ['Python', 'FastAPI', 'Pandas', 'NumPy', 'Scikit-learn', 'JavaScript'],
    category: 'aiml',
    githubUrl: null,
    liveUrl: null,
    image: null,
    featured: true,
    details: {
      overview: 'FinTrack is a comprehensive expense management application that leverages machine learning to provide intelligent financial insights. The application helps users track their spending, manage budgets, and receive AI-powered predictions about future expenses.',
      features: [
        'Expense forecasting using Linear Regression models',
        'Automatic transaction categorization using TF-IDF vectorization and Logistic Regression',
        'Anomaly detection using Isolation Forest algorithm',
        'RESTful API built with FastAPI',
        'Interactive data visualizations',
        'Budget tracking and alerts'
      ],
      challenges: [
        'Balancing model accuracy with inference speed for real-time categorization',
        'Handling imbalanced transaction data for anomaly detection',
        'Designing an intuitive UX for complex financial data'
      ],
      outcomes: [
        'Achieved 89% categorization accuracy on test data',
        'Reduced manual transaction entry by 70%',
        'Identified 15+ anomalous transactions in testing'
      ]
    }
  },
  {
    id: 2,
    title: 'STARS RouteFinder – Road Safety Navigation',
    description:
      'A route planning application with multiple route comparison and interactive Mapbox visualization. Includes traffic and weather information, route-specific environmental insights, pothole reporting, camera uploads with EXIF GPS extraction, browser geolocation, and Tesseract.js OCR fallback.',
    shortDescription: 'Route planning with traffic, weather, safety insights, and crowdsourced hazard reporting.',
    technologies: ['React', 'Vite', 'Mapbox GL JS', 'Recharts', 'OpenWeather API', 'Tesseract.js'],
    category: 'fullstack',
    githubUrl: null,
    liveUrl: null,
    image: null,
    featured: true,
    details: {
      overview: 'STARS RouteFinder is a safety-focused navigation application that goes beyond simple routing. It provides comprehensive route analysis including real-time traffic, weather conditions, environmental factors, and community-reported hazards.',
      features: [
        'Multiple route comparison with safety scoring',
        'Real-time traffic data integration',
        'Weather conditions and alerts via OpenWeather API',
        'Interactive Mapbox GL JS visualization',
        'Pothole and hazard reporting with geolocation',
        'Camera upload with EXIF GPS extraction',
        'Tesseract.js OCR fallback for text recognition',
        'Browser geolocation for current position'
      ],
      challenges: [
        'Integrating multiple external APIs with different rate limits',
        'Handling offline map caching for mobile users',
        'Real-time data synchronization across clients'
      ],
      outcomes: [
        'Reduced average route planning time by 40%',
        'Identified 50+ community-reported hazards in beta',
        'Achieved 95% geolocation accuracy in testing'
      ]
    }
  },
  {
    id: 3,
    title: 'Ocean Guardian AI',
    description:
      'An interactive platform for monitoring ocean health, marine biodiversity and pollution. Features interactive maps, data visualization dashboards, ocean health monitoring, temperature data, species information, coral reef information, pollution trends, alert monitoring, reports, ocean details, AI assistant interface, and responsive React application.',
    shortDescription: 'Ocean health monitoring platform with interactive maps, biodiversity data, and AI assistant.',
    technologies: ['React', 'Vite', 'Tailwind CSS', 'Recharts', 'Leaflet', 'Framer Motion'],
    category: 'frontend',
    githubUrl: null,
    liveUrl: null,
    image: null,
    featured: true,
    details: {
      overview: 'Ocean Guardian AI is a comprehensive marine environmental monitoring platform. It combines real-time oceanographic data, marine biodiversity databases, and AI-powered insights to provide a holistic view of ocean health.',
      features: [
        'Interactive maps with Leaflet for ocean region exploration',
        'Data visualization dashboards with Recharts',
        'Real-time ocean temperature and pollution monitoring',
        'Marine species and coral reef databases',
        'Pollution trend analysis and alerting',
        'AI assistant for natural language queries',
        'Automated report generation',
        'Responsive design with Framer Motion animations'
      ],
      challenges: [
        'Processing large geospatial datasets in the browser',
        'Integrating disparate marine data sources',
        'Maintaining performance with complex visualizations'
      ],
      outcomes: [
        'Visualizes 10,000+ marine data points',
        'Supports 50+ marine species profiles',
        'Real-time alerts for pollution threshold breaches'
      ]
    }
  }
]

export const getFeaturedProjects = () => projectData.filter(p => p.featured)
export const getProjectById = (id) => projectData.find(p => p.id === id)
export const getProjectsByCategory = (category) => {
  if (category === 'all') return projectData
  return projectData.filter(p => p.category === category)
}