import React from 'react';
import { stackServerApp } from '@/stack';

import Sidebar from './components/sidebar';

export default async function WorkspaceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await stackServerApp.getUser({ or: 'redirect' });

  if (!user.selectedTeam) {
    const teams = await stackServerApp.listTeams();
    if (teams.length > 0) {
      user.setSelectedTeam(teams[0]);
    }
  }

  return (
    <div className="container m-auto flex h-screen">
      <Sidebar />
      <main className="flex-1">{children}</main>
    </div>
  );
}
