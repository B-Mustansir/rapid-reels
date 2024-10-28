"use client"

import { Shield, CheckCircle, AlertCircle } from 'lucide-react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { Progress } from '@/components/ui/progress'
import { ReclaimVerification } from '@/components/verification/reclaim-verification'
interface TrustScoreProps {
  score: {
    proof_of_personhood: boolean
    engagement_score: number
    verification_level: 'none' | 'basic' | 'advanced'
    total_score: number
    verifications: string[]
  } | null
  userId: string
}

export function TrustScore({ score, userId }: TrustScoreProps) {
  const getVerificationStatus = () => {
    if (!score) return 'Not Verified'
    if (score.verification_level === 'advanced') return 'Fully Verified'
    if (score.verification_level === 'basic') return 'Partially Verified'
    return 'Not Verified'
  }

  const getScoreColor = () => {
    if (!score) return 'bg-gray-200'
    if (score.total_score > 80) return 'bg-green-500'
    if (score.total_score > 50) return 'bg-yellow-500'
    return 'bg-red-500'
  }

  const handleVerificationComplete = (proofData: any) => {
    // Handle the verification completion
    console.log('Verification completed with proof data:', proofData)
    // Here you can update the score or trigger a refresh
  }

  return (
    <div className="mt-8 bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold flex items-center">
          <Shield className="mr-2 h-5 w-5" />
          Trust Score
        </h2>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <div className="flex items-center">
                {score?.proof_of_personhood ? (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                ) : (
                  <AlertCircle className="h-5 w-5 text-yellow-500" />
                )}
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>
                {score?.proof_of_personhood
                  ? 'Verified Human'
                  : 'Proof of Personhood not verified'}
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <div className="space-y-4">
        <div>
          <div className="flex justify-between mb-2">
            <span className="text-sm font-medium">Trust Score</span>
            <span className="text-sm font-medium">
              {score?.total_score || 0}%
            </span>
          </div>
          <Progress
            value={score?.total_score || 0}
            className={getScoreColor()}
          />
        </div>

        <div className="border-t pt-4">
          <h3 className="font-medium mb-2">Verifications</h3>
          <div className="space-y-2">
            {score?.verifications.map((verification) => (
              <div
                key={verification}
                className="flex items-center text-sm text-gray-600"
              >
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                {verification}
              </div>
            ))}
          </div>
        </div>

        <div className="border-t pt-4">
          <h3 className="font-medium mb-2">Verification Status</h3>
          <ReclaimVerification onVerificationComplete={handleVerificationComplete} />
        </div>
      </div>
    </div>
  )
}
