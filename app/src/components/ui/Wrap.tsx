import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

/** Content width and side gutters, for a <RevealGroup> or anything else that needs them. */
export const wrapClass = 'mx-auto max-w-site px-6 md:px-12 lg:px-20';

type WrapProps = {
  children: ReactNode;
  className?: string;
};

/** Site content width shell. */
export function Wrap({ children, className }: WrapProps) {
  return <div className={cn(wrapClass, className)}>{children}</div>;
}
