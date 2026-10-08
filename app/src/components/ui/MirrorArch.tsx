import Image from '@/components/ui/Image';

/**
 * The mirror: an arch that holds a night sky, with an offset outline behind
 * it. The drawn crescent shows while the photo loads, or if it never does.
 */
export function MirrorArch({ priority = false }: { priority?: boolean }) {
  return (
    <div className='relative mx-auto w-full max-w-[25rem]'>
      <div
        className='absolute inset-0 translate-x-4 translate-y-4 rounded-t-full border border-fg'
        aria-hidden='true'
      />
      <div
        className='relative aspect-[3/4.3] overflow-hidden rounded-t-full bg-inverse'
        role='img'
        aria-label='Een smalle maansikkel in een nachtelijke hemel boven donkere boomtoppen'
      >
        <svg
          viewBox='0 0 400 560'
          preserveAspectRatio='xMidYMid slice'
          className='absolute inset-0 size-full fill-inverse-fg'
          aria-hidden='true'
        >
          <defs>
            <mask id='crescent'>
              <rect width='400' height='560' fill='#fff' />
              <circle cx='234' cy='222' r='70' fill='#000' />
            </mask>
          </defs>
          <circle cx='200' cy='240' r='78' mask='url(#crescent)' />
          <circle cx='92' cy='150' r='1.8' />
          <circle cx='318' cy='118' r='2.2' />
          <circle cx='140' cy='380' r='1.6' />
          <circle cx='300' cy='360' r='1.8' />
          <circle cx='238' cy='450' r='1.4' />
          <circle cx='76' cy='300' r='1.4' />
          <circle cx='330' cy='250' r='1.4' />
          <circle cx='180' cy='96' r='1.6' />
        </svg>
        <Image
          src='https://images.unsplash.com/photo-1634286415662-cdba58523598?auto=format&fit=crop&q=75&w=1200'
          fill
          sizes='(min-width: 768px) 400px, 90vw'
          alt=''
          priority={priority}
          className='object-cover'
        />
      </div>
    </div>
  );
}
