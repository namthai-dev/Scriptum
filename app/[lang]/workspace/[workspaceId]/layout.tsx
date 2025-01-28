'use client';
import React from 'react';

import Sidebar from './components/sidebar';
import { SearchCommand } from '@/components/search-command';

export default function WorkspaceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen">
      <SearchCommand />
      <Sidebar />
      <main className="flex-1">{children}</main>
    </div>
  );
}
