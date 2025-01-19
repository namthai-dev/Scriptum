import { ThemeProvider } from 'next-themes';
import { ConvexClientProvider } from '@/components/convex-provider';

export function Provider({
  children,
}: React.ComponentProps<typeof ConvexClientProvider>) {
  return (
    <ConvexClientProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        {children}
      </ThemeProvider>
    </ConvexClientProvider>
  );
}
