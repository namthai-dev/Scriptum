'use client';

import { useTheme } from 'next-themes';
import EmojiPicker, { Theme } from 'emoji-picker-react';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';

interface IconPickerProps {
  children: React.ReactNode;
  asChild?: boolean;
  onChange: (icon: string) => void;
}

export default function IconPicker({
  children,
  onChange,
  asChild,
}: IconPickerProps) {
  const { systemTheme } = useTheme();
  const currentTheme = (systemTheme || 'light') as keyof typeof themeMap;

  const themeMap = {
    dark: Theme.DARK,
    light: Theme.LIGHT,
  };

  const theme = themeMap[currentTheme];

  return (
    <Popover>
      <PopoverTrigger asChild={asChild}>{children}</PopoverTrigger>
      <PopoverContent className="border-one w-full p-0 shadow-none">
        <EmojiPicker
          height={350}
          theme={theme}
          onEmojiClick={data => onChange(data.emoji)}
        />
      </PopoverContent>
    </Popover>
  );
}
