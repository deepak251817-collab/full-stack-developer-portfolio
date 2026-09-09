import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, Send, Loader } from 'lucide-react'

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
      <motion.section
        id="contact"
        className="contact"
        aria-labelledby="contact-heading"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="section-container">
          <motion.div
            className="contact-header"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="section-label">Contact</p>
            <h2 id="contact-heading" className="section-title">Let's Work Together</h2>
            <p className="contact-intro">
              I'm always open to discussing new projects, creative ideas, or opportunities to collaborate. Feel free to reach out via email or phone.
            </p>
          </motion.div>

          <motion.div
            className="contact-success"
            role="alert"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <motion.div
              className="success-icon"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.5, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
              aria-hidden="true"
            >
              <CheckCircle size={32} />
            </motion.div>

            <motion.h3
              className="success-title"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              Thanks!
            </motion.h3>

            <motion.p
              className="success-message"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.4 }}
            >
              Your message has been validated successfully.
            </motion.p>

            <motion.p
              className="success-note"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.5 }}
            >
              [In a real implementation, this form would connect to a backend service to send the message. No actual email was sent.]
            </motion.p>

            <motion.button
              type="button"
              className="btn btn-secondary"
              onClick={resetSuccess}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.6 }}
            >
              Send Another Message
            </motion.button>
          </motion.div>
        </div>
      </motion.section>
    )
  }

  return (
    <motion.section
      id="contact"
      className="contact"
      aria-labelledby="contact-heading"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6 }}
    >
      <div className="section-container">
        <motion.div
          className="contact-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="section-label">Contact</p>
          <h2 id="contact-heading" className="section-title">Let's Work Together</h2>
          <p className="contact-intro">
            I'm always open to discussing new projects, creative ideas, or opportunities to collaborate. Feel free to reach out via email or phone.
          </p>
        </motion.div>

        <motion.form
          className="contact-form"
          onSubmit={handleSubmit}
          noValidate
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <motion.div
            className="form-group"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <label htmlFor="name" className="form-label">
              Full Name
            </label>
            <input
              type="text"
              {...getFieldProps('name')}
              className={`form-input ${touched.name && errors.name ? 'form-input-error' : ''}`}
              placeholder="Your full name"
            />
            <AnimatePresence>
              {touched.name && errors.name && (
                <motion.p
                  id="name-error"
                  className="form-error"
                  role="alert"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  {errors.name}
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>

          <motion.div
            className="form-group"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.15 }}
          >
            <label htmlFor="email" className="form-label">
              Email Address
            </label>
            <input
              type="email"
              {...getFieldProps('email')}
              className={`form-input ${touched.email && errors.email ? 'form-input-error' : ''}`}
              placeholder="your.email@example.com"
            />
            <AnimatePresence>
              {touched.email && errors.email && (
                <motion.p
                  id="email-error"
                  className="form-error"
                  role="alert"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  {errors.email}
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>

          <motion.div
            className="form-group"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <label htmlFor="subject" className="form-label">
              Subject
            </label>
            <input
              type="text"
              {...getFieldProps('subject')}
              className={`form-input ${touched.subject && errors.subject ? 'form-input-error' : ''}`}
              placeholder="What's this about?"
            />
            <AnimatePresence>
              {touched.subject && errors.subject && (
                <motion.p
                  id="subject-error"
                  className="form-error"
                  role="alert"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  {errors.subject}
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>

          <motion.div
            className="form-group"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.25 }}
          >
            <label htmlFor="message" className="form-label">
              Message
            </label>
            <textarea
              {...getFieldProps('message')}
              className={`form-textarea ${touched.message && errors.message ? 'form-input-error' : ''}`}
              placeholder="Your message..."
              rows="6"
            />
            <AnimatePresence>
              {touched.message && errors.message && (
                <motion.p
                  id="message-error"
                  className="form-error"
                  role="alert"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  {errors.message}
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>

          <motion.button
            type="submit"
            className="btn btn-primary form-submit"
            disabled={isSubmitting}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            {isSubmitting ? (
              <>
                <Loader size={20} className="btn-spinner" aria-hidden="true" />
                Sending...
              </>
            ) : (
              <>
                Send Message
                <Send size={20} className="btn-icon" aria-hidden="true" />
              </>
            )}
          </motion.button>
        </motion.form>

        <motion.p
          className="placeholder-note"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          [This form demonstrates client-side validation. Backend integration would be added in a production environment.]
        </motion.p>
      </div>
    </motion.section>
  )
}

export default Contact