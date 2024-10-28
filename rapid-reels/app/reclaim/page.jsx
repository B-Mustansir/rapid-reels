'use client'

import React, { useState, useEffect } from 'react'
import { ReclaimProofRequest } from '@reclaimprotocol/js-sdk'
import { CheckIcon, ChevronRightIcon } from "lucide-react"
import { AnimatedSubscribeButton } from "@/components/ui/animated-subscribe-button"
import { QRCodeSVG } from 'qrcode.react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/hooks/use-toast"

export default function ReclaimDemo() {
  const [requestUrl, setRequestUrl] = useState('')
  const [proofs, setProofs] = useState(null)
  const [status, setStatus] = useState('')
  const [verificationComplete, setVerificationComplete] = useState(false)
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
                setProofs(JSON.parse(proofs))
              } else {
                console.log('Proof received:', proofs?.claimData.context)
                setProofs(proofs?.claimData.context)
                console.log('Proofs:', proofs)
                console.log('Proofs Type:', typeof proofs)
                setVerificationComplete(true)
                const username = proofs?.claimData.context.extractedParameters.username
                toast({
                  title: "Verification Completed",
                  description: `Username detected: ${username}`,
                })
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
      // "a09df809-ea2d-4413-ab2f-0d83689e388d"    // X Username Provider ID
      "f35480af-3e8a-4fe6-9ff3-13cfdc62c4c9"    // Edit AI Provider ID
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

  const handleVerificationClick = () => {
    window.open(requestUrl, '_blank')
  }

  const renderProofTable = (proofData) => {
    if (!proofData) return null

    const renderValue = (value) => {
      if (typeof value === 'object' && value !== null) {
        return (
          <Table>
            <TableBody>
              {Object.entries(value).map(([subKey, subValue]) => (
                <TableRow key={subKey}>
                  <TableCell className="font-medium">{subKey}</TableCell>
                  <TableCell>{renderValue(subValue)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )
      }
      return String(value)
    }

    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Field</TableHead>
            <TableHead>Value</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Object.entries(proofData).map(([key, value]) => (
            <TableRow key={key}>
              <TableCell className="font-medium">{key}</TableCell>
              <TableCell>{renderValue(value)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    )
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Reclaim Protocol Demo</h1>
      <p className="mb-4">Status: {status}</p>
      {requestUrl && (
        <div className="mb-4">
          <Button
            onClick={handleVerificationClick}
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            {verificationComplete ? (
              <span className="flex items-center">
                <CheckIcon className="mr-2 h-4 w-4" />
                Verification Complete
              </span>
            ) : (
              "Start Verification"
            )}
          </Button>
          <div className="mt-4">
            <QRCodeSVG value={requestUrl} size={128} />
          </div>
        </div>
      )}
      {proofs && (
        <div>
          <h2 className="text-xl font-semibold mb-2">Verification Details</h2>
          {renderProofTable(proofs)}
        </div>
      )}
    </div>
  )
}