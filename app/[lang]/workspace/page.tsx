'use client';
import React from 'react';
import dynamic from 'next/dynamic';

const Editor = dynamic(() => import('@/components/editor'), { ssr: false });

export default function Page() {
  return (
    <div className="h-full">
      <p className="ml-12 text-3xl">Document</p>
      <Editor />
    </div>
  );
}
