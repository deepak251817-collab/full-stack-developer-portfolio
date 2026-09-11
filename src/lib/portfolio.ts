import {
  Award,
  BookOpenCheck,
  Braces,
  BrainCircuit,
  CalendarCheck,
  Cloud,
  Code2,
  Container,
  Database,
  Droplets,
  FileBadge,
  Globe,
  GraduationCap,
  Layers,
  LifeBuoy,
  LineChart,
  type LucideIcon,
  MapPin,
  Medal,
  Route,
  Server,
  Smartphone,
  Terminal,
  Trophy,
  Wrench,
} from "lucide-react"

/* ------------------------------------------------------------------ */
/* Types                                                               */
/* ------------------------------------------------------------------ */

export type SocialKind = "github" | "linkedin" | "mail"

export interface Social {
  kind: SocialKind
  label: string
  url: string
}

export interface HeroStat {
  label: string
  value: string
  hint: string
}

export interface TechStackItem {
  name: string
  icon: LucideIcon
}

/* ------------------------------------------------------------------ */
/* Currently / achievements                                            */
/* ------------------------------------------------------------------ */

export interface CurrentlyItem {
  icon: LucideIcon
  text: string
}

export interface Stat {
  value: number
  suffix: string
  label: string
  hint: string
}

export interface AboutFact {
  icon: LucideIcon
  label: string
  value: string
}

export interface SkillGroup {
  id: string
  title: string
  icon: LucideIcon
  blurb: string
  level: number
  skills: string[]
}

export type ProjectCategory =
  | "all"
  | "fullstack"
  | "frontend"
  | "backend"
  | "aiml"
  | "data"
  | "other"

export interface Project {
  id: string
  title: string
  /** Category labels shown on cards + searchable (exact, verified wording) */
  categories: string[]
  /** Which filter pills this project matches (subset of ProjectCategory minus "all") */
  filterTags: Exclude<ProjectCategory, "all">[]
  blurb: string
  /** Overview shown at the top of the detail view */
  description: string
  /** Key features */
  bullets: string[]
  /** Technical highlights — only verified facts from the repository */
  highlights?: string[]
  tech: string[]
  icon: LucideIcon
  /** Visual hue for the card placeholder art (see ACCENTS in Projects.tsx) */
  accent: string
  /** true = shown in the 3-card featured row on the homepage */
  featured: boolean
  githubUrl?: string
  /** Only set for deployments that have been verified */
  liveUrl?: string
  /** Optional real screenshot: put the image in public/projects/ and set
   *  image: "/projects/my-shot.png" — shows instead of the placeholder art. */
  image?: string
}

/* HOW TO ADD A NEW PROJECT (e.g. straight from your GitHub repo):
 *
 * Copy this template to the bottom of the `projects` array below and fill
 * in the fields — everything is plain text, no other file needs to change:
 *
 *   {
 *     id: "my-new-project",                       // unique, lowercase, no spaces
 *     title: "My New Project",                    // shown on the card
 *     categories: ["Full Stack", "AI/ML"],        // exact labels shown + searchable
 *     filterTags: ["fullstack", "aiml"],          // which filter pills it matches
 *     accent: "sky",                              // card visual hue (see ACCENTS in Projects.tsx)
 *     blurb: "One sentence — what it does and why it's cool.",
 *     description: "2–3 sentences shown when the card is opened.",
 *     bullets: ["First thing it does", "Second thing it does"],   // key features
 *     highlights: ["FastAPI backend", "JWT auth"],                // optional — verified only
 *     tech: ["React", "FastAPI"],                 // shown as mono tags
 *     icon: Code2,                                // any lucide-react icon (already imported above)
 *     featured: false,                            // true = homepage featured card
 *     githubUrl: "https://github.com/<you>/<repo>",
 *     liveUrl: "https://your-demo-url.com",       // optional — only when verified
 *     image: "/projects/my-shot.png",             // optional real screenshot
 *   },
 *
 * Only add `liveUrl` for deployments you have verified. Only add feature
 * bullets you can verify from the repository source.
 */

export type JourneyType =
  | "education"
  | "skills"
  | "projects"
  | "academic"
  | "research"
  | "internship"
  | "growth"

/**
 * One milestone on the Journey timeline. Everything here is sourced from the
 * resume, the real certificate/proof documents, or verified portfolio data —
 * never invented. Education scores, dates and institutions mirror the resume
 * exactly; achievement claims stay within what each certificate states.
 */
export interface JourneyMilestone {
  id: string
  /** Year or year range shown on the node, e.g. "2021" / "2021–2023". */
  year: string
  type: JourneyType
  title: string
  /** School / college / organization — exactly as the source states it. */
  organization?: string
  category: string
  /** One-to-three sentence summary shown on the card. */
  description: string
  /** Short factual bullet points (scores, streams, focus areas…). */
  details: string[]
  /** Real proof document in public/ — View Proof button only when set. */
  proof?: string
  /** Real external link (e.g. verified GitHub repository) — never invented. */
  link?: string
  /** Concise label for the link/proof button. */
  linkLabel?: string
}

/** A single certificate. Every certificate below is matched to a real file
 *  that exists in `public/certificates/` — the proof is in the PDF/OCR text,
 *  not in the filename. */
export interface Certificate {
  id: string
  /** Title shown on the card — mirrors the issue text on the certificate. */
  title: string
  /** Credential subtitle line, e.g. "Infosys Springboard · 2025". */
  subtitle: string
  /** Human-friendly category label (searchable + filterable). */
  category: string
  /** Earliest verifiable issue date, e.g. "2024-12-21" or "2026-01-14". */
  issued: string
  /** One-line description used on the featured card + detail card. */
  description: string
  /** Key facts that can be verified from the PDF content. */
  facts: string[]
  /** skill/topic tags used for filtering and the skill chips. */
  skills: string[]
  /** Icon only for the card chrome — decorative, not tied to the credential. */
  icon: LucideIcon
  /** Featured on the homepage. Not every certificate is shown there. */
  featured: boolean
  /** Real preview image extracted from this certificate's own PDF
   *  (public/certificates/previews/). Omit only when the PDF has no embedded
   *  scan (e.g. vector-only certificates). */
  preview?: string
  /** Endpoints — only set when the real file exists in public/certificates/. */
  endpoints: {
    /** True when the file exists and can be opened. */
    viewable: boolean
    /** Absolute path to the real certificate file in public/certificates/. */
    filePath: string
    /** Download filename derived from the certificate title. */
    downloadName: string
  }
}

