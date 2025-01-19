import React from 'react';

import ThemeSwitcher from '@/components/theme-switcher';

export default function Heading() {
  return (
    <header className="flex items-center justify-between px-8 py-4">
      <p className="font-bold">SCRIPTUM</p>
      <div className="flex gap-4">
        <ThemeSwitcher />
      </div>
    </header>
  );
}
