function About() {
  const highlights = [
    { label: 'Full Stack Development', description: 'Building end-to-end web applications' },
    { label: 'Problem Solving', description: 'Breaking down complex challenges into clean solutions' },
    { label: 'Continuous Learning', description: 'Staying current with modern development practices' }
  ]

  const profileInfo = [
    { label: 'Education', value: '[Your Degree / Bootcamp]' },
    { label: 'Location', value: '[City, Country]' },
    { label: 'Current Focus', value: '[e.g. React, Node.js, TypeScript]' }
  ]

  return (
    <section id="about" className="about" aria-labelledby="about-heading">
      <div className="section-container">
        <div className="about-header">
          <p className="section-label">About Me</p>
          <h2 id="about-heading" className="section-title">Full Stack Developer passionate about building practical software</h2>
        </div>
        <div className="about-grid">
          <div className="about-content">
            <p className="about-paragraph placeholder-text">
              [I'm a Full Stack Developer with a focus on building reliable, user-centered web applications.
              My background includes experience with modern frontend and backend technologies. This is
              placeholder content that will be replaced with your actual professional summary.]
            </p>
            <p className="about-paragraph placeholder-text">
              [I enjoy learning new technologies and applying them to solve real problems. My interests
              include clean code architecture, developer experience, and creating software that makes a
              difference. I'm always looking to grow through challenging projects and collaboration.]
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
                    <dd className="profile-info-value placeholder-text">{item.value}</dd>
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