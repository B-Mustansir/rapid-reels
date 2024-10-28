'use client';

import { useState, useEffect } from 'react';
import { CheckCircle } from 'lucide-react';
import { ReclaimProofRequest } from '@reclaimprotocol/js-sdk';
import { QRCodeSVG } from 'qrcode.react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/hooks/use-toast';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export function ReclaimVerification({ onVerificationComplete }) {
  const [requestUrl, setRequestUrl] = useState('');
  const [proofs, setProofs] = useState(null);
  const [status, setStatus] = useState('');
  const [verificationComplete, setVerificationComplete] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    async function setup() {
      if (typeof window === 'undefined') return;

      try {
        const reclaimProofRequest = await initializeReclaim();
        const url = await generateRequestUrl(reclaimProofRequest);
        setRequestUrl(url);
        setStatus('Ready to start verification');

        await startVerificationSession(
          reclaimProofRequest,
          (proofs) => {
            if (proofs) {
              if (typeof proofs === 'string') {
                console.log('SDK Message:', proofs);
                setProofs(JSON.parse(proofs));
              } else {
                console.log('Proof received:', proofs?.claimData.context);
                console.log('Proofs:', proofs);
                setProofs(proofs?.claimData.context);
                setVerificationComplete(true);
                const username = proofs?.claimData.context.extractedParameters.username;
                toast({
                  title: 'Verification Completed',
                  description: `Username detected: ${username}`,
                });
                onVerificationComplete?.(proofs?.claimData.context);
              }
              setStatus('Proof received!');
            }
          },
          (error) => {
            console.error('Verification failed', error);
            setStatus(`Error: ${error.message}`);
          }
        );
      } catch (error) {
        if (error instanceof Error) {
          console.error('Setup failed', error);
          setStatus(`Setup failed: ${error.message}`);
        }
      }
    }

    setup();
  }, [onVerificationComplete]);

  async function initializeReclaim() {
    if (!process.env.NEXT_PUBLIC_RECLAIM_APP_ID || !process.env.NEXT_PUBLIC_RECLAIM_APP_SECRET) {
      throw new Error('Missing Reclaim credentials');
    }

    return await ReclaimProofRequest.init(
      process.env.NEXT_PUBLIC_RECLAIM_APP_ID,
      process.env.NEXT_PUBLIC_RECLAIM_APP_SECRET,
      '6d3f6753-7ee6-49ee-a545-62f1b1822ae5' // Github Username Provider ID
    );
  }

  async function generateRequestUrl(reclaimProofRequest) {
    const requestUrl = await reclaimProofRequest.getRequestUrl();
    console.log('Request URL:', requestUrl);
    return requestUrl;
  }

  async function startVerificationSession(reclaimProofRequest, onSuccess, onFailure) {
    await reclaimProofRequest.startSession({
      onSuccess,
      onFailure,
    });
  }

  const handleVerificationClick = () => {
    window.open(requestUrl, '_blank');
  };

  const RenderProofTable = ({ data }) => {
    const { contextAddress, contextMessage, extractedParameters, providerHash } = data;
  
    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Field</TableHead>
            <TableHead>Value</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Context Address</TableCell>
            <TableCell>{contextAddress}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Context Message</TableCell>
            <TableCell>{contextMessage}</TableCell>
          </TableRow>
          {Object.entries(extractedParameters).map(([key, value]) => (
            <TableRow key={key}>
              <TableCell>{key}</TableCell>
              <TableCell>{value}</TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell>Provider Hash</TableCell>
            <TableCell>{providerHash}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );
  };

  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-600 mb-2">{status}</p>

      {requestUrl && !verificationComplete && (
        <div className="space-y-4">
          <Button
            onClick={handleVerificationClick}
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            Start Verification
          </Button>
          <div className="mt-4">
            <QRCodeSVG value={requestUrl} size={128} />
          </div>
        </div>
      )}

      {verificationComplete && (
        <div className="flex items-center space-x-2">
          <CheckCircle className="h-5 w-5 text-green-500" />
          <span className="text-sm text-green-600">Verification Complete</span>
        </div>
      )}

      {proofs && (
        <div className="mt-4">
          <h4 className="font-medium mb-2">Verification Details</h4>
          <div>{RenderProofTable({ data: JSON.parse(proofs) })}</div>
          <pre className="text-sm bg-gray-50 p-4 rounded overflow-auto">
            {JSON.stringify(proofs, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
