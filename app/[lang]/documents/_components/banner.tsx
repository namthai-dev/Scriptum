'use client';

import ConfirmModal from '@/components/modals/confirm-modal';
import { Button } from '@/components/ui/button';
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import { useMutation } from 'convex/react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

interface BannerProps {
  documentId: Id<'documents'>;
}

export default function Banner({ documentId }: BannerProps) {
  const router = useRouter();

  const remove = useMutation(api.documents.remove);
  const restore = useMutation(api.documents.restore);

  const handleRemove = () => {
    const promise = remove({ id: documentId });
    toast.promise(promise, {
      loading: 'Removing the note...',
      success: 'Note removed!',
      error: 'Failed to remove note.',
    });

    router.push('/documents');
  };

  const handleRestore = () => {
    const promise = restore({ id: documentId });
    toast.promise(promise, {
      loading: 'Restoring the note...',
      success: 'Note restored!',
      error: 'Failed to restore note.',
    });
  };

  return (
    <div className="flex w-full items-center justify-center gap-2 bg-rose-500 p-2 text-center text-sm text-white">
      <p>This page is in the trash</p>
      <Button
        variant="outline"
        size="sm"
        onClick={handleRestore}
        className="h-auto border-white bg-transparent p-1 px-2 font-normal text-white hover:bg-primary/5"
      >
        Restore
      </Button>
      <ConfirmModal onConfirm={() => handleRemove()}>
        <Button
          variant="outline"
          size="sm"
          className="h-auto border-white bg-transparent p-1 px-2 font-normal text-white hover:bg-primary/5"
        >
          Remove
        </Button>
      </ConfirmModal>
    </div>
  );
}
