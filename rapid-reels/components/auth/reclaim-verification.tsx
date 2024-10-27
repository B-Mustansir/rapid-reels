"use client"

import { useState, useEffect } from 'react'
import { ReclaimProofRequest } from '@reclaimprotocol/js-sdk'
import { Button } from '@/components/ui/button'
import { useToast } from '@/hooks/use-toast'

export function ReclaimVerification() {
  const [requestUrl, setRequestUrl] = useState('')
  const [isVerified, setIsVerified] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    async function setupReclaim() {
      try {
        const reclaimProofRequest = await ReclaimProofRequest.init(
          process.env.NEXT_PUBLIC_RECLAIM_APP_ID!,
          process.env.NEXT_PUBLIC_RECLAIM_APP_SECRET!,
          'YOUR_CALLBACK_URL', // Add your callback URL here
          {} // Add any additional options here
        )
        setRequestUrl(await reclaimProofRequest.getRequestUrl())
      } catch (error) {
        console.error('Error setting up Reclaim:', error)
      }
    }
    setupReclaim()
  }, [])

  const handleVerification = async () => {
    // Here you would implement the logic to verify the user's proof
    // For now, we'll just simulate a successful verification
    setIsVerified(true)
    toast({
      title: "Verification Successful",
      description: "Your identity has been verified using Reclaim Protocol.",
    })
  }

  return (
    <div className="mt-4">
      <h2 className="text-lg font-semibold mb-2">Verify Your Identity</h2>
      {!isVerified ? (
        <>
          <p className="mb-2">Click the button below to verify your identity using Reclaim Protocol:</p>
          <Button onClick={handleVerification}>
            Verify with Reclaim
          </Button>
        </>
      ) : (
        <p className="text-green-600">Your identity has been verified!</p>
      )}
    </div>
  )
}
