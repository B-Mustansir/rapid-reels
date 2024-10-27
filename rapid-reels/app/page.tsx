import React from 'react';
import Image from "next/image";
import dynamic from 'next/dynamic';
import { CloudinaryUpload } from './components/cloudinary-upload';

const ReclaimDemo = dynamic(() => import('./components/reclaim-demo'), { ssr: false });

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <h1 className="text-4xl font-bold mb-8">Welcome to Our App</h1>
        <CloudinaryUpload
          cloudName={process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ?? ''}
          uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET ?? ''}
        />
        <ReclaimDemo />
      </div>
    </main>
  );
}
