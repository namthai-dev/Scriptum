'use client';
import { useEffect } from 'react';
import { redirect } from 'next/navigation';

import { useConvexAuth } from 'convex/react';
import { useOrganizationList } from '@clerk/nextjs';
import Spinner from '@/components/spinner';

export default function Page() {
  const { isAuthenticated, isLoading } = useConvexAuth();

  if (!isAuthenticated && !isLoading) {
    redirect('/');
  }

  const { isLoaded, setActive, userMemberships } = useOrganizationList({
    userMemberships: {
      infinite: true,
    },
  });

  useEffect(() => {
    if (isLoaded && isAuthenticated) {
      const mem = userMemberships.data[0];
      setActive({ organization: mem.id }).then(() => {
        redirect(`/workspace/${mem.id}`);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoaded, isAuthenticated]);

  if (isLoading || !isLoaded) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  return null;
}
