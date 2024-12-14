import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { stackServerApp } from '@/stack';

import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export default async function Heroes() {
  const user = await stackServerApp.getUser();

  return (
    <section className="flex flex-1 flex-col items-center justify-center gap-2">
      <div className="text-center">
        <p className="text-6xl font-bold">Welcome to Scriptum</p>
        <p className="text-2xl">
          Scriptum is the documentation and collaboration tool
        </p>
      </div>
      {user && (
        <Button asChild>
          <Link href="/workspace">
            Enter Scriptum <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      )}
      <Image src="/creative.svg" alt="creative" width={500} height={500} />
    </section>
  );
}
