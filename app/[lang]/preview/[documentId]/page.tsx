'use client';

import { useMutation, useQuery } from 'convex/react';
import dynamic from 'next/dynamic';
import { useMemo } from 'react';

import { api } from '@/convex/_generated/api';
import ToolBar from '@/components/tool-bar';
import CoverImage from '@/components/cover-image';
import { Skeleton } from '@/components/ui/skeleton';
import { useParams } from 'next/navigation';
import { Id } from '@/convex/_generated/dataModel';

export default function DocumentIdPage() {
  const { documentId } = useParams();
  const Editor = useMemo(
    () => dynamic(() => import('@/components/editor'), { ssr: false }),
    [],
  );

  const document = useQuery(api.documents.getById, {
    documentId: documentId as Id<'documents'>,
  });
  const update = useMutation(api.documents.update);

  const onChange = (content: string) => {
    update({ id: documentId as Id<'documents'>, content });
  };

  if (document === undefined) {
    return (
      <div>
        <CoverImage.Skeleton />
        <div className="mx-auto mt-10 md:max-w-3xl lg:max-w-4xl">
          <div className="space-y-4 pl-8 pt-4">
            <Skeleton className="h-14 w-[50%]" />
            <Skeleton className="h-4 w-[80%]" />
            <Skeleton className="h-4 w-[40%]" />
            <Skeleton className="h-4 w-[60%]" />
          </div>
        </div>
      </div>
    );
  }

  if (document === null) return <div>Not found</div>;

  return (
    <div className="pb-40">
      <CoverImage preview url={document.coverImage} />
      <div className="mx-auto md:max-w-3xl lg:max-w-4xl">
        <ToolBar preview initialData={document} />
        <Editor
          editable={false}
          onChange={onChange}
          initialContent={document.content}
        />
      </div>
    </div>
  );
}
