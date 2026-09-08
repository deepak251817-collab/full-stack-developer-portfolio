function Hero() {
  return (
    <section id="hero" className="hero" aria-labelledby="hero-heading">
      <div className="hero-container">
        <div className="hero-content">
          <p className="hero-greeting">Hello, I'm</p>
          <h1 id="hero-heading" className="hero-name">
            [Your Name Here]
          </h1>
          <p className="hero-title">Full Stack Developer</p>
          <p className="hero-description">
            [Short professional description about your background, expertise, and what you
            bring to a team. This is placeholder content that will be replaced with your
            actual introduction.]
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