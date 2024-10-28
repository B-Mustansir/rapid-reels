import { RECLAIM_PROVIDERS } from '../constants/reclaim-providers'

export interface VerificationHistoryEntry {
  type: string
  date: string
  status: 'Verified'
}

export interface TrustScoreData {
  proof_of_personhood: boolean
  engagement_score: number
  verification_level: 'none' | 'basic' | 'advanced'
  total_score: number
  verifications: string[]
  verification_history: VerificationHistoryEntry[]
}

const INITIAL_TRUST_SCORE: TrustScoreData = {
  proof_of_personhood: false,
  engagement_score: 30,
  verification_level: 'basic',
  total_score: 15,
  verifications: ['Email Verified'], // Assuming email is verified during signup
  verification_history: [
    {
      type: 'Email',
      date: new Date().toISOString().split('T')[0],
      status: 'Verified'
    }
  ]
}

export function getTrustScore(userId: string): TrustScoreData {
  if (typeof window === 'undefined') return INITIAL_TRUST_SCORE

  const stored = localStorage.getItem(`trust-score-${userId}`)
  return stored ? JSON.parse(stored) : INITIAL_TRUST_SCORE
}

export function updateTrustScore(userId: string, providerId: string): TrustScoreData {
  const currentScore = getTrustScore(userId)
  const provider = Object.values(RECLAIM_PROVIDERS).find(p => p.id === providerId)
  
  if (!provider) return currentScore

  // Skip if already verified
  if (currentScore.verifications.includes(provider.name)) return currentScore

  const newScore: TrustScoreData = {
    ...currentScore,
    verifications: [...currentScore.verifications, provider.name],
    verification_history: [
      ...currentScore.verification_history,
      {
        type: provider.name,
        date: new Date().toISOString().split('T')[0],
        status: 'Verified'
      }
    ],
    total_score: Math.min(100, currentScore.total_score + provider.scoreValue)
  }

  // Update verification level based on total verifications
  newScore.verification_level = 
    newScore.verifications.length >= 4 ? 'advanced' :
    newScore.verifications.length >= 2 ? 'basic' : 'none'

  // Update proof of personhood if they have at least basic verification
  newScore.proof_of_personhood = newScore.verification_level !== 'none'

  localStorage.setItem(`trust-score-${userId}`, JSON.stringify(newScore))
  return newScore
}
