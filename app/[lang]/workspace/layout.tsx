import React from 'react';
import { stackServerApp } from '@/stack';

import Navigation from './components/navigation';

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
    <div className="flex h-screen">
      <Navigation />
      <main className="h-full flex-1 overflow-y-auto">{children}</main>
    </div>
  );
}
