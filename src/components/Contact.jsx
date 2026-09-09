import { useState } from 'react'

const initialValues = {
  name: '',
  email: '',
  subject: '',
  message: ''
}

const validateField = (name, value) => {
  const trimmed = value.trim()
  
  switch (name) {
    case 'name':
      if (!trimmed) return 'Please enter your name.'
      if (trimmed.length < 2) return 'Name must be at least 2 characters.'
      return ''
    case 'email':
      if (!trimmed) return 'Please enter your email address.'
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) return 'Please enter a valid email address.'
      return ''
    case 'subject':
      if (!trimmed) return 'Please enter a subject.'
      if (trimmed.length < 3) return 'Subject must be at least 3 characters.'
      return ''
    case 'message':
      if (!trimmed) return 'Please enter a message.'
      if (trimmed.length < 10) return 'Message must contain at least 10 characters.'
      return ''
    default:
      return ''
  }
}

function Contact() {
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setValues(prev => ({ ...prev, [name]: value }))
    
    if (touched[name]) {
      setErrors(prev => ({ ...prev, [name]: validateField(name, value) }))
    }
  }

  const handleBlur = (e) => {
    const { name, value } = e.target
    setTouched(prev => ({ ...prev, [name]: true }))
    setErrors(prev => ({ ...prev, [name]: validateField(name, value) }))
  }

  const validateAll = () => {
    const newErrors = {}
    let isValid = true
    
    Object.keys(initialValues).forEach(field => {
      const error = validateField(field, values[field])
      if (error) {
        newErrors[field] = error
        isValid = false
      }
    })
    
    setErrors(newErrors)
    setTouched({ name: true, email: true, subject: true, message: true })
    return isValid
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!validateAll()) return
    
    setIsSubmitting(true)
    
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSuccess(true)
      setValues(initialValues)
      setTouched({})
      setErrors({})
    }, 800)
  }

  const resetSuccess = () => {
    setIsSuccess(false)
  }

  const getFieldProps = (name) => ({
    id: name,
    name,
    value: values[name],
    onChange: handleChange,
    onBlur: handleBlur,
    'aria-invalid': touched[name] && errors[name] ? 'true' : 'false',
    'aria-describedby': touched[name] && errors[name] ? `${name}-error` : undefined,
    autoComplete: name === 'email' ? 'email' : name === 'name' ? 'name' : 'off',
    disabled: isSubmitting
  })

  if (isSuccess) {
    return (
<section id="contact" className="contact fade-in" aria-labelledby="contact-heading">
        <div className="section-container">
          <div className="contact-header">
            <p className="section-label">Contact</p>
            <h2 id="contact-heading" className="section-title">Let's Work Together</h2>
            <p className="contact-intro placeholder-text">
              [I'm always open to discussing new projects, creative ideas, or opportunities to be part of your team. This is placeholder content.]
            </p>
          </div>
          <div className="contact-success" role="alert">
            <div className="success-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
            </div>
            <h3 className="success-title">Thanks!</h3>
            <p className="success-message">Your message has been validated successfully.</p>
            <p className="success-note placeholder-text">
              [In a real implementation, this form would connect to a backend service to send the message. No actual email was sent.]
            </p>
            <button type="button" className="btn btn-secondary" onClick={resetSuccess}>
              Send Another Message
            </button>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="contact" className="contact fade-in" aria-labelledby="contact-heading">
      <div className="section-container">
        <div className="contact-header">
          <p className="section-label">Contact</p>
          <h2 id="contact-heading" className="section-title">Let's Work Together</h2>
          <p className="contact-intro placeholder-text">
            [I'm always open to discussing new projects, creative ideas, or opportunities to be part of your team. This is placeholder content.]
          </p>
        </div>
        <form className="contact-form" onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label htmlFor="name" className="form-label">
              Full Name
            </label>
            <input
              type="text"
              {...getFieldProps('name')}
              className={`form-input ${touched.name && errors.name ? 'form-input-error' : ''}`}
              placeholder="Your full name"
            />
            {touched.name && errors.name && (
              <p id="name-error" className="form-error" role="alert">
                {errors.name}
              </p>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email Address
            </label>
            <input
              type="email"
              {...getFieldProps('email')}
              className={`form-input ${touched.email && errors.email ? 'form-input-error' : ''}`}
              placeholder="your.email@example.com"
            />
            {touched.email && errors.email && (
              <p id="email-error" className="form-error" role="alert">
                {errors.email}
              </p>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="subject" className="form-label">
              Subject
            </label>
            <input
              type="text"
              {...getFieldProps('subject')}
              className={`form-input ${touched.subject && errors.subject ? 'form-input-error' : ''}`}
              placeholder="What's this about?"
            />
            {touched.subject && errors.subject && (
              <p id="subject-error" className="form-error" role="alert">
                {errors.subject}
              </p>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="message" className="form-label">
              Message
            </label>
            <textarea
              {...getFieldProps('message')}
              className={`form-textarea ${touched.message && errors.message ? 'form-input-error' : ''}`}
              placeholder="Your message..."
              rows="6"
            />
            {touched.message && errors.message && (
              <p id="message-error" className="form-error" role="alert">
                {errors.message}
              </p>
            )}
          </div>
          <button
            type="submit"
            className="btn btn-primary form-submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </button>
        </form>
        <p className="placeholder-note">
          [This form demonstrates client-side validation. Backend integration would be added in a production environment.]
        </p>
      </div>
    </section>
  )
}

export default Contact