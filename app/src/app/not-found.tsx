import { Cta } from '@/components/ui/Cta';
import { Wrap } from '@/components/ui/Wrap';
import { getSiteInformation } from '@/sanity/site-information';

export default async function NotFound() {
  const { interfaceTexts: ui } = await getSiteInformation();
  return (
    <main id='inhoud' className='flex min-h-[70vh] items-center pt-32 pb-24 md:pt-48 md:pb-36'>
      <Wrap>
        <h1 className='font-display text-h1 text-balance'>{ui.notFoundTitle}</h1>
        {ui.notFoundText && (
          <p className='mt-9 max-w-[34rem] text-intro md:text-intro-lg'>{ui.notFoundText}</p>
        )}
        {ui.notFoundButton && (
          <div className='mt-10'>
            <Cta href='/'>{ui.notFoundButton}</Cta>
          </div>
        )}
      </Wrap>
    </main>
  );
}