/** Only the fields needed for the compact featured-card row. */
export type FeaturedCertificate = Omit<Certificate, "endpoints"> & {
  endpoints: Certificate["endpoints"]
}

/* ------------------------------------------------------------------ */
/* Profile                                                             */
/* ------------------------------------------------------------------ */

export const profile = {
  name: "Deepak R",
  firstName: "Deepak",
  monogram: "DR",
  role: "Full Stack Developer & AI/ML Undergraduate",
  location: "Bengaluru, India",
  email: "deepak251817@gmail.com",
  phone: "+91 8867034217",
  resumeUrl: "/resume.pdf",
  /** Photo lives at public/profile.jpg — see README. If the file is missing,
   *  the monogram shows instead of a broken image. */
  photoUrl: "/profile.jpg",
  tagline:
    "I build practical software that combines frontend, backend, data and AI/ML — from React interfaces to FastAPI services and machine-learning models that actually ship.",
  availability: "Open to internships & freelance work",
  socials: [
    { kind: "github", label: "GitHub", url: "https://github.com/deepak251817-collab" },
    { kind: "linkedin", label: "LinkedIn", url: "https://www.linkedin.com/in/deepak-r-5517693b7/" },
  ] satisfies Social[],
}

export const roles = [
  "Full Stack Developer",
  "AI/ML Undergraduate",
  "Problem Solver",
]

export const heroStats: HeroStat[] = [
  { label: "Projects", value: "8", hint: "Shipped on GitHub" },
  { label: "Certifications", value: "15", hint: "Verified credentials" },
  { label: "CGPA", value: "9.16", hint: "B.E. AI & ML" },
]

export const techStack: TechStackItem[] = [
  { name: "React", icon: Braces },
  { name: "Python", icon: Code2 },
  { name: "FastAPI", icon: Server },
  { name: "Node.js", icon: Layers },
  { name: "Scikit-learn", icon: BrainCircuit },
  { name: "Pandas", icon: LineChart },
  { name: "MongoDB", icon: Database },
  { name: "Mapbox", icon: Globe },
  { name: "Git", icon: Terminal },
  { name: "Docker", icon: Container },
  { name: "Tailwind CSS", icon: Smartphone },
  { name: "REST APIs", icon: Cloud },
]

/* ------------------------------------------------------------------ */
/* Profile

/* ------------------------------------------------------------------ */
/* Currently / achievements                                            */
/* ------------------------------------------------------------------ */

export interface CurrentlyItem {
  icon: LucideIcon
  text: string
}

export interface Stat {
  value: number
  suffix: string
  label: string
  hint: string
}

/* ------------------------------------------------------------------ */
/* About                                                               */
/* ------------------------------------------------------------------ */

export const about = {
  paragraphs: [
    "I'm an Artificial Intelligence & Machine Learning undergraduate at K.S. Institute of Technology, Bengaluru, with a CGPA of 9.16/10. I like building practical software — the kind where a React interface talks to a FastAPI service and a trained model actually does something useful at the end of the chain.",
    "I work primarily with Python, Java, JavaScript and SQL, and ship with modern tooling: React, Vite, Node.js, FastAPI and REST APIs. On the ML side I'm comfortable taking models from idea to integration — regression forecasting, TF-IDF classification, anomaly detection — and wiring them into real applications with proper APIs around them.",
  ],
  facts: [
    { icon: GraduationCap, label: "Degree", value: "B.E. AI & ML — KSIT, Bengaluru (CGPA 9.16)" },
    { icon: MapPin, label: "Location", value: "Bengaluru, India" },
    { icon: Code2, label: "Focus", value: "Full stack development & applied AI/ML" },
    { icon: Globe, label: "Languages", value: "Python, Java, JavaScript, SQL" },
  ] satisfies AboutFact[],
  currently: [
    { icon: Droplets, text: "Building HydraSense — an AI-powered IoT water quality intelligence platform" },
    { icon: BrainCircuit, text: "Deepening ML fundamentals — model evaluation, feature engineering and deployment" },
  ] satisfies CurrentlyItem[],
}

/* ------------------------------------------------------------------ */
/* Skills                                                              */
/* ------------------------------------------------------------------ */

export const skillGroups: SkillGroup[] = [
  {
    id: "frontend",
    title: "Frontend",
    icon: Braces,
    blurb: "Responsive, animated interfaces with clean component architecture.",
    level: 85,
    skills: ["React", "Vite", "Tailwind CSS", "JavaScript", "HTML5", "CSS3"],
  },
  {
    id: "backend",
    title: "Backend",
    icon: Server,
    blurb: "REST APIs and services that hold up under real usage.",
    level: 80,
    skills: ["Node.js", "FastAPI", "REST APIs", "SQL", "MongoDB"],
  },
  {
    id: "aiml",
    title: "AI / ML",
    icon: BrainCircuit,
    blurb: "Models that leave the notebook and live inside products.",
    level: 78,
    skills: ["Scikit-learn", "Pandas", "NumPy", "Regression", "TF-IDF", "Isolation Forest"],
  },
  {
    id: "devops",
    title: "DevOps & Tools",
    icon: Wrench,
    blurb: "The toolchain that keeps everything reproducible and shipped.",
    level: 70,
    skills: ["Git", "GitHub", "Docker", "VS Code", "Mapbox API", "Leaflet"],
  },
]

/* ------------------------------------------------------------------ */
/* Projects                                                            */
/* ------------------------------------------------------------------ */

