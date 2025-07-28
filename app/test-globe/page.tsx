"use client";

import { Globe } from '@/components/magicui/globe';

export default function TestGlobe() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="w-96 h-96 bg-white rounded-lg shadow-lg p-4">
        <h1 className="text-2xl font-bold mb-4">Globe Test</h1>
        <div className="w-full h-80">
          <Globe className="w-full h-full" />
        </div>
      </div>
    </div>
  );
} 