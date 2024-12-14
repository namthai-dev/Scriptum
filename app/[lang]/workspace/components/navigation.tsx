'use client';

import React from 'react';
import { useTheme } from 'next-themes';

import TeamSwitcher from '@/components/team-switcher';
import { UserButton } from '@stackframe/stack';

export default function Navigation() {
  const { setTheme } = useTheme();

  return (
    <aside className="z-50 flex h-full w-60 flex-col justify-between bg-secondary px-2 py-4">
      <TeamSwitcher />
      <UserButton
        showUserInfo={true}
        colorModeToggle={() => {
          setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
        }}
      />
    </aside>
  );
}