export const projectFilters: { id: ProjectCategory; label: string }[] = [
  { id: "all", label: "All" },
  { id: "fullstack", label: "Full Stack" },
  { id: "frontend", label: "Frontend" },
  { id: "backend", label: "Backend" },
  { id: "aiml", label: "AI/ML" },
  { id: "data", label: "Data" },
  { id: "other", label: "Other" },
]

/** Single source of truth for all projects. Every URL below is a verified
 *  GitHub repository (or verified live deployment). Featured order matters:
 *  the homepage shows the first three featured projects. */
export const projects: Project[] = [
  {
    id: "hydrasense",
    title: "HydraSense — Water Intelligence",
    categories: ["Full Stack", "AI/ML", "IoT"],
    filterTags: ["fullstack", "aiml"],
    accent: "sky",
    blurb:
      "AI-powered IoT water quality intelligence — continuous monitoring, predictive deterioration detection and explainable risk assessment.",
    description:
      "An AI-powered IoT water quality intelligence platform for continuous monitoring, predictive deterioration detection, explainable risk assessment and water-quality incident response.",
    bullets: [
      "Continuous water-quality monitoring from connected IoT sensor nodes",
      "Predictive deterioration detection to catch quality issues early",
      "Explainable risk assessment for every reading",
      "Water-quality incident response workflows",
    ],
    highlights: [
      "FastAPI backend secured with JWT authentication",
      "SQLAlchemy ORM with PostgreSQL support",
      "MQTT telemetry ingestion via paho-mqtt",
      "Modular repository — separate frontend, backend and ml services",
    ],
    tech: ["Python", "FastAPI", "SQLAlchemy", "PostgreSQL", "MQTT (paho-mqtt)", "JWT Auth"],
    icon: Droplets,
    featured: true,
    githubUrl: "https://github.com/deepak251817-collab/Hydrasense-water-intelligence",
  },
  {
    id: "fintrack",
    title: "FinTrack — AI Expense Manager",
    categories: ["Full Stack", "AI/ML", "Data"],
    filterTags: ["fullstack", "aiml", "data"],
    accent: "emerald",
    blurb:
      "AI-powered personal finance manager — expense tracking, budgets, savings goals, receipt OCR and expense prediction.",
    description:
      "An AI-powered personal finance manager with income and expense tracking, monthly and category budgets, savings goals and interactive charts — from receipt OCR to expense prediction, automatic category classification and anomaly detection.",
    bullets: [
      "Income & expense tracking with monthly and category budgets",
      "Savings goals and interactive charts",
      "Receipt OCR for quick expense entry",
      "Expense prediction using Linear Regression models",
      "Automatic transaction categorization with TF-IDF + Logistic Regression (89% accuracy)",
      "Anomaly detection using the Isolation Forest algorithm",
      "CSV export and JSON backup/restore",
    ],
    highlights: [
      "RESTful API built with FastAPI",
      "Firebase integration wired in via firebaseConfig.js",
      "Structured repository — app.js frontend entry with a dedicated backend",
    ],
    tech: ["Python", "FastAPI", "Pandas", "NumPy", "Scikit-learn", "JavaScript", "Firebase"],
    icon: LineChart,
    featured: true,
    githubUrl: "https://github.com/deepak251817-collab/Fintrack-ai-expense-manager",
  },
  {
    id: "road-safety-navigation",
    title: "Enhanced Road Safety Navigation",
    categories: ["Full Stack", "Maps", "Frontend"],
    filterTags: ["fullstack", "frontend"],
    accent: "amber",
    blurb:
      "Map-based road safety navigation with traffic & weather data, camera-based pothole reporting and admin review workflows.",
    description:
      "A map-based road safety navigation application combining route search, full-screen maps and geolocation with live traffic and weather data — plus camera/image-based pothole reporting, EXIF GPS extraction and admin fix/reject workflows.",
    bullets: [
      "Route search with full-screen interactive maps",
      "Browser geolocation for precise reporting",
      "Live traffic and weather data",
      "Camera/image-based pothole reporting",
      "EXIF GPS extraction with OCR fallback",
      "Local storage of submitted reports",
      "Admin fix/reject workflows",
    ],
    tech: ["JavaScript", "Interactive Maps", "Geolocation", "EXIF Parsing", "OCR"],
    icon: MapPin,
    featured: true,
    githubUrl: "https://github.com/deepak251817-collab/Enhanced-Road-Safety-Navigation",
  },
  {
    id: "ocean-guardian",
    title: "Ocean Guardian AI",
    categories: ["Frontend", "Data Visualization", "AI/ML"],
    filterTags: ["frontend", "aiml"],
    accent: "cyan",
    blurb:
      "Interactive ocean-monitoring dashboard — global ocean maps, health metrics, biodiversity tracking and an AI assistant.",
    description:
      "An interactive React dashboard for ocean monitoring with global ocean maps, ocean-health metrics, pollution monitoring, biodiversity tracking, analytical charts and environmental alerts — complete with an AI assistant, reports, animations and a responsive dark-mode UI.",
    bullets: [
      "Global ocean maps for region exploration",
      "Ocean-health metrics and pollution monitoring",
      "Biodiversity tracking",
      "Analytical charts and environmental alerts",
      "Built-in AI assistant and automated reports",
      "Animations with a responsive dark-mode UI",
    ],
    tech: ["React 18", "Vite", "Tailwind CSS", "Framer Motion", "Recharts", "Leaflet", "React Leaflet", "Lucide React"],
    icon: Globe,
    featured: false,
    githubUrl: "https://github.com/deepak251817-collab/Ocean-guardian-ai",
    liveUrl: "https://ocean-guardian-ai-git-main-deepak129856-6841s-projects.vercel.app/",
  },
  {
    id: "routemaster",
    title: "RouteMaster Order Picker",
    categories: ["Full Stack", "Algorithms", "Frontend"],
    filterTags: ["fullstack", "frontend"],
    accent: "violet",
    blurb:
      "Warehouse route planning — interactive grid editor, BFS shortest paths and 2D/3D route visualization.",
    description:
      "A warehouse route-planning application with an interactive grid editor, obstacle and target placement, JSON import/export and BFS shortest-path routing with nearest-target ordering — visualized in 2D, 3D and worker-focused views.",
    bullets: [
      "Interactive grid editor with obstacle and target placement",
      "JSON import/export of warehouse layouts",
      "Route calculation with BFS shortest-path routing",
      "Nearest-target route ordering",
      "2D, 3D and worker-focused route visualization",
    ],
    highlights: [
      "React + Vite frontend with a FastAPI backend",
      "Deployed with a Vercel Python function",
    ],
    tech: ["React", "Vite", "FastAPI", "Python", "BFS Pathfinding", "Vercel"],
    icon: Route,
    featured: false,
    githubUrl: "https://github.com/deepak251817-collab/Routemaster-order-picker",
    liveUrl: "https://routemaster-ki9t.vercel.app/",
  },
  {
    id: "attendance-system",
    title: "Attendance Management System",
    categories: ["Full Stack", "Backend", "Database"],
    filterTags: ["fullstack", "backend"],
    accent: "indigo",
    blurb:
      "Web-based attendance & leave management with role-based access, report generation and CSV/Excel bulk import.",
    description:
      "A web-based attendance and leave management system with dedicated admin, teacher and student roles — attendance marking, leave requests, teacher-subject assignment, summaries, report generation and bulk imports on a SQLite-backed Flask stack.",
    bullets: [
      "Admin, teacher and student roles",
      "Attendance marking and attendance summaries",
      "Leave requests and teacher-subject assignment",
      "Report generation",
      "CSV/Excel bulk import",
      "Theme switching",
    ],
    highlights: [
      "Built on Flask 3.x with role-based access control",
      "Password hashing via Werkzeug",
      "CSV/Excel import powered by Pandas and openpyxl",
      "SQLite storage with MySQL migration support",
    ],
    tech: ["Flask 3.x", "Python", "Pandas", "openpyxl", "SQLite", "Werkzeug"],
    icon: CalendarCheck,
    featured: false,
    githubUrl: "https://github.com/deepak251817-collab/Attendance_System-Project",
  },
  {
    id: "cricket-tournament",
    title: "Odd/Even Cricket Tournament Manager",
    categories: ["Full Stack", "Backend", "Database"],
    filterTags: ["fullstack", "backend"],
    accent: "green",
    blurb:
      "Web-based cricket tournament management for teams, players and matches on a database-backed Flask application.",
    description:
      "A web-based cricket tournament management application for organizing teams, players, matches and tournament operations, with database-backed application logic.",
    bullets: [
      "Team, player and match organization",
      "Tournament operations management",
      "Database-backed application logic",
    ],
    highlights: [
      "Flask/Python application with app.py and models.py",
      "Database migrations and deployment configuration included",
    ],
    tech: ["Python", "Flask", "Database Migrations"],
    icon: Trophy,
    featured: false,
    githubUrl: "https://github.com/deepak251817-collab/Odd_Even-Cricket-Tournament-Manager",
  },
  {
    id: "academic-management",
    title: "Academic Management System",
    categories: ["Web Development", "Frontend/Full Stack"],
    filterTags: ["fullstack", "frontend"],
    accent: "rose",
    blurb:
      "Web-based academic management for academic information and related administrative operations.",
    description:
      "A web-based academic management system for organizing and managing academic information and related administrative operations.",
    bullets: [
      "Web-based academic information management",
      "Administrative operations for academic workflows",
    ],
    tech: ["JavaScript"],
    icon: GraduationCap,
    featured: false,
    githubUrl: "https://github.com/deepak251817-collab/Academic-management-system",
  },
]

