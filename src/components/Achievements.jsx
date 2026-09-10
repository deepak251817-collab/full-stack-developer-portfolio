import { motion } from 'framer-motion'

const achievements = [
  {
    id: 1,
    title: 'HackOcean 2026',
    role: 'Finalist',
    date: 'July 2026',
    description: 'National-Level Frontend Hackathon',
    organization: 'Digital Learning Group (DLG), MITS Gwalior',
    icon: 'trophy'
  },
  {
    id: 2,
    title: 'Null Point',
    role: 'Technical Event Participant',
    date: '',
    description: '',
    organization: 'K.S. Institute of Technology, Bengaluru',
    icon: 'code'
  }
]

const icons = {
  trophy: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
      <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
      <path d="M4 22h16" />
      <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
      <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
      <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
    </svg>
  ),
  code: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  )
}

function AchievementCard({ achievement, index }) {
  return (
    <motion.article
      className="achievement-card"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={{ y: -4 }}
    >
      <div className="achievement-icon" aria-hidden="true">
        {icons[achievement.icon]}
      </div>
      <div className="achievement-content">
        <div className="achievement-header">
          <h3 className="achievement-title">{achievement.title}</h3>
          <span className="achievement-role">{achievement.role}</span>
        </div>
        {achievement.date && (
          <time className="achievement-date" dateTime={achievement.date}>
            {achievement.date}
          </time>
        )}
        {achievement.description && (
          <p className="achievement-description">{achievement.description}</p>
        )}
        <p className="achievement-organization">{achievement.organization}</p>
      </div>
    </motion.article>
  )
}

function Achievements() {
  return (
    <section id="achievements" className="achievements" aria-labelledby="achievements-heading">
      <div className="section-container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
        >
          <p className="section-label">Achievements</p>
          <h2 id="achievements-heading" className="section-title">Recognition & Awards</h2>
        </motion.div>
        <motion.div
          className="achievements-grid"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5 }}
          role="list"
        >
          {achievements.map((achievement, index) => (
            <AchievementCard key={achievement.id} achievement={achievement} index={index} role="listitem" />
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Achievements