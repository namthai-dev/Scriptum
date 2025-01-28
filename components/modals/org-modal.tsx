'use client';

import { Dialog, DialogContent } from '@/components/ui/dialog';
import { DialogTitle } from '@radix-ui/react-dialog';
import { useOrg } from '@/hooks/use-org';
import { CreateOrganization } from '@clerk/nextjs';

export const OrgModal = () => {
  const org = useOrg();

  return (
    <Dialog open={org.isOpen} onOpenChange={org.onClose}>
      <DialogContent>
        <DialogTitle></DialogTitle>
        <CreateOrganization hideSlug afterCreateOrganizationUrl="/documents" />
      </DialogContent>
    </Dialog>
  );
};
