'use client';

import ConfirmModal from '@/components/modals/confirm-modal';
import Spinner from '@/components/spinner';
import { Input } from '@/components/ui/input';
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import { useMutation, useQuery } from 'convex/react';
import { Search, Trash, Undo } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

export default function TrashBox() {
  const router = useRouter();
  const params = useParams();

  const documents = useQuery(api.documents.getTrash);
  const restore = useMutation(api.documents.restore);
  const remove = useMutation(api.documents.remove);

  const [search, setSearch] = useState('');

  const filteredDocuments = documents?.filter(document => {
    return document.title.toLowerCase().includes(search.toLowerCase());
  });

  const handleClick = (documentId: string) => {
    router.push(`/workspace/${params.workspaceId}/documents/${documentId}`);
  };

  const handleRestore = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    documentId: Id<'documents'>,
  ) => {
    e.stopPropagation();
    const promise = restore({ id: documentId });

    toast.promise(promise, {
      loading: 'Restoring note...',
      success: 'Note restored!',
      error: ' Failed to restore note.',
    });
  };

  const handleRemove = (documentId: Id<'documents'>) => {
    const promise = remove({ id: documentId });

    toast.promise(promise, {
      loading: 'Deleting note...',
      success: 'Note deleted!',
      error: ' Failed to delete note.',
    });

    if (params.documentId === documentId) router.push('/workspace');
  };

  if (documents === undefined) {
    return (
      <div className="flex h-full items-center justify-center p-4">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="text-sm">
      <div className="flex items-center gap-1 p-2">
        <Search className="h-4 w-4" />
        <Input
          className="h-7 bg-secondary px-2 focus-visible:ring-transparent"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>
      <div className="mt-2 px-1 pb-1">
        <p className="hidden pb-2 text-center text-xs text-muted-foreground last:block">
          No documents found.
        </p>
        {filteredDocuments?.map(document => (
          <div
            key={document._id}
            role="button"
            onClick={() => handleClick(document._id)}
            className="flex w-full items-center justify-between rounded-sm text-sm text-primary hover:bg-primary/5"
          >
            <span className="truncate pl-2">{document.title}</span>
            <div className="flex items-center">
              <div
                onClick={e => handleRestore(e, document._id)}
                role="button"
                className="rounded-sm p-2 hover:bg-neutral-200 dark:hover:bg-neutral-600"
              >
                <Undo className="h-4 w-4 text-muted-foreground" />
              </div>
              <ConfirmModal onConfirm={() => handleRemove(document._id)}>
                <div
                  role="button"
                  className="rounded-sm p-2 hover:bg-neutral-200 dark:hover:bg-neutral-600"
                >
                  <Trash className="h-4 w-4 text-muted-foreground" />
                </div>
              </ConfirmModal>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
