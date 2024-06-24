'use client';

import { GithubIcon, MoonIcon, SunIcon } from 'lucide-react';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { FeedbackButton } from './feedback-button';
import FindArmyLogo from './find-army-logo';

export function Nav() {
  return (
    <div className="flex w-full border-b bg-card">
      <div className="mx-auto flex w-full max-w-screen-lg items-center justify-between p-6 lg:px-0">
        <div className="flex items-center gap-4">
          <FindArmyLogo className="w-10 shrink-0 text-accent" />
          <div className="flex shrink-0 flex-col truncate overflow-ellipsis">
            <span className="hidden font-mono font-bold sm:block">
              Find.army
            </span>
            <span className="hidden font-mono text-sm text-muted-foreground sm:block">
              The better AKO
            </span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <FeedbackButton />
          <ThemeToggle />
          <Button
            variant="outline"
            size="icon"
            aria-label="View on GitHub"
            className="hidden sm:flex"
            asChild>
            <Link
              target="_blank"
              href="https://github.com/EgorKrasno/Find.army">
              <GithubIcon />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

const ThemeToggle = () => {
  const [hydrated, setHydrated] = useState(false);
  const { setTheme, resolvedTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
  };

  useEffect(() => {
    setHydrated(true);
  }, [hydrated]);

  return (
    <Button
      size="icon"
      variant="outline"
      aria-label="Toggle Theme"
      onClick={() => toggleTheme()}>
      {hydrated && resolvedTheme === 'dark' ? <SunIcon /> : <MoonIcon />}
    </Button>
  );
};
