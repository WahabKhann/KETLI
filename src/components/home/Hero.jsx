import { ArrowDown } from 'lucide-react';
import Container from '../ui/Container.jsx';
import Button from '../ui/Button.jsx';
import CinematicMedia from '../ui/CinematicMedia.jsx';
import useParallax from '../../hooks/useParallax.js';
import { photos } from '../../data/media.js';
import { siteConfig } from '../../data/siteConfig.js';

export default function Hero() {
  const parallaxRef = useParallax(0.3);

  return (
    <section className='relative overflow-hidden bg-night text-fg'>
      {/* Parallax layer is taller than the hero so the drift never shows an edge. */}
      <div ref={parallaxRef} className='absolute inset-x-0 -top-[8%] h-[116%] origin-top will-change-transform'>
        <CinematicMedia
          src={photos.rooftopSign.src}
          alt={photos.rooftopSign.alt}
          width={photos.rooftopSign.width}
          height={photos.rooftopSign.height}
          srcSet={photos.rooftopSign.srcSet}
          sizes='100vw'
          priority
          className='absolute inset-0'
          mediaClassName='object-[center_30%]'
        />
      </div>
      <div
        className='absolute inset-0 bg-gradient-to-t from-night/95 via-night/45 to-night/15'
        aria-hidden='true'
      />
      <div
        className='absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_70%,rgb(var(--accent)/0.12),transparent_70%)]'
        aria-hidden='true'
      />

      <Container className='relative flex min-h-[calc(100svh-4.5rem)] flex-col items-center justify-end pb-12 pt-28 text-center sm:pb-16'>
        <p className='mb-2 inline-flex items-center gap-2 rounded-full border border-fg/20 bg-night/40 px-3.5 py-2 text-xs uppercase tracking-[0.16em] text-fg shadow-card backdrop-blur-md'>
          <span className='h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_12px_rgb(var(--accent)/0.9)]' />
          F-10/4 · Open till 3 AM
        </p>
        <h1 className='title-glow mt-4 font-display text-display'>KETTLI</h1>
        <p className='mt-5 max-w-2xl text-balance text-base text-fg sm:text-lg lg:text-xl'>
          Islamabad's rooftop for karak chai, comfort food and conversations that run past midnight.
        </p>

        <div className='mt-8 flex flex-wrap justify-center gap-3'>
          <Button href='/menu' variant='primary' size='lg'>
            See the menu
          </Button>
          <Button href={siteConfig.foodpandaUrl} variant='secondary' size='lg'>
            Order on Foodpanda
          </Button>
        </div>

        <a
          href='#visit'
          className='mt-8 inline-flex min-h-11 items-center gap-2 text-xs uppercase tracking-[0.16em] text-fg-muted transition-colors hover:text-accent'
        >
          Find us <ArrowDown className='h-4 w-4 animate-bounce' />
        </a>
      </Container>
    </section>
  );
}
