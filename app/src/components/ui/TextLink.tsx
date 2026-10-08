import type { ReactNode } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/cn';

export const textLinkClass =
  'inline-block underline decoration-1 underline-offset-[7px] hover:decoration-2';

/** An underlined text link that thickens on hover. */
export function TextLink({
  href,
  children,
  className,
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link href={href} className={cn(textLinkClass, className)}>
      {children}
    </Link>
  );
}
