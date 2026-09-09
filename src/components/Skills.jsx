function Skills() {
  const skillCategories = [
    {
      category: 'Frontend',
      skills: ['HTML', 'CSS', 'JavaScript', 'React']
    },
    {
      category: 'Backend',
      skills: ['Node.js', 'Express.js']
    },
    {
      category: 'Database',
      skills: ['MongoDB', 'MySQL']
    },
    {
      category: 'Tools',
      skills: ['Git', 'GitHub', 'VS Code']
    }
  ]

  return (
    <section id="skills" className="skills fade-in" aria-labelledby="skills-heading">
      <div className="section-container">
        <div className="skills-header">
          <h2 id="skills-heading" className="section-title">Skills & Tools</h2>
          <p className="skills-subtitle placeholder-text">
            [Technologies and tools I work with. This is placeholder content — replace with your actual skill set.]
          </p>
        </div>
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
      </div>
    </section>
  )
}

export default Skills