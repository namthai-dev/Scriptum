'use client';
import Image from 'next/image';
import { useOrganization, useUser } from '@clerk/nextjs';

import { Button } from '@/components/ui/button';
import { CirclePlusIcon } from 'lucide-react';
import { toast } from 'sonner';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';

export default function Page() {
  const { user } = useUser();
  const create = useMutation(api.documents.create);
  const { organization } = useOrganization();

  const handleCreate = () => {
    const promise = create({
      title: 'Untitled',
      orgId: organization?.id as string,
    });
    toast.promise(promise, {
      loading: 'Creating a new note...',
      success: 'A new note created!',
      error: 'Failed to create new note.',
    });
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
