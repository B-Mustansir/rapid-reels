"use client"

import React, { useState } from 'react'
import { CldUploadWidget } from 'next-cloudinary'

interface CloudinaryUploadProps {
  cloudName: string
  uploadPreset: string
}

interface CloudinaryResult {
  public_id: string
  secure_url: string
}

export function CloudinaryUpload({ cloudName, uploadPreset }: CloudinaryUploadProps) {
  const [uploadedAssets, setUploadedAssets] = useState<CloudinaryResult[]>([])

  const handleUploadSuccess = (result: CloudinaryResult) => {
    setUploadedAssets(prevAssets => [...prevAssets, result])
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Cloudinary Upload</h1>
      
      <CldUploadWidget
        uploadPreset={uploadPreset}
        onSuccess={(result) => handleUploadSuccess(result.info as CloudinaryResult)}
      >
        {({ open }) => (
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => open()}
          >
            Upload Image/Video
          </button>
        )}
      </CldUploadWidget>

      {uploadedAssets.length > 0 && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-2">Uploaded Assets:</h2>
          <ul className="list-disc pl-5">
            {uploadedAssets.map((asset, index) => (
              <li key={index} className="mb-2">
                <a
                  href={asset.secure_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  {asset.public_id}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
