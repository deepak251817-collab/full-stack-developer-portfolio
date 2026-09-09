function Skills() {
  const skillCategories = [
    {
      category: 'Languages',
      skills: ['Python', 'Java', 'JavaScript', 'SQL']
    },
    {
      category: 'Frontend',
      skills: ['HTML5', 'CSS3', 'React.js', 'Vite', 'Tailwind CSS']
    },
    {
      category: 'Backend',
      skills: ['Node.js', 'FastAPI', 'REST APIs']
    },
    {
      category: 'AI/ML',
      skills: ['Pandas', 'NumPy', 'Scikit-learn', 'Linear Regression', 'Logistic Regression', 'Isolation Forest', 'TF-IDF']
    },
    {
      category: 'Databases',
      skills: ['MongoDB', 'MySQL']
    },
    {
      category: 'Tools & APIs',
      skills: ['Git', 'GitHub', 'VS Code', 'Mapbox API', 'OpenWeather API', 'Leaflet', 'Recharts']
    }
  ]

  return (
    <section id="skills" className="skills fade-in" aria-labelledby="skills-heading">
      <div className="section-container">
        <div className="skills-header">
          <h2 id="skills-heading" className="section-title">Skills & Tools</h2>
        </div>
        <div className="skills-grid">
          {skillCategories.map(({ category, skills }) => (
            <div key={category} className="skill-category">
              <h3 className="skill-category-title">{category}</h3>
              <ul className="skill-list">
                {skills.map((skill, index) => (
                  <li key={index} className="skill-item">{skill}</li>
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