import { PortableText, type PortableTextComponents } from 'next-sanity';
import type { RichText as RichTextValue } from '@/sanity/sanity.types';
import { Reveal } from '@/components/ui/Reveal';
import { cn } from '@/lib/cn';

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => <Reveal as='p'>{children}</Reveal>,
    intro: ({ children }) => (
      <Reveal as='p' className='text-intro md:text-intro-lg'>
        {children}
      </Reveal>
    ),
    signature: ({ children }) => (
      <Reveal as='p' data-style='signature' className='font-display text-[1.5rem]'>
        {children}
      </Reveal>
    ),
    h3: ({ children }) => (
      <Reveal as='h3' data-style='h3' className='font-display text-h3 text-balance'>
        {children}
      </Reveal>
    ),
    h4: ({ children }) => (
      <Reveal as='h3' data-style='h4' className='text-[1.2rem] font-medium'>
        {children}
      </Reveal>
    ),
  },
  list: {
    bullet: ({ children }) => <ul className='space-y-5'>{children}</ul>,
  },
  listItem: {
    bullet: ({ children }) => (
      <Reveal as='li' className='flex gap-4'>
        <span className='mt-[0.7rem] size-2 shrink-0 rounded-full bg-current' aria-hidden='true' />
        <span>{children}</span>
      </Reveal>
    ),
  },
  marks: {
    strong: ({ children }) => <strong className='font-medium'>{children}</strong>,
  },
};

/** The rhythm between paragraphs, headings and lists. */
const flow = cn(
  '[&>*+*]:mt-6',
  '[&>[data-style=h3]:not(:first-child)]:mt-10 [&>[data-style=h3]+*]:mt-7',
  '[&>[data-style=h4]:not(:first-child)]:mt-7 [&>[data-style=h4]+*]:mt-1',
  '[&>[data-style=signature]]:mt-7',
);

/** Body text from a `richText` field; every paragraph reveals on scroll. */
export function RichText({ value, className }: { value: RichTextValue | null | undefined; className?: string }) {
  if (!value?.length) return null;
  return (
    <div className={cn(flow, className)}>
      <PortableText value={value} components={components} />
    </div>
  );
}
