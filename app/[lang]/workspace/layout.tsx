'use client';
import React from 'react';
import { useConvexAuth } from 'convex/react';
import { redirect } from 'next/navigation';

import Sidebar from './components/sidebar';
import Spinner from '@/components/spinner';

export default function WorkspaceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, isLoading } = useConvexAuth();

  if (!isAuthenticated && !isLoading) {
    redirect('/');
  }

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="container m-auto flex h-screen">
      <Sidebar />
      <main className="flex-1">{children}</main>
    </div>
  );
}
