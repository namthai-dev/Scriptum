import React from 'react';
import Image from 'next/image';
export default function Heroes() {
  return (
    <div className="flex grow flex-col items-center justify-center">
      <p className="text-7xl font-bold">Welcome to Scriptum</p>
      <p className="text-3xl">
        Scriptum is the documentation and collaboration tool
      </p>
      <Image src="/creative.svg" alt="creative" width={500} height={500} />
    </div>
  );
}
