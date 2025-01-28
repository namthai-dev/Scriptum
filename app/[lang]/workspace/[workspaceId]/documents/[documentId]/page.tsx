'use client';
import React from 'react';
// import dynamic from 'next/dynamic';
import { useParams } from 'next/navigation';
import { Id } from '@/convex/_generated/dataModel';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';

import ToolBar from '@/components/tool-bar';
import CoverImage from './components/cover-image';
// const Editor = dynamic(() => import('./components/editor'), { ssr: false });

export default function Page() {
  const params = useParams();
  const document = useQuery(api.documents.getById, {
    documentId: params.documentId as Id<'documents'>,
  });

  if (document === undefined) {
    return <div>Loading...</div>;
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
      {/* <Editor /> */}
    </div>
  );
}
