export const achievementsData = [
  {
    id: 1,
    title: 'HackOcean 2026',
    role: 'Finalist',
    organization: 'Digital Learning Group (DLG), MITS Gwalior',
    date: 'July 2026',
    description: 'National-Level Frontend Hackathon',
    proof: null,
    proofType: null,
    featured: true,
    icon: 'trophy'
  },
  {
    id: 2,
    title: 'Null Point',
    role: 'Technical Event Participant',
    organization: 'K.S. Institute of Technology, Bengaluru',
    date: '',
    description: '',
    proof: null,
    proofType: null,
    featured: false,
    icon: 'code'
  }
]

export const getFeaturedAchievements = () => achievementsData.filter(a => a.featured)
export const getAllAchievements = () => achievementsData
