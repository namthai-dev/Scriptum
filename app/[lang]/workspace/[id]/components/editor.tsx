'use client';
import { useTheme } from 'next-themes';

import { useCreateBlockNote } from '@blocknote/react';
import {
  BlockNoteView,
  lightDefaultTheme,
  darkDefaultTheme,
  Theme,
} from '@blocknote/mantine';
import '@blocknote/core/fonts/inter.css';
import '@blocknote/mantine/style.css';

const lightTheme = {
  ...lightDefaultTheme,
} satisfies Theme;

const darkTheme = {
  ...darkDefaultTheme,
  colors: {
    editor: {
      background: '#020817',
    },
  },
} satisfies Theme;

const customTheme = {
  light: lightTheme,
  dark: darkTheme,
};

export default function Editor() {
  const { theme } = useTheme();
  const editor = useCreateBlockNote();

  return (
    <BlockNoteView
      editor={editor}
      theme={theme === 'light' ? customTheme.light : customTheme.dark}
    />
  );
}
