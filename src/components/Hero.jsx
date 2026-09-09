function Hero() {
  return (
    <section id="hero" className="hero" aria-labelledby="hero-heading">
      <div className="hero-container">
        <div className="hero-content">
          <p className="hero-greeting">Hello, I'm</p>
          <h1 id="hero-heading" className="hero-name">
            Deepak R
          </h1>
          <p className="hero-title">Full Stack Developer & AI/ML Undergraduate</p>
          <p className="hero-description">
            Artificial Intelligence and Machine Learning undergraduate interested in building practical software applications that combine frontend, backend, data and AI/ML technologies. I work with Python, Java, JavaScript and SQL, and have experience with modern frontend and backend technologies including React, Vite, Node.js, FastAPI and REST APIs.
          </p>
          <div className="hero-buttons">
            <a href="#projects" className="btn btn-primary">View Projects</a>
            <a href="#contact" className="btn btn-secondary">Contact Me</a>
          </div>
        </div>
        <div className="hero-visual" aria-hidden="true">
          <div className="hero-placeholder">
            <svg
              className="hero-placeholder-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              aria-hidden="true"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <path d="M21 15l-5-5L5 21" />
            </svg>
            <span className="hero-placeholder-text">Profile Image</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero