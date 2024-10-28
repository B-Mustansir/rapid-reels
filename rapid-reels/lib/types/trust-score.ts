export interface TrustScore {
  proof_of_personhood: boolean
  engagement_score: number
  verification_level: 'none' | 'basic' | 'advanced'
  total_score: number
  verifications: string[]
}

export interface VerificationHistoryEntry {
  type: string
  date: string
  status: 'Verified'
}
