'use client';
import React from 'react';
import { Authenticated, Unauthenticated } from 'convex/react';
import { SignInButton, UserButton } from '@clerk/nextjs';

import ThemeSwitcher from '@/components/theme-switcher';

export default function Heading() {
  return (
    <header className="flex items-center justify-between px-8 py-4">
      <p className="font-bold">SCRIPTUM</p>
      <div className="flex items-center gap-4">
        <Authenticated>
          <UserButton />
        </Authenticated>
        <Unauthenticated>
          <SignInButton mode="modal" />
        </Unauthenticated>
        <ThemeSwitcher />
      </div>
    </header>
  );
}
