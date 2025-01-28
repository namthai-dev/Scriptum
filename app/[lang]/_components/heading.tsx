'use client';
import React from 'react';
import { Authenticated, Unauthenticated, AuthLoading } from 'convex/react';
import { SignInButton, UserButton } from '@clerk/nextjs';

import ThemeSwitcher from '@/components/theme-switcher';
import { Button } from '@/components/ui/button';
import Spinner from '@/components/spinner';

import { ArrowRight } from 'lucide-react';

export default function Heading() {
  return (
    <header className="flex items-center justify-between px-8 py-4">
      <p className="font-bold">SCRIPTUM</p>
      <div className="flex items-center gap-4">
        <AuthLoading>
          <Spinner size="default" />
        </AuthLoading>
        <Authenticated>
          <UserButton />
        </Authenticated>
        <Unauthenticated>
          <SignInButton mode="modal">
            <Button>
              Get Scriptum Free
              <ArrowRight className="h-4 w-4" />
            </Button>
          </SignInButton>
        </Unauthenticated>
        <ThemeSwitcher />
      </div>
    </header>
  );
}
