function Skills() {
  const skillCategories = [
    {
      category: 'Frontend',
      skills: ['[React]', '[JavaScript]', '[TypeScript]', '[HTML/CSS]', '[Vite]']
    },
    {
      category: 'Backend',
      skills: ['[Node.js]', '[Express]', '[Python]', '[Database]', '[API Design]']
    },
    {
      category: 'Tools & Others',
      skills: ['[Git]', '[Docker]', '[Testing]', '[CI/CD]', '[Agile]']
    }
  ]

  return (
    <section id="skills" className="skills" aria-labelledby="skills-heading">
      <div className="section-container">
        <h2 id="skills-heading" className="section-title">Skills</h2>
        <div className="skills-grid">
          {skillCategories.map(({ category, skills }) => (
            <div key={category} className="skill-category">
              <h3 className="skill-category-title">{category}</h3>
              <ul className="skill-list">
                {skills.map((skill, index) => (
                  <li key={index} className="skill-item placeholder-skill">
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="placeholder-note">
          [All skills above are placeholders. Replace with your actual skill set.]
        </p>
      </div>
    </section>
  )
}

export default Skills