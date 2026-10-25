import Container from '../components/ui/Container.jsx';
import PageHeader from '../components/ui/PageHeader.jsx';
import RevealOnScroll from '../components/ui/RevealOnScroll.jsx';
import PhotoStrip from '../components/sections/PhotoStrip.jsx';
import CtaBand from '../components/sections/CtaBand.jsx';
import Button from '../components/ui/Button.jsx';
import usePageMeta from '../hooks/usePageMeta.js';
import { photos } from '../data/media.js';

const values = [
  {
    title: 'Chai, done properly',
    body: 'Karak chai is the anchor of every Kettli table — strong, milky and the thing regulars order without looking at the menu.',
  },
  {
    title: 'Built for staying late',
    body: "The kettle stays on until around 3 AM, for whenever the conversation isn't ready to end.",
  },
  {
    title: 'A roof with a view',
    body: 'String lights, the Bob Marley mural and Islamabad glowing below. Some nights there is live music, too.',
  },
];

const aboutPhotos = [photos.liveAcoustic, photos.barCounter, photos.muralNight, photos.stringLights];

export default function About() {
  usePageMeta({
    title: 'About — Kettli Islamabad',
    description:
      'Kettli is a rooftop café in F-10/4, Islamabad, built around chai, comfort food, live music and late-night conversation.',
  });

  return (
    <>
      <PageHeader
        eyebrow='About Kettli'
        title='A rooftop that stays up late'
        description='Good food, better tea, and no rush to leave.'
        photo={photos.rooftopMural}
      />

      <section className='surface-gold py-16 text-ink lg:py-24'>
        <Container>
          <div className='grid items-center gap-10 lg:grid-cols-2 lg:gap-16'>
            <RevealOnScroll>
              <img
                src={photos.rooftopSign.src}
                width={photos.rooftopSign.width}
                height={photos.rooftopSign.height}
                srcSet={photos.rooftopSign.srcSet}
                sizes='(min-width: 1024px) 600px, 100vw'
                alt={photos.rooftopSign.alt}
                loading='lazy'
                decoding='async'
                className='aspect-[4/5] w-full rounded-card object-cover shadow-lift'
              />
            </RevealOnScroll>

            <RevealOnScroll>
              <p className='eyebrow text-ink-muted'>Our story</p>
              <h2 className='mt-4 text-balance font-display text-h2'>
                Look for the lights above Sagheer Market.
              </h2>
              <p className='mt-6 text-lg leading-relaxed text-ink-muted'>
                Kettli sits on a rooftop in F-10/4, under string lights and a marquee sign you can spot from the street.
                It is where Islamabad comes for karak chai, a Hi-Tea Platter for the whole table, and a seat with a
                view of the city.
              </p>
              <p className='mt-4 text-lg leading-relaxed text-ink-muted'>
                It is casual rather than formal — dine in or take away — and built to feel more like a friend's roof
                than a restaurant. Students, families, couples and late-night regulars all find their corner.
              </p>
            </RevealOnScroll>
          </div>
        </Container>
      </section>

      <section className='bg-night py-16 text-fg lg:py-24'>
        <Container>
          <div className='text-center'>
            <p className='eyebrow text-accent'>What matters</p>
            <h2 className='mt-4 font-display text-h2'>What we care about</h2>
          </div>
          <div className='mt-10 grid gap-4 md:grid-cols-3'>
            {values.map((value, index) => (
              <RevealOnScroll key={value.title} delay={index * 90}>
                <div className='card h-full p-6 sm:p-7'>
                  <h3 className='font-display text-2xl leading-[1.05] text-accent sm:text-3xl'>{value.title}</h3>
                  <p className='mt-4 leading-relaxed text-fg-muted'>{value.body}</p>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </Container>
      </section>

      <PhotoStrip items={aboutPhotos} className='surface-gold' />

      <CtaBand title='Best experienced in person' description='Come by F-10/4, or check the menu before you decide what to order.'>
        <Button href='/locations' variant='primary' size='lg'>
          Find us
        </Button>
        <Button href='/menu' variant='secondary' size='lg'>
          See the menu
        </Button>
      </CtaBand>
    </>
  );
}
