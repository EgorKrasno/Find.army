'use client';

import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';

type KbdProps = {
  children: React.ReactNode;
  modifier?: boolean;
} & React.HTMLAttributes<HTMLSpanElement>;

export function Kbd({ children, modifier, className, ...props }: KbdProps) {
  const [platform, setPlatform] = useState<'Windows' | 'Mac'>('Windows');

  useEffect(() => {
    setPlatform(navigator.userAgent.indexOf('Mac') !== -1 ? 'Mac' : 'Windows');
  }, []);

  const meta = platform === 'Mac' ? '⌘' : 'Ctrl';

  return (
    <span
      {...props}
      className={cn(
        'rounded-sm border bg-secondary px-2 py-1.5 text-xs font-semibold text-muted-foreground',
        className,
      )}>
      {modifier && <span className="mr-1">{meta} +</span>}
      {children}
    </span>
  );
}
