export const RECLAIM_PROVIDERS = {
  EDIT_AI: {
    id: 'f35480af-3e8a-4fe6-9ff3-13cfdc62c4c9',
    name: 'Edit AI Tokens Verified',
    scoreValue: 30,
  },
  GITHUB: {
    id: '6d3f6753-7ee6-49ee-a545-62f1b1822ae5',
    name: 'GitHub Account Verified',
    scoreValue: 20, // Works
  },
  GMAIL: {
    id: 'f9f383fd-32d9-4c54-942f-5e9fda349762',
    name: 'Gmail Verified',
    scoreValue: 20, // Works
  },
  INSTAGRAM: {
    id: '823aa38f-7a42-4dd9-854e-7cf574100cc8',
    name: 'Instagram Account Verified',
    scoreValue: 60, // Doesn't work
  },
  LINKEDIN: {
    id: 'a9f1063c-06b7-476a-8410-9ff6e427e637',
    name: 'LinkedIn Profile Verified',
    scoreValue: 25, // Doesn't work
  },
  CREDIT_KARMA: {
    id: 'add9a3cc-a13e-4572-818d-62446bcae8ef',
    name: 'Credit Karma Score Verified',
    scoreValue: 75, // Doesn't work
  },
  LEETCODE: {
    id: '29162ff4-c52c-4275-829e-f8eaba1e7b99',
    name: 'LeetCode Profile Verified',
    scoreValue: 40, // Doesn't work
  },
  FACEBOOK: {
    id: '823aa38f-7a42-4dd9-854e-7cf574100cc8',
    name: 'Facebook Account Verified',
    scoreValue: 50, // Doesn't work
  },
  BINANCE: {
    id: '2b22db5c-78d9-4d82-84f0-a9e0a4ed0470',
    name: 'Binance KYC Verified',
    scoreValue: 70, // Doesn't work
  },
} as const

export type ReclaimProviderKey = keyof typeof RECLAIM_PROVIDERS
