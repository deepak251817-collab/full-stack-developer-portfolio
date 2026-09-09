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

  const achievements = [
    {
      title: 'HackOcean 2026',
      detail: 'Finalist — National-Level Frontend Hackathon, Digital Learning Group (DLG), MITS Gwalior',
      date: 'July 2026'
    },
    {
      title: 'Null Point',
      detail: 'Technical Event Participant, K.S. Institute of Technology, Bengaluru'
    }
  ]

  const certifications = [
    'Deloitte Australia Data Analytics Job Simulation — Forage, 2026',
    'Scientific Computing with Python — freeCodeCamp',
    'Python Fundamentals — Infosys Springboard',
    'Java for Beginners — Infosys Springboard',
    'Java Programming — Great Learning',
    'UI/UX for Beginners — Great Learning'
  ]

  return (
    <section id="about" className="about fade-in" aria-labelledby="about-heading">
      <div className="section-container">
        <div className="about-header">
          <p className="section-label">About Me</p>
          <h2 id="about-heading" className="section-title">Full Stack Developer & AI/ML Undergraduate</h2>
        </div>
        <div className="about-grid">
          <div className="about-content">
            <p className="about-paragraph">
              Artificial Intelligence and Machine Learning undergraduate interested in building practical software applications that combine frontend, backend, data and AI/ML technologies.
            </p>
            <p className="about-paragraph">
              I work with Python, Java, JavaScript and SQL, and have experience with modern frontend and backend technologies including React, Vite, Node.js, FastAPI and REST APIs.
            </p>
            <div className="about-highlights">
              {highlights.map((item, index) => (
                <div key={index} className="highlight-item">
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
                </div>
              ))}
            </div>
            <div className="about-achievements">
              <h3 className="achievements-title">Achievements</h3>
              <ul className="achievements-list">
                {achievements.map((item, index) => (
                  <li key={index} className="achievement-item">
                    <div className="achievement-header">
                      <strong>{item.title}</strong>
                      {item.date && <span className="achievement-date">{item.date}</span>}
                    </div>
                    <p className="achievement-detail">{item.detail}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div className="about-certifications">
              <h3 className="achievements-title">Certifications</h3>
              <ul className="certifications-list">
                {certifications.map((cert, index) => (
                  <li key={index} className="certification-item">{cert}</li>
                ))}
              </ul>
            </div>
          </div>
          <aside className="about-visual" aria-hidden="true">
            <div className="profile-card">
              <div className="profile-placeholder">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </div>
              <div className="profile-info">
                {profileInfo.map((item, index) => (
                  <div key={index} className="profile-info-item">
                    <dt className="profile-info-label">{item.label}</dt>
                    <dd className="profile-info-value">{item.value}</dd>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  )
}

export default About