import Link from 'next/link';
import { Button } from '../ui/button';

export function Footer() {
  return (
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
  );
}
