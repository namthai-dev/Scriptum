'use client';

import { useOrganizationList } from '@clerk/nextjs';
import { FormEventHandler, useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';

interface CreateOrganizationProps {
  onSubmit?: () => void;
}

export default function CreateOrganization({
  onSubmit,
}: CreateOrganizationProps) {
  const { createOrganization } = useOrganizationList();
  const [organizationName, setOrganizationName] = useState('');

  const handleSubmit: FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault();
    setOrganizationName('');
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    createOrganization && createOrganization({ name: organizationName });
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    onSubmit && onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <Input
        type="text"
        name="organizationName"
        value={organizationName}
        onChange={e => setOrganizationName(e.currentTarget.value)}
      />
      <Button
        type="submit"
        variant="secondary"
        className="hover:bg-muted-foreground"
      >
        Create
      </Button>
    </form>
  );
}