/* ------------------------------------------------------------------ */
/* Journey — chronological milestones                                  */
/* ------------------------------------------------------------------ */

/** Education details (institutions, years, scores) are taken verbatim from the
 *  resume. The Merit Prize / NCIRE / Null Point claims match the real
 *  certificates in public/achievements/. Project links are the verified
 *  GitHub URLs already stored in `projects` above. Nothing is invented. */
export const journey: JourneyMilestone[] = [
  {
    id: "school-foundation",
    year: "2021",
    type: "education",
    title: "School Foundation",
    organization: "V.E.T. School, Bengaluru",
    category: "Education",
    description:
      "Started my academic journey in Bengaluru and completed my secondary education, building the foundation for my later studies in science, programming, and technology.",
    details: ["SSLC / 10th Standard", "Score: 74.56%"],
  },
  {
    id: "science-foundation",
    year: "2021–2023",
    type: "education",
    title: "Science Foundation",
    organization: "Vijaya Composite PU College, Bengaluru",
    category: "Education",
    description:
      "Studied the PCMC science stream, strengthening my foundation in mathematics, computing, and analytical thinking before moving into engineering.",
    details: ["PUC – Science (PCMC)", "Score: 85.5%"],
  },
  {
    id: "started-be-aiml",
    year: "2023",
    type: "education",
    title: "Started B.E. in Artificial Intelligence & Machine Learning",
    organization: "K.S. Institute of Technology, Bengaluru",
    category: "Education",
    description:
      "Started my undergraduate journey in Artificial Intelligence and Machine Learning, developing a deeper interest in software development, AI/ML, data, and practical technology projects.",
    details: ["B.E. 2023–2027", "Current CGPA: 9.16/10"],
  },
  {
    id: "technical-foundation",
    year: "2024",
    type: "skills",
    title: "Technical Foundation",
    category: "Skills / Development",
    description:
      "Built a strong technical foundation across programming, frontend development, backend APIs, databases, and AI/ML technologies during the early part of my engineering journey.",
    details: [
      "Languages: Python, Java, JavaScript, SQL",
      "Frontend: HTML5, CSS3, React.js, Vite, Tailwind CSS",
      "Backend: Node.js, FastAPI, REST APIs",
      "AI/ML: Pandas, NumPy, Scikit-learn, Linear & Logistic Regression, Isolation Forest, TF-IDF",
      "Databases: MongoDB, MySQL",
      "Tools & APIs: Git, GitHub, VS Code, Mapbox API, OpenWeather API, Leaflet, Recharts",
    ],
  },
  {
    id: "building-real-projects",
    year: "2024–2025",
    type: "projects",
    title: "Building Real Projects",
    category: "Projects / Development",
    description:
      "Moved from learning concepts to building practical applications that combine software development, AI/ML, data, APIs, interactive visualizations, maps, and responsive user interfaces.",
    details: [
      "FinTrack — AI Expense Manager: expense forecasting, automatic categorization and anomaly detection",
      "STARS RouteFinder — Road Safety Navigation: route comparison, live traffic & weather, pothole reporting",
      "Ocean Guardian AI: ocean-health dashboards, interactive maps and an AI assistant interface",
    ],
    link: "https://github.com/deepak251817-collab/Fintrack-ai-expense-manager",
    linkLabel: "FinTrack on GitHub",
  },
  {
    id: "academic-merit",
    year: "2025",
    type: "academic",
    title: "2nd Topper in AI & ML Class — Merit Prize",
    organization: "K.S. Institute of Technology",
    category: "Academic Achievement",
    description:
      "Recognized by K.S. Institute of Technology with a Merit Prize for securing second place in the AI & ML class for the 3rd and 4th semesters with a 91.18% aggregate.",
    details: [
      "2nd topper in the class — 2nd year, 3rd & 4th semesters",
      "Aggregate: 91.18% (VTU examinations, AY 2024–2025)",
      "Merit Prize — awarded 17 September 2025",
    ],
    proof: "/achievements/display/merit-prize.pdf",
  },
  {
    id: "research-participation",
    year: "2025",
    type: "research",
    title: "Research & Technical Participation",
    organization: "K.S. Institute of Technology",
    category: "Research / Technical Activities",
    description:
      "Presented a research paper at NCIRE-2025 and took part in Null Point, a campus technical event — both at K.S. Institute of Technology.",
    details: [
      "NCIRE-2025 — presented a road-safety/navigation research paper (real-time traffic, weather, potholes, awareness) at the National Conference on Recent Innovations in Engineering, December 2025",
      "Null Point — Certificate of Participation, campus technical event",
    ],
    proof: "/achievements/display/ncire-2025.pdf",
  },
  {
    id: "shadowfox-internship",
    year: "2026",
    type: "internship",
    title: "ShadowFox Internship — In Progress",
    category: "Internship / Professional Experience",
    description:
      "Currently pursuing a ShadowFox internship, applying my frontend, backend and AI/ML foundation to real development tasks and professional workflows.",
    details: [],
  },
  {
    id: "current-stage",
    year: "2026–2027",
    type: "growth",
    title: "Current Stage — Final-year AI & ML Undergraduate",
    organization: "K.S. Institute of Technology",
    category: "Growth / Career Preparation",
    description:
      "Currently developing stronger practical skills through projects, technical learning, internships, and placement preparation while completing my B.E. in Artificial Intelligence and Machine Learning.",
    details: [
      "B.E. Artificial Intelligence and Machine Learning — K.S. Institute of Technology (2023–2027)",
      "Current CGPA: 9.16/10",
      "Focus: AI/ML, full-stack development, practical project work, placement preparation",
    ],
  },
]

