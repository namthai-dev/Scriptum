import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { stackServerApp } from '@/stack';

import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export default async function Heroes() {
  const user = await stackServerApp.getUser();

  return (
    <div className="flex grow flex-col items-center justify-center">
      <p className="text-6xl font-bold">Welcome to Scriptum</p>
      <p className="text-2xl">
        Scriptum is the documentation and collaboration tool
      </p>
      {user && (
        <Button asChild>
          <Link href="/workspace">
            Enter Scriptum <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      )}
      <Image src="/creative.svg" alt="creative" width={500} height={500} />
    </div>
  );
}
