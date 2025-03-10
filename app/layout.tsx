import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Locale } from '@/features/internationalization/i18n-config';

import { Toaster } from '@/components/ui/sonner';
import { Provider } from '@/components/provider';
import { ModalProvider } from '@/components/modal-provider';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Scriptum',
  description: 'Scriptum is the documentation and collaboration tool',
};

export default async function RootLayout(
  props: Readonly<{
    children: React.ReactNode;
    params: { lang: Locale };
  }>,
) {
  const params = await props.params;

  const { children } = props;

  return (
    <html lang={params.lang} suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Provider>
          <Toaster position="bottom-center" />
          <ModalProvider />
          {children}
        </Provider>
      </body>
    </html>
  );
}
