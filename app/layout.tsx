import { CardsContextProvider } from '@/components/hooks/use-blocks';
import { Nav } from '@/components/nav/nav';
import { ThemeProvider } from '@/components/theme-provider';
import { Button } from '@/components/ui/button';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Metadata } from 'next';
import Link from 'next/link';
import './globals.css';

export const metadata: Metadata = {
  title: 'Find.Army - The Better AKO',
  description:
    'The Army Knowledge Online (AKO) alternative. Easily find DA-Forms and links to all the Army sites you need.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="h-screen w-screen overflow-y-auto overflow-x-hidden">
        <ThemeProvider attribute="class" defaultTheme="system">
          <TooltipProvider delayDuration={150}>
            <CardsContextProvider>
              <Nav />
              <div
                className="mx-auto flex max-w-screen-lg px-6 py-10 lg:px-0"
                vaul-drawer-wrapper="">
                {children}
              </div>

              <footer className="mt-4 rounded-t border-t bg-card">
                <div className="mx-auto w-full max-w-screen-lg px-4 py-4 sm:py-6 md:flex md:items-center md:justify-between">
                  <span className="text-sm text-muted-foreground sm:text-center">
                    © {new Date().getFullYear()}
                    <Button
                      variant="link"
                      size="sm"
                      className="px-1 py-0 font-mono text-muted-foreground"
                      asChild>
                      <Link href="/">Find.Army</Link>
                    </Button>
                  </span>
                  {/* <ul className="mt-3 flex flex-wrap items-center text-sm font-medium text-muted-foreground sm:mt-0"></ul> */}
                </div>
              </footer>
            </CardsContextProvider>
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
