'use client';

import { useSettings } from '@/hooks/use-settings';
import { Dialog, DialogContent, DialogHeader } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import ThemeSwitcher from '../theme-switcher';
import { DialogTitle } from '@radix-ui/react-dialog';

export const SettingsModal = () => {
  const settings = useSettings();

  return (
    <Dialog open={settings.isOpen} onOpenChange={settings.onClose}>
      <DialogContent>
        <DialogTitle></DialogTitle>
        <DialogHeader className="border-b pb-3">
          <h2 className="text-lg font-medium">My settings</h2>
        </DialogHeader>
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-y-1">
            <Label>Appearance</Label>
            <span className="text-[0.8rem] text-muted-foreground">
              Customize how Scriptum looks on your device
            </span>
          </div>
          <ThemeSwitcher />
        </div>
      </DialogContent>
    </Dialog>
  );
};