/* ------------------------------------------------------------------ */
/* Certificates — single source of truth                               */
/* ------------------------------------------------------------------ */

export const certificateFilters: { id: string; label: string }[] = [
  { id: "all", label: "All" },
  { id: "Python / Scientific Computing", label: "Python / Scientific Computing" },
  { id: "Data Analytics", label: "Data Analytics" },
  { id: "Cloud Computing", label: "Cloud Computing" },
  { id: "Artificial Intelligence", label: "Artificial Intelligence" },
  { id: "Database / SQL", label: "Database / SQL" },
  { id: "Java / Programming", label: "Java / Programming" },
  { id: "Operating Systems / Unix", label: "Operating Systems / Unix" },
]

/**
 * Every certificate below is matched to a real file inside `public/certificates/`.
 * The matching was done by extracting the certificate text from each PDF (pdftotext +
 * PyPDF2) and cross-referencing with the requested certificates. No fake PDFs,
 * fake verification URLs, or placeholder files were created.
 *
 * Featured order follows the request: 6 strongest credentials on the homepage,
 * the remaining real certificates only in the View All view.
 */
export const certificates: Certificate[] = [
  {
    id: "fcc-scientific-python",
    title: "Scientific Computing with Python",
    subtitle: "freeCodeCamp · Developer Certification",
    category: "Python / Scientific Computing",
    issued: "2024-07-03",
    description:
      "freeCodeCamp Developer Certification representing approximately 300 hours of work in scientific computing with Python.",
    facts: [
      "Developer Certification — ~300 hours of work",
      "Issued July 3, 2024",
      "Covers NumPy, Pandas and Matplotlib",
    ],
    skills: ["Python", "NumPy", "Pandas", "Matplotlib", "Scientific Computing"],
    icon: Code2,
    preview: "/certificates/previews/fcc-scientific-python.jpg",
    featured: true,
    endpoints: {
      viewable: true,
      filePath: "/certificates/WhatsApp Image 2026-09-11 at 12.53.42 AM-4.pdf",
      downloadName: "freeCodeCamp-Scientific-Computing-with-Python.pdf",
    },
  },
  {
    id: "forage-deloitte",
    title: "Data Analytics Job Simulation",
    subtitle: "Deloitte / Forage · Certificate of Completion",
    category: "Data Analytics",
    issued: "2026-01-14",
    description:
      "Forage job simulation completed in January 2026 — practical tasks in data analysis and forensic technology.",
    facts: [
      "Certificate of Completion",
      "Issued January 14, 2026",
      "Completed practical tasks in data analysis and forensic technology",
    ],
    skills: ["Data Analytics", "Data Cleaning", "Forensic Technology", "Forage"],
    icon: FileBadge,
    featured: true,
    endpoints: {
      viewable: true,
      filePath: "/certificates/io9DzWKe3PTsiS6GG_9PBTqmSxAf6zZTseP_69678b86c9744839118bb285_1768396143093_completion_certificate.pdf",
      downloadName: "Deloitte-Data-Analytics-Job-Simulation.pdf",
    },
  },
  {
    id: "nptel-cloud",
    title: "Cloud Computing",
    subtitle: "NPTEL · Jan–Oct 2025",
    category: "Cloud Computing",
    issued: "2025-10",
    description:
      "NPTEL Cloud Computing course completed with a consolidated score of 66% over a 12-week course.",
    facts: [
      "12-week course (Jul–Oct 2025)",
      "Consolidated score: 66%",
      "NPTEL Roll No: NPTEL25CS107S352605618",
    ],
    skills: ["Cloud Computing", "NPTEL"],
    icon: Globe,
    preview: "/certificates/previews/nptel-cloud.jpg?v=2",
    featured: true,
    endpoints: {
      viewable: true,
      filePath: "/certificates/Cloud Computing.pdf",
      downloadName: "NPTEL-Cloud-Computing.pdf",
    },
  },
  {
    id: "infosys-ai",
    title: "Artificial Intelligence",
    subtitle: "Infosys Springboard · 2025",
    category: "Artificial Intelligence",
    issued: "2025-05-17",
    description:
      "Infosys Springboard certificate for the Artificial Intelligence course, issued May 17, 2025.",
    facts: [
      "Issued Saturday, May 17, 2025",
      "Infosys Springboard credential",
      "Verified via QR code at verify.onwingspan.com",
    ],
    skills: ["Artificial Intelligence", "Infosys Springboard"],
    icon: BrainCircuit,
    preview: "/certificates/previews/infosys-ai.jpg",
    featured: true,
    endpoints: {
      viewable: true,
      filePath: "/certificates/1-27637ae0-791f-4669-986c-ceaeadebea21.pdf",
      downloadName: "Infosys-Springboard-Artificial-Intelligence.pdf",
    },
  },
  {
    id: "infosys-dbms-sql",
    title: "Database Management System (DBMS) & SQL: Complete Pack",
    subtitle: "Infosys Springboard · 2025",
    category: "Database / SQL",
    issued: "2025-05-12",
    description:
      "Infosys Springboard complete pack covering database management systems and SQL, issued May 12, 2025.",
    facts: [
      "Issued Monday, May 12, 2025",
      "Infosys Springboard credential",
      "Verified via QR code at verify.onwingspan.com",
    ],
    skills: ["Database Management System", "SQL", "Infosys Springboard"],
    icon: Database,
    preview: "/certificates/previews/infosys-dbms-sql.jpg",
    featured: true,
    endpoints: {
      viewable: true,
      filePath: "/certificates/1-bd87e955-7978-4e73-81cc-764e17cc5607.pdf",
      downloadName: "Infosys-Springboard-DBMS-SQL-Complete-Pack.pdf",
    },
  },
  {
    id: "gl-java",
    title: "Java Programming",
    subtitle: "Great Learning Academy · August 2024",
    category: "Java / Programming",
    issued: "2024-08",
    description:
      "Great Learning Academy certificate for the Java Programming course, completed August 2024.",
    facts: [
      "Completed August 2024",
      "Great Learning Academy credential",
      "Java programming fundamentals",
    ],
    skills: ["Java", "Programming", "Great Learning Academy"],
    icon: Terminal,
    preview: "/certificates/previews/gl-java.jpg",
    featured: true,
    endpoints: {
      viewable: true,
      filePath: "/certificates/WhatsApp Image 2026-09-11 at 12.53.42 AM-2.pdf",
      downloadName: "Great-Learning-Java-Programming.pdf",
    },
  },
  {
    id: "infosys-java-beginners",
    title: "Java for Beginners",
    subtitle: "Infosys Springboard · 2024",
    category: "Java / Programming",
    issued: "2024-12-19",
    description:
      "Infosys Springboard certificate for the Java for Beginners course, issued December 19, 2024.",
    facts: [
      "Issued Thursday, December 19, 2024",
      "Infosys Springboard credential",
      "Verified via QR code at verify.onwingspan.com",
    ],
    skills: ["Java", "OOP", "Infosys Springboard"],
    icon: Braces,
    preview: "/certificates/previews/infosys-java-beginners.jpg",
    featured: false,
    endpoints: {
      viewable: true,
      filePath: "/certificates/1-a52b58a8-fea0-47b9-bca1-b94d649c4a1a.pdf",
      downloadName: "Infosys-Springboard-Java-for-Beginners.pdf",
    },
  },
  {
    id: "infosys-dbms",
    title: "Database Management System",
    subtitle: "Infosys Springboard · 2025",
    category: "Database / SQL",
    issued: "2025-05-14",
    description:
      "Infosys Springboard certificate for the Database Management System course, issued May 14, 2025.",
    facts: [
      "Issued Wednesday, May 14, 2025",
      "Infosys Springboard credential",
      "Verified via QR code at verify.onwingspan.com",
    ],
    skills: ["Database Management System", "SQL", "Infosys Springboard"],
    icon: Database,
    preview: "/certificates/previews/infosys-dbms.jpg",
    featured: false,
    endpoints: {
      viewable: true,
      filePath: "/certificates/1-82dc0afe-9d9f-400a-bcaf-9e5389d1fef5.pdf",
      downloadName: "Infosys-Springboard-Database-Management-System.pdf",
    },
  },
  {
    id: "infosys-ai-intro",
    title: "Introduction to Artificial Intelligence",
    subtitle: "Infosys Springboard · 2025",
    category: "Artificial Intelligence",
    issued: "2025-05-14",
    description:
      "Infosys Springboard certificate for the Introduction to Artificial Intelligence course, issued May 14, 2025.",
    facts: [
      "Issued Wednesday, May 14, 2025",
      "Infosys Springboard credential",
      "Verified via QR code at verify.onwingspan.com",
    ],
    skills: ["Artificial Intelligence", "Infosys Springboard"],
    icon: BrainCircuit,
    preview: "/certificates/previews/infosys-ai-intro.jpg",
    featured: false,
    endpoints: {
      viewable: true,
      filePath: "/certificates/1-8f005417-ca68-4029-962c-cd78584d5ae2.pdf",
      downloadName: "Infosys-Springboard-Introduction-to-AI.pdf",
    },
  },
  {
    id: "infosys-ai-types",
    title: "Artificial Intelligence: Types of Artificial Intelligence",
    subtitle: "Infosys Springboard · 2025",
    category: "Artificial Intelligence",
    issued: "2025-05-12",
    description:
      "Infosys Springboard certificate for the Artificial Intelligence: Types of Artificial Intelligence course, issued May 12, 2025.",
    facts: [
      "Issued Monday, May 12, 2025",
      "Infosys Springboard credential",
      "Verified via QR code at verify.onwingspan.com",
    ],
    skills: ["Artificial Intelligence", "Infosys Springboard"],
    icon: BrainCircuit,
    preview: "/certificates/previews/infosys-ai-types.jpg",
    featured: false,
    endpoints: {
      viewable: true,
      filePath: "/certificates/1-97498416-c015-4f1a-b048-f837aee371e2.pdf",
      downloadName: "Infosys-Springboard-Types-of-AI.pdf",
    },
  },
  {
    id: "infosys-cli",
    title: "Programming Fundamentals: Command Line Interface & Operating System Commands",
    subtitle: "Infosys Springboard · 2024",
    category: "Operating Systems / Unix",
    issued: "2024-12-21",
    description:
      "Infosys Springboard certificate for programming fundamentals covering command line interface and operating system commands, issued December 21, 2024.",
    facts: [
      "Issued Saturday, December 21, 2024",
      "Infosys Springboard credential",
      "Verified via QR code at verify.onwingspan.com",
    ],
    skills: ["Programming Fundamentals", "CLI", "Operating Systems", "Infosys Springboard"],
    icon: Terminal,
    preview: "/certificates/previews/infosys-cli.jpg",
    featured: false,
    endpoints: {
      viewable: true,
      filePath: "/certificates/1-03a3c5e8-b5d2-4cee-a34e-6e849428bd21.pdf",
      downloadName: "Infosys-Springboard-Programming-Fundamentals-CLI.pdf",
    },
  },
  {
    id: "infosys-unix",
    title: "Unix Linux OS - Unix Fundamentals",
    subtitle: "Infosys Springboard · 2025",
    category: "Operating Systems / Unix",
    issued: "2025-12-11",
    description:
      "Infosys Springboard certificate for the Unix Linux OS - Unix Fundamentals course, issued December 11, 2025.",
    facts: [
      "Issued Thursday, December 11, 2025",
      "Infosys Springboard credential",
      "Verified via QR code at verify.onwingspan.com",
    ],
    skills: ["Unix", "Linux", "Operating Systems", "Infosys Springboard"],
    icon: LifeBuoy,
    preview: "/certificates/previews/infosys-unix.jpg",
    featured: false,
    endpoints: {
      viewable: true,
      filePath: "/certificates/1-49c4ef8e-616f-4252-b87b-6dbfffebbdbd.pdf",
      downloadName: "Infosys-Springboard-Unix-Linux-Fundamentals.pdf",
    },
  },
  {
    id: "gl-programming-basics",
    title: "Programming Basics",
    subtitle: "Great Learning Academy · August 2024",
    category: "Java / Programming",
    issued: "2024-08",
    description:
      "Great Learning Academy certificate for the Programming Basics course, completed August 2024.",
    facts: [
      "Completed August 2024",
      "Great Learning Academy credential",
      "Programming basics",
    ],
    skills: ["Programming", "Great Learning Academy"],
    icon: Terminal,
    preview: "/certificates/previews/gl-programming-basics.jpg",
    featured: false,
    endpoints: {
      viewable: true,
      filePath: "/certificates/WhatsApp Image 2026-09-11 at 12.53.42 AM-3.pdf",
      downloadName: "Great-Learning-Programming-Basics.pdf",
    },
  },
  {
    id: "gl-uiux",
    title: "UI / UX for Beginners",
    subtitle: "Great Learning Academy · August 2024",
    category: "Java / Programming",
    issued: "2024-08",
    description:
      "Great Learning Academy certificate for the UI / UX for Beginners course, completed August 2024.",
    facts: [
      "Completed August 2024",
      "Great Learning Academy credential",
      "UI/UX basics",
    ],
    skills: ["UI/UX", "Great Learning Academy"],
    icon: Award,
    preview: "/certificates/previews/gl-uiux.jpg",
    featured: false,
    endpoints: {
      viewable: true,
      filePath: "/certificates/WhatsApp Image 2026-09-11 at 12.53.42 AM-1.pdf",
      downloadName: "Great-Learning-UI-UX-for-Beginners.pdf",
    },
  },
]

