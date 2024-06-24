import * as React from 'react';

import { cn } from '@/lib/utils';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
}

const InputWithIcon = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, startIcon, endIcon, ...props }, ref) => {
    return (
      <div
        className={cn(
          'relative flex h-10 w-full items-center gap-2 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 *:file:bg-transparent *:file:text-sm *:file:font-medium *:placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 has-[:focus]:outline-none has-[:focus]:ring-2 has-[:focus]:ring-ring has-[:focus]:ring-offset-2',
          className,
        )}>
        {startIcon}
        <input
          type={type}
          className="h-full grow bg-transparent outline-none"
          ref={ref}
          {...props}
        />
        {endIcon}
      </div>
    );
  },
);
InputWithIcon.displayName = 'Input';

export { InputWithIcon };
