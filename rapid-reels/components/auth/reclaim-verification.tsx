"use client"

import { useState, useEffect } from 'react'
import { ReclaimProofRequest } from '@reclaimprotocol/js-sdk'
import { Button } from '@/components/ui/button'
import { useToast } from '@/hooks/use-toast'

export function ReclaimVerification() {
  const [requestUrl, setRequestUrl] = useState('')
  const [proofs, setProofs] = useState<any>(null)
  const [status, setStatus] = useState('')
  const { toast } = useToast()

  useEffect(() => {
    async function setup() {
      if (typeof window === 'undefined') return

      try {
        const reclaimProofRequest = await initializeReclaim()
        const url = await generateRequestUrl(reclaimProofRequest)
        setRequestUrl(url)
        setStatus('Ready to start verification')

        await startVerificationSession(
          reclaimProofRequest,
          (proofs) => {
            if (proofs) {
              if (typeof proofs === 'string') {
                console.log('SDK Message:', proofs)
                setProofs(proofs)
              } else {
                console.log('Proof received:', proofs?.claimData.context)
                setProofs(JSON.stringify(proofs?.claimData.context))
              }
              setStatus('Proof received!')
              toast({
                title: "Verification Successful",
                description: "Your identity has been verified using Reclaim Protocol.",
              })
            }
          },
          (error) => {
            console.error('Verification failed', error)
            setStatus(`Error: ${error.message}`)
            toast({
              title: "Verification Failed",
              description: error.message,
              variant: "destructive",
            })
          }
        )
      } catch (error: any) {
        console.error('Setup failed', error)
        setStatus(`Setup failed: ${error.message}`)
        toast({
          title: "Setup Failed",
          description: error.message,
          variant: "destructive",
        })
      }
    }

    setup()
  }, [toast])

  async function initializeReclaim() {
    const reclaimProofRequest = await ReclaimProofRequest.init(
      process.env.NEXT_PUBLIC_RECLAIM_APP_ID!,
      process.env.NEXT_PUBLIC_RECLAIM_APP_SECRET!,
      "a09df809-ea2d-4413-ab2f-0d83689e388d"
    )
    return reclaimProofRequest
  }

  async function generateRequestUrl(reclaimProofRequest: any) {
    const requestUrl = await reclaimProofRequest.getRequestUrl()
    console.log('Request URL:', requestUrl)
    return requestUrl
  }

  async function startVerificationSession(
    reclaimProofRequest: any,
    onSuccess: (proofs: any) => void,
    onFailure: (error: Error) => void
  ) {
    await reclaimProofRequest.startSession({
      onSuccess,
      onFailure,
    })
  }

  return (
    <div className="mt-4">
      <h2 className="text-lg font-semibold mb-2">Verify Your Identity</h2>
      <p className="mb-2 text-muted-foreground">Status: {status}</p>
      
      {requestUrl && (
        <div className="mb-4">
          <p className="text-sm text-muted-foreground">Request URL: {requestUrl}</p>
          <p className="text-sm text-muted-foreground">Use this URL to start the verification process</p>
        </div>
      )}

      {proofs && (
        <div className="mt-4">
          <h3 className="text-md font-semibold text-green-600">Verification Successful!</h3>
          <pre className="mt-2 p-4 bg-muted rounded-lg overflow-x-auto">
            {JSON.stringify(proofs, null, 2)}
          </pre>
        </div>
      )}
    </div>
  )
}
