'use client';
import Image from 'next/image';
import { useUser } from '@clerk/nextjs';

import { Button } from '@/components/ui/button';
import { CirclePlusIcon } from 'lucide-react';
import { toast } from 'sonner';

export default function Page() {
  const { user } = useUser();

  const handleCreate = () => {
    toast('New note created.');
  };

  return (
    <div className="flex h-full flex-col items-center justify-center gap-4">
      <Image
        src="/inventing.svg"
        className="dark:hidden"
        height={300}
        width={300}
        alt="inventing"
      />
      <Image
        src="/inventing-dark.svg"
        className="hidden dark:block"
        height={300}
        width={300}
        alt="inventing"
      />
      <h2 className="text-lg font-medium">
        Welcome to {user?.firstName}&apos;s Scriptum
      </h2>
      <Button onClick={handleCreate}>
        <CirclePlusIcon />
        Create a note
      </Button>
    </div>
  );
}
