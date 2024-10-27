"use client"; 

import React, { useState, useEffect } from 'react'
import { ReclaimProofRequest } from '@reclaimprotocol/js-sdk'

const ReclaimDemo = () => {
  const [requestUrl, setRequestUrl] = useState('')
  const [proofs, setProofs] = useState(null)
  const [status, setStatus] = useState('')

  useEffect(() => {
    async function setup() {
      if (typeof window === 'undefined') return;

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
            }
          },
          (error) => {
            console.error('Verification failed', error)
            setStatus(`Error: ${error.message}`)
          }
        )
      } catch (error) {
        console.error('Setup failed', error)
        setStatus(`Setup failed: ${error.message}`)
      }
    }

    setup()
  }, [])

  async function initializeReclaim() {
    const reclaimProofRequest = await ReclaimProofRequest.init(
        process.env.NEXT_PUBLIC_RECLAIM_APP_ID,
        process.env.NEXT_PUBLIC_RECLAIM_APP_SECRET,
        "a09df809-ea2d-4413-ab2f-0d83689e388d"    
    )
    return reclaimProofRequest
  }

  async function generateRequestUrl(reclaimProofRequest) {
    const requestUrl = await reclaimProofRequest.getRequestUrl()
    console.log('Request URL:', requestUrl)
    return requestUrl
  }

  async function startVerificationSession(reclaimProofRequest, onSuccess, onFailure) {
    await reclaimProofRequest.startSession({
      onSuccess: onSuccess,
      onFailure: onFailure,
    })
  }

  return (
    <div>
      <h1>Reclaim Protocol Demo</h1>
      <p>Status: {status}</p>
      {requestUrl && (
        <div>
          <p>Request URL: {requestUrl}</p>
          <p>Use this URL to start the verification process</p>
        </div>
      )}
      {proofs && (
        <div>
          <h2>Verification Successful!</h2>
          <pre>{JSON.stringify(proofs, null, 2)}</pre>
        </div>
      )}
    </div>
  )
}

export default ReclaimDemo

// Response
// Proof received: {"contextAddress":"0x0","contextMessage":"sample context","extractedParameters":{"username":"MustansirBohari"},"providerHash":"0x0aa07ce675d8d22d9a40ee9aa165c2d23952ee4f23234142e1e733f5da56a3c9"}