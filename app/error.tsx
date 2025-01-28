'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Error() {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-4">
      <h1>Error !!!</h1>
      <p>Something wrong happened</p>
      <Button>
        <Link href="/documents">Go back</Link>
      </Button>
    </div>
  );
}
