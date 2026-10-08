import { cn } from '@/lib/cn';

const fills = {
  surface: 'fill-surface',
  'surface-alt': 'fill-surface-alt',
  inverse: 'fill-inverse',
} as const;

/**
 * The soft arc at the bottom of a section, in the colour of the section
 * below it. Its parent must be `relative`.
 */
export function Curve({ into }: { into: keyof typeof fills }) {
  return (
    <svg
      aria-hidden='true'
      focusable='false'
      preserveAspectRatio='none'
      viewBox='0 0 1440 100'
      className='pointer-events-none absolute inset-x-0 bottom-0 z-10 -mb-px h-10 w-full sm:h-14 md:h-16'
    >
      <path d='M0 100C480 0 960 0 1440 100Z' className={cn(fills[into])} />
    </svg>
  );
}
