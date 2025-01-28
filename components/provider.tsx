import { ThemeProvider } from 'next-themes';
import { ConvexClientProvider } from '@/components/convex-provider';
import { EdgeStoreProvider } from '@/lib/edgestore';

export function Provider({
  children,
}: React.ComponentProps<typeof ConvexClientProvider>) {
  return (
    <ConvexClientProvider>
      <EdgeStoreProvider>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </EdgeStoreProvider>
    </ConvexClientProvider>
  );
}
