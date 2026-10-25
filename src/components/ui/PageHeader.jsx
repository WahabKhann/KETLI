import Container from './Container.jsx';
import useParallax from '../../hooks/useParallax.js';

/**
 * Dark title band at the top of every inner page. Pass `photo` (an entry
 * from data/media.js) for a full-bleed parallax image behind the title.
 */
export default function PageHeader({ eyebrow, title, description, photo }) {
  const parallaxRef = useParallax(0.25);

  return (
    <section className='relative overflow-hidden bg-night text-fg'>
      {photo && (
        <>
          <div ref={parallaxRef} className='absolute inset-x-0 -top-[10%] h-[120%] origin-top will-change-transform'>
            <img
              src={photo.src}
              width={photo.width}
              height={photo.height}
              srcSet={photo.srcSet}
              sizes='100vw'
              alt={photo.alt}
              // React 18 only knows the lowercase attribute.
              fetchpriority='high'
              decoding='async'
              className='h-full w-full object-cover object-center'
            />
          </div>
          <div className='absolute inset-0 bg-gradient-to-t from-night/90 via-night/65 to-night/50' aria-hidden='true' />
        </>
      )}
      <Container className={`relative text-center ${photo ? 'py-24 sm:py-32 lg:py-40' : 'py-16 lg:py-24'}`}>
        {eyebrow && <p className='eyebrow text-accent'>{eyebrow}</p>}
        <h1 className='title-glow mx-auto mt-3 max-w-4xl text-balance font-display text-h1'>{title}</h1>
        {description && <p className='mx-auto mt-5 max-w-2xl text-base text-fg sm:text-lg'>{description}</p>}
      </Container>
    </section>
  );
}
