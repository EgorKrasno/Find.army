import { Announcement } from '@/components/announcement/announcement';
import { Footer } from '@/components/footer/footer';
import { CardsContextProvider } from '@/components/hooks/use-blocks';
import { Nav } from '@/components/nav/nav';
import { ThemeProvider } from '@/components/theme-provider';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Metadata } from 'next';
import { Analytics } from "@vercel/analytics/react"
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
      <Analytics />
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
              <Footer />
            </CardsContextProvider>
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
