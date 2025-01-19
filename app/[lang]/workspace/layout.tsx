'use client';
import React from 'react';
import { useConvexAuth } from 'convex/react';

import Sidebar from './components/sidebar';
import { redirect } from 'next/navigation';

export default function WorkspaceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, isLoading } = useConvexAuth();
  if (!isAuthenticated && !isLoading) {
    redirect('/');
  }
  return (
    <div className="container m-auto flex h-screen">
      <Sidebar />
      <main className="flex-1">{children}</main>
    </div>
  );
}
