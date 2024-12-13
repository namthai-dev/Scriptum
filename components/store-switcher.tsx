'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { SelectedTeamSwitcher, useUser } from '@stackframe/stack';

export default function StoreSwitcher() {
  const user = useUser({ or: 'redirect' });
  const userTeams = user.useTeams();
  const [currentStore, setCurrentStore] = useState(
    user.selectedTeam ?? userTeams[0],
  );
  const router = useRouter();

  useEffect(() => {
    if (user.selectedTeam && user.selectedTeam?.id !== currentStore?.id) {
      setCurrentStore(user.selectedTeam);
      router.push('/');
      router.refresh();
    }
  }, [currentStore?.id, router, user.selectedTeam]);

  return <SelectedTeamSwitcher selectedTeam={currentStore} />;
}
