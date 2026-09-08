function ProjectCard({ title, description, techStack, link, github }) {
  return (
    <article className="project-card">
      <div className="project-card-content">
        <h3 className="project-title">{title}</h3>
        <p className="project-description">{description}</p>
        <div className="project-tech">
          {techStack.map((tech, index) => (
            <span key={index} className="tech-tag placeholder-tech">
              {tech}
            </span>
          ))}
        </div>
        <div className="project-links">
          {link && (
            <a href={link} className="project-link" target="_blank" rel="noopener noreferrer">
              Live Demo
            </a>
          )}
          {github && (
            <a href={github} className="project-link" target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
          )}
        </div>
      </div>
    </article>
  )
}

function Projects() {
  const projects = [
    {
      title: '[Project Name 1]',
      description: '[Brief description of the project, what it does, and your role. This is placeholder content.]',
      techStack: ['[React]', '[Node.js]', '[Database]'],
      link: '#',
      github: '#'
    },
    {
      title: '[Project Name 2]',
      description: '[Brief description of the project, what it does, and your role. This is placeholder content.]',
      techStack: ['[Vue]', '[Express]', '[MongoDB]'],
      link: '#',
      github: '#'
    },
    {
      title: '[Project Name 3]',
      description: '[Brief description of the project, what it does, and your role. This is placeholder content.]',
      techStack: ['[Next.js]', '[Python]', '[PostgreSQL]'],
      link: '#',
      github: '#'
    }
  ]

  return (
    <section id="projects" className="projects" aria-labelledby="projects-heading">
      <div className="section-container">
        <h2 id="projects-heading" className="section-title">Projects</h2>
        <div className="projects-grid">
          {projects.map((project, index) => (
            <ProjectCard key={index} {...project} />
          ))}
        </div>
        <p className="placeholder-note">
          [All projects above are placeholders. Replace with your actual projects.]
        </p>
      </div>
    </section>
  )
}

export default Projects