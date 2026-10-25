import Container from '../ui/Container.jsx';
import Button from '../ui/Button.jsx';
import { events, hostingOptions } from '../../data/events.js';
import { photos } from '../../data/media.js';
import { siteConfig } from '../../data/siteConfig.js';

/** Two cards floating over a full-bleed event photo. */
export default function EventsBand() {
  return (
    <section className='relative overflow-hidden bg-night py-16 lg:py-24'>
      <img
        src={photos.rooftopCrowd.src}
        width={photos.rooftopCrowd.width}
        height={photos.rooftopCrowd.height}
        srcSet={photos.rooftopCrowd.srcSet}
        sizes='100vw'
        alt=''
        loading='lazy'
        decoding='async'
        className='absolute inset-0 h-full w-full object-cover'
      />
      <div className='absolute inset-0 bg-night/55' aria-hidden='true' />

      <Container className='relative'>
        <div className='grid gap-6 lg:grid-cols-2 lg:gap-10'>
          <div className='flex flex-col gap-5'>
            <div className='card flex-1 p-6 sm:p-8'>
              <h2 className='font-display text-h4 text-accent sm:text-5xl'>Nights at Kettli</h2>
              <div className='mt-6 space-y-6'>
                {events.slice(0, 2).map((event) => (
                  <div key={event.id}>
                    <h3 className='font-display text-2xl'>{event.title}</h3>
                    <p className='mt-2 text-sm font-semibold text-accent'>{event.when}</p>
                    <p className='mt-1 leading-relaxed text-fg-muted'>{event.description}</p>
                  </div>
                ))}
              </div>
            </div>
            <Button href='/events' variant='primary' size='lg' className='self-center'>
              See all events
            </Button>
          </div>

          <div className='flex flex-col gap-5'>
            <div className='card flex-1 p-6 sm:p-8'>
              <h2 className='font-display text-h4 text-accent sm:text-5xl'>Host your event at Kettli</h2>
              <ul className='mt-6 space-y-2.5 text-fg-muted'>
                {hostingOptions.map((option) => (
                  <li key={option} className='flex gap-3'>
                    <span aria-hidden='true' className='text-accent'>•</span>
                    {option}
                  </li>
                ))}
                <li className='flex gap-3'>
                  <span aria-hidden='true' className='text-accent'>•</span>
                  and more!
                </li>
              </ul>
            </div>
            <Button href={siteConfig.hostEventUrl} variant='primary' size='lg' className='w-full'>
              Host an event
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
