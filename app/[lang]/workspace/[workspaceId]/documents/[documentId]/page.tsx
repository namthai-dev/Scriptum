'use client';
import React from 'react';
import dynamic from 'next/dynamic';
import { useParams } from 'next/navigation';
import { Id } from '@/convex/_generated/dataModel';
import { useMutation, useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';

import ToolBar from '@/components/tool-bar';
import CoverImage from './components/cover-image';
import { Skeleton } from '@/components/ui/skeleton';
const Editor = dynamic(() => import('./components/editor'), { ssr: false });

export default function Page() {
  const params = useParams();
  const document = useQuery(api.documents.getById, {
    documentId: params.documentId as Id<'documents'>,
  });
  const update = useMutation(api.documents.update);

  const handleChange = (content: string) => {
    update({ id: params.documentId as Id<'documents'>, content });
  };

  if (document === undefined) {
    return (
      <>
        <CoverImage.Skeleton />
        <div className="mx-auto mt-10 md:max-w-3xl lg:max-w-4xl">
          <div className="space-y-4 pl-8 pt-4">
            <Skeleton className="h-14 w-full" />
            <Skeleton className="h-14 w-[80%]" />
            <Skeleton className="h-14 w-[60%]" />
            <Skeleton className="h-14 w-[40%]" />
            <Skeleton className="h-14 w-[20%]" />
          </div>
        </div>
      </>
    );
  }

  if (document === null) {
    return <div>Not found</div>;
  }

  return (
    <div className="pb-40">
      <CoverImage url={document.coverImage} />
      <div className="mx-auto md:max-w-3xl lg:max-w-4xl">
        <ToolBar initialData={document} />
      </div>
      <Editor
        editable
        onChange={handleChange}
        initialContent={document.content}
      />
    </div>
  );
}
