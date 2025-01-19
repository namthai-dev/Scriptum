import React from 'react';

import Sidebar from './components/sidebar';

export default async function WorkspaceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container m-auto flex h-screen">
      <Sidebar />
      <main className="flex-1">{children}</main>
    </div>
  );
}
