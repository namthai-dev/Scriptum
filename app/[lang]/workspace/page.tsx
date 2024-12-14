import React from 'react';

import Editor from '@/components/editor';

export default async function Page() {
  return (
    <div className="h-screen p-4 dark:bg-[#1f1f1f]">
      <p className="text-3xl">Document</p>
      <Editor />
    </div>
  );
}
