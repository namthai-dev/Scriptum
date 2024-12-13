import { StackProvider, StackTheme } from '@stackframe/stack';
import { ThemeProvider } from 'next-themes';
import { ConvexClientProvider } from '@/components/convex-provider';

export function Provider({
  children,
  ...props
}: React.ComponentProps<typeof StackProvider>) {
  return (
    <ConvexClientProvider>
      <StackProvider {...props}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <StackTheme>{children}</StackTheme>
        </ThemeProvider>
      </StackProvider>
    </ConvexClientProvider>
  );
}
