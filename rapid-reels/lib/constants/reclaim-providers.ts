export const RECLAIM_PROVIDERS = {
  EDIT_AI: {
    id: 'f35480af-3e8a-4fe6-9ff3-13cfdc62c4c9',
    name: 'Edit AI Tokens Verified',
    scoreValue: 30,
  },
  GITHUB: {
    id: '6d3f6753-7ee6-49ee-a545-62f1b1822ae5',
    name: 'GitHub Account Verified',
    scoreValue: 50,
  },
  INSTAGRAM: {
    id: '823aa38f-7a42-4dd9-854e-7cf574100cc8',
    name: 'Instagram Account Verified',
    scoreValue: 40,
  },
  LINKEDIN: {
    id: 'a9f1063c-06b7-476a-8410-9ff6e427e637',
    name: 'LinkedIn Profile Verified',
    scoreValue: 25,
  },
  CREDIT_KARMA: {
    id: 'add9a3cc-a13e-4572-818d-62446bcae8ef',
    name: 'Credit Karma Score Verified',
    scoreValue: 75,
  },
} as const

export type ReclaimProviderKey = keyof typeof RECLAIM_PROVIDERS
