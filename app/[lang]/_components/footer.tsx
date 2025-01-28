import React from 'react';

import { Button } from '@/components/ui/button';

export default function Footer() {
  return (
    <footer className="flex items-center justify-between p-6">
      <p className="font-bold">SCRIPTUM</p>
      <div className="flex items-center gap-2 text-muted-foreground">
        <Button variant="ghost" size="sm">
          Privacy Policy
        </Button>
        <Button variant="ghost" size="sm">
          Terms & Conditions
        </Button>
      </div>
    </footer>
  );
}