/**
 * Featured certificates shown on the homepage, in the requested order.
 * Derived from `certificates` so the metadata stays a single source of truth.
 */
export const featuredCertifications: FeaturedCertificate[] = certificates
  .filter((c) => c.featured)
  .map<FeaturedCertificate>((c) => ({
    ...c,
    endpoint: c.endpoints,
  }))

/* ------------------------------------------------------------------ */
/* Achievements — single source of truth                               */
/* ------------------------------------------------------------------ */

export const stats: Stat[] = [
  { value: 8, suffix: "", label: "Projects shipped", hint: "Full-stack, AI/ML, IoT & data builds" },
  { value: 15, suffix: "", label: "Certifications", hint: "Across Python, Java, AI/ML & design" },
]

/** Status badge shown on achievement cards (finalist, topper, participation…). */
export interface AchievementStatus {
  label: string
  tone: "finalist" | "topper" | "research" | "participation"
}

/** One verified achievement. Every entry below is matched to a real file in
 *  `public/achievements/` — proofs were opened and inspected (text layer or
 *  embedded scan), not just matched by filename. Nothing here is invented:
 *  no team names, ranks, prizes or results beyond what each document states. */
export interface Achievement {
  id: string
  icon: LucideIcon
  title: string
  /** Issuing organization, exactly as the document states it. */
  organization: string
  /** Year for card display + search. */
  year: string
  /** Precise date from the document, e.g. "24 July 2026". Optional —
   *  only set when the proof states a date. */
  date?: string
  /** Human-friendly category (searchable + filterable). */
  category: string
  /** Status line from the proof, e.g. "Finalist" / "2nd Topper". */
  status: AchievementStatus
  /** Accurate description — only what the certificate/proof supports. */
  description: string
  /** Verifiable facts extracted from the proof document. */
  facts?: string[]
  /** true = shown as one of the 3 featured cards on the homepage. */
  featured: boolean
  /** True when the real proof file exists and can be opened. */
  viewable: boolean
  /** Absolute path to the real proof file in public/achievements/. */
  proofFile?: string
  /** Real preview image extracted from the proof (public/achievements/previews/). */
  preview?: string
}

