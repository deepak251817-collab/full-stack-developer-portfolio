function Hero() {
  return (
    <section id="hero" className="hero" aria-labelledby="hero-heading">
      <div className="hero-content">
        <h1 id="hero-heading" className="hero-name">
          [Your Name Here]
        </h1>
        <p className="hero-title">Full Stack Developer</p>
        <p className="hero-description">
          [Short introduction about yourself, your background, and what you do. This is placeholder content.]
        </p>
        <div className="hero-buttons">
          <a href="#projects" className="btn btn-primary">View Projects</a>
          <a href="#contact" className="btn btn-secondary">Contact</a>
        </div>
      </div>
    </section>
  )
}

export default Hero