'use client';
import React, { useEffect } from 'react';

import Sidebar from './_components/sidebar';
import { SearchCommand } from '@/components/search-command';
import { useConvexAuth } from 'convex/react';
import { redirect } from 'next/navigation';
import Spinner from '@/components/spinner';
import { useOrganization, useOrganizationList } from '@clerk/nextjs';
import { useOrg } from '@/hooks/use-org';

export default function WorkspaceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, isLoading } = useConvexAuth();
  const { organization } = useOrganization();
  const { userMemberships, setActive } = useOrganizationList({
    userMemberships: true,
  });
  const org = useOrg();

  if (!isAuthenticated && !isLoading) {
    redirect('/');
  }

  useEffect(() => {
    if (organization === null && userMemberships.count === 0) {
      org.toggle();
    } else if (organization === null && userMemberships.count !== 0) {
      const mem = userMemberships.data?.[0];
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      mem && setActive && setActive({ organization: mem.organization.id });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="flex h-screen">
      <SearchCommand />
      <Sidebar />
      <main className="flex-1">{children}</main>
    </div>
  );
}
