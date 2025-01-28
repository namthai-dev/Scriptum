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
import { useEdgeStore } from '@/lib/edgestore';

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

interface EditorProps {
  onChange: (value: string) => void;
  initialContent?: string;
  editable?: boolean;
}
export default function Editor({
  onChange,
  editable,
  initialContent,
}: EditorProps) {
  const { theme } = useTheme();
  const { edgestore } = useEdgeStore();

  const handleUpload = async (file: File) => {
    const res = await edgestore.publicFiles.upload({ file });
    return res.url;
  };

  const editor = useCreateBlockNote({
    initialContent: initialContent ? JSON.parse(initialContent) : undefined,
    uploadFile: handleUpload,
  });

  return (
    <BlockNoteView
      editor={editor}
      theme={theme === 'light' ? customTheme.light : customTheme.dark}
      editable={editable}
      onChange={() => {
        onChange(JSON.stringify(editor.document, null, 2));
      }}
    />
  );
}
