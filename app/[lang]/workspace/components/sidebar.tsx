'use client';

import React from 'react';
import { UserButton } from '@clerk/nextjs';

import OrganizationSwitcher from '@/components/organization-switcher';
import ThemeSwitcher from '@/components/theme-switcher';

export default function Sidebar() {
  return (
    <aside className="flex w-60 flex-col justify-between bg-secondary px-2 py-4">
      <OrganizationSwitcher />
      <div className="flex-1">Other tools</div>
      <div className="flex items-center justify-between">
        <UserButton showName />
        <ThemeSwitcher />
      </div>
    </aside>
  );
}
