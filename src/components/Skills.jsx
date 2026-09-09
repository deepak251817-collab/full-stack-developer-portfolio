import { motion } from 'framer-motion'

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
    <section id="skills" className="skills" aria-labelledby="skills-heading">
      <div className="section-container">
        <motion.div
          className="skills-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <h2 id="skills-heading" className="section-title">Skills & Tools</h2>
        </motion.div>

        <motion.div
          className="skills-grid"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
        >
          {skillCategories.map(({ category, skills }, catIndex) => (
            <motion.div
              key={category}
              className="skill-category"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: catIndex * 0.08 }}
              whileHover={{ y: -4 }}
            >
              <h3 className="skill-category-title">{category}</h3>
              <ul className="skill-list" role="list">
                {skills.map((skill, index) => (
                  <motion.li
                    key={index}
                    className="skill-item"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: catIndex * 0.08 + index * 0.03 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    {skill}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Skills