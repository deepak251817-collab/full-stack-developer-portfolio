function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer" role="contentinfo">
      <div className="section-container">
        <div className="footer-content">
          <p className="footer-copyright">
            &copy; {currentYear} Deepak R. All rights reserved.
          </p>
          <div className="footer-social">
            <p className="footer-social-text placeholder-text">
              [GitHub: placeholder · LinkedIn: placeholder · Email: deepak251817@gmail.com · Phone: +91 8867034217]
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer