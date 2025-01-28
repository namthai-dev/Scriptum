'use client';
import React from 'react';

import { OrganizationSwitcher as OriginOrganizationSwitcher } from '@clerk/nextjs';

export default function OrganizationSwitcher() {
  return (
    <OriginOrganizationSwitcher
      afterSelectOrganizationUrl="/documents"
      afterSelectPersonalUrl="/documents"
      afterCreateOrganizationUrl="/documents"
      afterLeaveOrganizationUrl="/documents"
      hidePersonal
      hideSlug
    />
  );
}
