import React from 'react';
import { UserButton } from '@stackframe/stack';
import ThemeSwitcher from '@/components/theme-switcher';

export default function Heading() {
  return (
    <div className="flex items-center justify-between px-8 py-4">
      <p className="font-bold">SCRIPTUM</p>
      <div className="flex gap-2">
        <ThemeSwitcher />
        <UserButton />
      </div>
    </div>
  );
}
