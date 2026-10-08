import { FormRenderer } from '@/components/form/FormRenderer';
import { Reveal, RevealGroup } from '@/components/ui/Reveal';
import { SanityImage } from '@/components/ui/SanityImage';
import { OPENER, Section } from '@/components/ui/Section';
import { TextLink } from '@/components/ui/TextLink';
import { wrapClass } from '@/components/ui/Wrap';
import { cn } from '@/lib/cn';
import { toFormDefinition } from '@/lib/form-fields';
import { toLabeledHref } from '@/lib/links';
import type { BlockProps } from './types';

/**
 * A form with its introduction beside it. As the first block on a page it is
 * the page's opener: an h1, a larger intro and the entrance animation instead
 * of the scroll reveal.
 */
export function ContactForm({ block, section, path }: BlockProps<'contactForm'> & { path?: string }) {
  const form = toFormDefinition(block.form);
  const { first } = section;
  const wide = Boolean(block.wideForm);
  const links = (block.links ?? []).map(toLabeledHref).filter((link) => link !== undefined);
  const recaptcha =
    block.recaptcha?.recaptchaEnabled && block.recaptcha.recaptchaSiteKey
      ? { enabled: true, siteKey: block.recaptcha.recaptchaSiteKey }
      : undefined;

  return (
    <Section section={section} padding={first ? 'pt-32 pb-28 md:pt-48 md:pb-44' : undefined}>
      <RevealGroup className={cn(wrapClass, 'grid md:grid-cols-12 md:gap-x-10', wide ? 'gap-14' : 'gap-16')}>
        <div className={cn(wide ? 'md:col-span-4' : 'md:col-span-5', first && OPENER)}>
          {block.illustration?.src && (
            // Flush left, on the line the title and lead start from.
            <div className={first ? 'mb-12' : 'mb-10'}>
              <SanityImage
                image={block.illustration}
                className={cn('h-auto w-full', first ? 'max-w-[18rem]' : 'max-w-[12rem] md:max-w-[14rem]')}
              />
            </div>
          )}
          {first ? (
            <h1 className='font-display text-h1 text-balance'>{block.title}</h1>
          ) : (
            <Reveal as='h2' className='font-display text-h2 text-balance'>
              {block.title}
            </Reveal>
          )}
          {block.lead &&
            (first ? (
              <p className='mt-9 max-w-[30rem] text-intro md:text-intro-lg'>{block.lead}</p>
            ) : (
              <Reveal as='p' className={cn('mt-9', wide ? 'max-w-[24rem]' : 'max-w-[30rem]')}>
                {block.lead}
              </Reveal>
            ))}
          {block.note && (
            <Reveal as='p' className='mt-4 max-w-[24rem] text-[0.98rem] text-muted'>
              {block.note}
            </Reveal>
          )}
          {links.length > 0 && (
            <ul className='mt-12 max-w-[30rem] space-y-1'>
              {links.map((link) => (
                <li key={link.href}>
                  <TextLink href={link.href} className='py-2'>
                    {link.label}
                  </TextLink>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div
          className={cn(
            wide ? 'md:col-span-7 md:col-start-6' : 'md:col-span-6 md:col-start-7',
            first && `${OPENER} [animation-delay:.75s] md:pt-6`,
          )}
        >
          {form && (
            <FormRenderer
              form={form}
              recaptcha={recaptcha}
              // What a hidden `{{path}}` field is filled with, so the mail says
              // which page the form was sent from.
              context={path ? { path } : undefined}
              showRequiredMarks={block.showRequiredMarks ?? true}
              reveal={!first}
            />
          )}
        </div>
      </RevealGroup>
    </Section>
  );
}
