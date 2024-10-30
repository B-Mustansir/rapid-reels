'use client';

import { useState, useEffect } from 'react';
import { CheckCircle } from 'lucide-react';
import { ReclaimProofRequest } from '@reclaimprotocol/js-sdk';
import { QRCodeSVG } from 'qrcode.react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/hooks/use-toast';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { RECLAIM_PROVIDERS } from '@/lib/constants/reclaim-providers';
import { updateTrustScore } from '@/lib/utils/trust-score';

export function ReclaimVerification({ onVerificationComplete, userId }) {
  const [requestUrl, setRequestUrl] = useState('');
  const [proofs, setProofs] = useState(null);
  const [status, setStatus] = useState('');
  const [verificationComplete, setVerificationComplete] = useState(false);
  const { toast } = useToast();

  const handleVerificationSuccess = (proofs) => {
    if (proofs) {
      if (typeof proofs === 'string') {
        console.log('SDK Message:', proofs);
        setProofs(JSON.parse(proofs));
      } else {
        console.log('Proof received:', proofs);
        setProofs(proofs);
        setVerificationComplete(true);

        // Update trust score
        const updatedScore = updateTrustScore(userId, RECLAIM_PROVIDERS.GITHUB.id);
        console.log('Updated score:', updatedScore);

        toast({
          title: 'Verification Completed',
          description: `${RECLAIM_PROVIDERS.GITHUB.name} verified successfully!`,
        });
        onVerificationComplete?.(proofs);
      }
      setStatus('Proof received!');
    }
  };

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
          handleVerificationSuccess,
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
  }, [onVerificationComplete, userId]);

  async function initializeReclaim() {
    if (!process.env.NEXT_PUBLIC_RECLAIM_APP_ID || !process.env.NEXT_PUBLIC_RECLAIM_APP_SECRET) {
      throw new Error('Missing Reclaim credentials');
    }

    return await ReclaimProofRequest.init(
      process.env.NEXT_PUBLIC_RECLAIM_APP_ID,
      process.env.NEXT_PUBLIC_RECLAIM_APP_SECRET,
      RECLAIM_PROVIDERS.GITHUB.id
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

  const renderProofTable = (proofData) => {
    if (!proofData) return null;

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
        );
      }
      return String(value);
    };

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
          <div>{renderProofTable(proofs)}</div>
          <pre className="text-sm bg-gray-50 p-4 rounded overflow-auto">
            {JSON.stringify(proofs, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
