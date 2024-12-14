import React from 'react';

import Editor from '@/components/editor';

export default async function Page() {
  return (
    <div className="h-full dark:bg-[#1f1f1f]">
      <p className="ml-12 text-3xl">Document</p>
      <Editor />
    </div>
  );
}
