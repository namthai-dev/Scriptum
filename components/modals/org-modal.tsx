'use client';

import { Dialog, DialogContent } from '@/components/ui/dialog';
import { DialogTitle } from '@radix-ui/react-dialog';
import { useOrg } from '@/hooks/use-org';
import CreateOrganization from '@/components/create-organization';

export const OrgModal = () => {
  const org = useOrg();

  const handleSubmit = () => {
    org.onClose();
    window.location.reload();
  };

  return (
    <Dialog open={org.isOpen} onOpenChange={org.onClose}>
      <DialogContent>
        <DialogTitle>Create a new organization</DialogTitle>
        <CreateOrganization onSubmit={handleSubmit} />
      </DialogContent>
    </Dialog>
  );
};