/** Every achievement below maps 1:1 to a real file in `public/achievements/`. */
export const achievements: Achievement[] = [
  {
    id: "hackocean-2026",
    icon: Medal,
    title: "HackOcean 2026 — Finalist",
    organization: "Digital Learning Group (DLG), MITS Gwalior",
    year: "2026",
    date: "24 July 2026",
    category: "Hackathon",
    status: { label: "Finalist", tone: "finalist" },
    description:
      "Successfully qualified as a Finalist in HackOcean 2026, a National-Level Frontend Hackathon conducted online on 24 July 2026 and organized by the Digital Learning Group (DLG), MITS Gwalior.",
    facts: [
      "National-Level Frontend Hackathon",
      "Conducted online on 24 July 2026",
      "Organized by DLG, MITS Gwalior",
    ],
    featured: true,
    viewable: true,
    proofFile: "/achievements/HackOcean 2026 Finalist.pdf",
    preview: "/achievements/previews/hackocean-2026-finalist.jpg",
  },
  {
    id: "ksit-merit-prize",
    icon: Trophy,
    title: "2nd Topper in AI & ML Class — Merit Prize",
    organization: "K. S. Institute of Technology (KSIT)",
    year: "2025",
    date: "17 September 2025",
    category: "Academic Achievement",
    status: { label: "2nd Topper", tone: "topper" },
    description:
      "Awarded a Merit Prize for being the 2nd topper in the class (2nd year, 3rd & 4th semesters) with an aggregate of 91.18% in the VTU examinations for the academic year 2024–2025.",
    facts: [
      "Student: Deepak R — Department: AI & ML",
      "2nd topper in the class (2nd year, 3rd & 4th semesters)",
      "Aggregate: 91.18% — VTU examinations, AY 2024–2025",
      "Merit Prize conferred during the inauguration of 1st year B.E. classes, AY 2025–26, on 17 September 2025",
    ],
    featured: true,
    viewable: true,
    proofFile: "/achievements/display/merit-prize.pdf",
    preview: "/achievements/previews/merit-prize.jpg",
  },
  {
    id: "ncire-2025",
    icon: BookOpenCheck,
    title: "NCIRE-2025 — Research Paper Presentation",
    organization: "K. S. Institute of Technology",
    year: "2025",
    date: "December 2025",
    category: "Research / Conference",
    status: { label: "Presented", tone: "research" },
    description:
      "Presented a research paper at the National Conference on Recent Innovations in Engineering (NCIRE-2025), held at K. S. Institute of Technology in December 2025. The paper addresses a road-safety/navigation topic involving real-time traffic, weather, potholes and awareness.",
    facts: [
      "National Conference on Recent Innovations in Engineering (NCIRE-2025)",
      "Held at K. S. Institute of Technology, December 2025",
      "Research paper presentation on road-safety/navigation — real-time traffic, weather, potholes and awareness",
    ],
    featured: true,
    viewable: true,
    proofFile: "/achievements/display/ncire-2025.pdf",
    preview: "/achievements/previews/ncire-2025.jpg",
  },
  {
    id: "null-point",
    icon: Code2,
    title: "Null Point — Certificate of Participation",
    organization: "K. S. Institute of Technology",
    year: "2025",
    category: "Technical Event / Participation",
    status: { label: "Participation", tone: "participation" },
    description:
      "Participated in Null Point, a technical event conducted at K. S. Institute of Technology, recognized with a Certificate of Participation.",
    facts: ["Certificate of Participation — technical event at KSIT"],
    featured: false,
    viewable: true,
    proofFile: "/achievements/Null Point participation.pdf",
    preview: "/achievements/previews/null-point-participation.jpg",
  },
]

/** The 3 strongest achievements, shown on the homepage in this order. */
export const featuredAchievements: Achievement[] = achievements.filter((a) => a.featured)

/** Category filters for the View All view, derived from the data. */
export const achievementFilters: { id: string; label: string }[] = [
  { id: "all", label: "All" },
  ...Array.from(new Set(achievements.map((a) => a.category))).map((c) => ({
    id: c,
    label: c,
  })),
]

/* ------------------------------------------------------------------ */
/* Contact                                                             */
/* ------------------------------------------------------------------ */

export const contact = {
  headline: "Let's build something worth shipping.",
  blurb:
    "Internships, freelance projects, or just a conversation about code — my inbox is open and I reply fast.",
  fasterThanEmail:
    "For anything urgent, LinkedIn is faster than email. For everything else, the form works great.",
}
