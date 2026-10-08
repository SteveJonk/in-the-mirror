import { Cta } from '@/components/ui/Cta';
import { Wrap } from '@/components/ui/Wrap';

export default function NotFound() {
  return (
    <main id='inhoud' className='flex min-h-[70vh] items-center pt-32 pb-24 md:pt-48 md:pb-36'>
      <Wrap>
        <h1 className='font-display text-h1 text-balance'>Deze pagina bestaat niet</h1>
        <p className='mt-9 max-w-[34rem] text-intro md:text-intro-lg'>
          De link is verlopen, verplaatst of heeft nooit bestaan. Ga terug naar de homepage, of neem
          contact op als je iets specifieks zocht.
        </p>
        <div className='mt-10'>
          <Cta href='/'>Terug naar de homepage</Cta>
        </div>
      </Wrap>
    </main>
  );
}
