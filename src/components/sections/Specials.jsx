import Container from '../ui/Container.jsx';
import RevealOnScroll from '../ui/RevealOnScroll.jsx';
import { specials } from '../../data/menu.js';
import { photos } from '../../data/media.js';

/** Photo-and-text boxes on black, alternating image side. */
export default function Specials({ className = 'bg-night' }) {
  return (
    <section className={`py-16 lg:py-24 ${className}`}>
      <Container className='space-y-4 sm:space-y-5'>
        {specials.map((special, index) => {
          const photo = photos[special.photo];
          return (
            <RevealOnScroll key={special.id}>
              <article className='card mx-auto grid max-w-5xl gap-6 p-4 sm:p-5 md:grid-cols-2 md:gap-10'>
                <img
                  src={photo.src}
                  width={photo.width}
                  height={photo.height}
                  srcSet={photo.srcSet}
                  sizes='(min-width: 768px) 480px, 100vw'
                  alt={photo.alt}
                  loading='lazy'
                  decoding='async'
                  className={`aspect-[4/5] w-full rounded-xl object-cover ${
                    index % 2 === 1 ? 'md:order-2' : ''
                  }`}
                />
                <div className='flex flex-col justify-center pb-2 md:py-4'>
                  <h2 className='font-display text-h4 text-accent sm:text-5xl'>{special.title}</h2>
                  <p className='mt-5 text-base leading-relaxed text-fg-muted'>{special.intro}</p>
                  <dl className='mt-5 space-y-4'>
                    {special.items.map((item) => (
                      <div key={item.name}>
                        <dt className='font-semibold text-accent'>{item.name}</dt>
                        <dd className='mt-0.5 leading-relaxed text-fg-muted'>{item.text}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </article>
            </RevealOnScroll>
          );
        })}
      </Container>
    </section>
  );
}
