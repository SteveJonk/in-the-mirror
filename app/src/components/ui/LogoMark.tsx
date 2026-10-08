import { cn } from '@/lib/cn';

/** The moon mark: an ink disc with a paper crescent. Also the favicon (app/icon.svg). */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox='2 2 60 60'
      className={cn('shrink-0', className)}
      aria-hidden='true'
      focusable='false'
    >
      <circle className='fill-fg' cx='32' cy='32' r='30' />
      <path
        className='fill-[#f7f4ef]'
        d='M31.840 19.001A15 15 0 1 0 46.798 36.452A11.5 11.5 0 1 1 31.840 19.001z'
      />
    </svg>
  );
}
