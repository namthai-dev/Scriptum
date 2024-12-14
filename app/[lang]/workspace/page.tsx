import React from 'react';
import { stackServerApp } from '@/stack';

export default async function Page() {
  const user = await stackServerApp.getUser();

  return <div>{user?.selectedTeam?.displayName}</div>;
}
