import { motion } from 'framer-motion'

function About() {
  const highlights = [
    { label: 'Full Stack Development', description: 'Building end-to-end web applications with React, Node.js, FastAPI' },
    { label: 'AI/ML Integration', description: 'Applying ML models (Linear/Logistic Regression, Isolation Forest, TF-IDF) in production apps' },
    { label: 'Data Visualization', description: 'Interactive dashboards with Recharts, Leaflet, Mapbox GL JS' }
  ]

  const profileInfo = [
    { label: 'Education', value: 'B.E. in AI & ML, K.S. Institute of Technology (CGPA: 9.16/10)' },
    { label: 'Location', value: 'Bengaluru, India' },
    { label: 'Current Focus', value: 'Full Stack Development, AI/ML Applications' }
  ]





  return (
    <section id="about" className="about" aria-labelledby="about-heading">
      <div className="section-container">
        <motion.div
          className="about-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <p className="section-label">About Me</p>
          <h2 id="about-heading" className="section-title">Full Stack Developer & AI/ML Undergraduate</h2>
        </motion.div>

        <motion.div
          className="about-grid"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <motion.div className="about-content">
            <motion.p
              className="about-paragraph"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Artificial Intelligence and Machine Learning undergraduate interested in building practical software applications that combine frontend, backend, data and AI/ML technologies.
            </motion.p>
            <motion.p
              className="about-paragraph"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              I work with Python, Java, JavaScript and SQL, and have experience with modern frontend and backend technologies including React, Vite, Node.js, FastAPI and REST APIs.
            </motion.p>

            <motion.div
              className="about-highlights"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              {highlights.map((item, index) => (
                <motion.div
                  key={index}
                  className="highlight-item"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                  whileHover={{ x: 4 }}
                >
                  <div className="highlight-icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" />
                      <path d="M8 12l2 2 4-4" />
                    </svg>
                  </div>
                  <div className="highlight-text">
                    <strong>{item.label}</strong>
                    <span>{item.description}</span>
                  </div>
                </motion.div>
              ))}
            </motion.div>




          </motion.div>

          <motion.aside
            className="about-visual"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="profile-card">
              <div className="profile-placeholder">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </div>
              <div className="profile-info">
                {profileInfo.map((item, index) => (
                  <motion.div
                    key={index}
                    className="profile-info-item"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                  >
                    <dt className="profile-info-label">{item.label}</dt>
                    <dd className="profile-info-value">{item.value}</dd>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.aside>
        </motion.div>
      </div>
    </section>
  )
}

export default About