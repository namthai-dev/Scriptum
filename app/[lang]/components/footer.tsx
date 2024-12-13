import React from 'react';

import { Button } from '@/components/ui/button';

export default function Footer() {
  return (
    <div className="z-50 flex w-full items-center bg-background p-6">
      <p className="font-bold">SCRIPTUM</p>
      <div className="flex w-full items-center justify-end gap-x-2 text-muted-foreground">
        <Button variant="ghost" size="sm">
          Privacy Policy
        </Button>
        <Button variant="ghost" size="sm">
          Terms & Conditions
        </Button>
      </div>
    </div>
  );
}
