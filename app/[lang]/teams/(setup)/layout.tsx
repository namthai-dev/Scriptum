import { redirect } from 'next/navigation';
import { stackServerApp } from '@/stack';

import React from 'react';

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await stackServerApp.getUser({ or: 'redirect' });
  const userStores = await stackServerApp.listTeams();

  if (userStores.length > 0) {
    redirect(`/teams/${userStores[0].id}`);
  }
  return <div>{children}</div>;
}
