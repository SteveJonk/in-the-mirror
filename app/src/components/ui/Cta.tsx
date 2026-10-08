import type { ReactNode } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/cn';

const variants = {
  solid:
    'bg-brand px-10 py-4 text-[1.08rem] font-medium text-brand-fg hover:bg-brand-hover',
  outline: 'border border-fg px-8 py-3.5 text-[1.05rem] hover:border-brand hover:bg-brand',
} as const;

type Variant = keyof typeof variants;

/** Class string for anything that should look like a pill button (e.g. a submit `<button>`). */
export function ctaClass(variant: Variant = 'solid', className?: string) {
  return cn(
    'inline-flex items-center rounded-full transition duration-200 active:scale-[0.98]',
    variants[variant],
    className,
  );
}

type CtaProps = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
};

/** The pill-shaped call to action: lilac `solid`, or an ink `outline`. */
export function Cta({ href, children, variant = 'solid', className }: CtaProps) {
  return (
    <Link href={href} className={ctaClass(variant, className)}>
      {children}
    </Link>
  );
}
