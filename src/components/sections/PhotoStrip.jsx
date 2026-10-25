import { useCallback, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Instagram } from 'lucide-react';
import { siteConfig } from '../../data/siteConfig.js';

const AUTOPLAY_MS = 3500;

/**
 * Photo gallery as a 3D coverflow: the centred photo is full size, side photos
 * shrink and turn away. Swipe on touch, drag with a mouse, or use the arrow
 * buttons. With `moving` it also advances on its own (pausing on hover, focus
 * and drag). Reduced motion turns off the 3D turn and the autoplay.
 */
export default function PhotoStrip({ items, className = 'bg-night', moving = false }) {
  const trackRef = useRef(null);
  const drag = useRef({ active: false, moved: 0, startX: 0, startScroll: 0 });
  const paused = useRef(false);
  const arrowVariant = className.includes('surface-gold') ? 'btn-ghost' : 'btn-secondary';

  // Shape every card from its distance to the track's centre.
  const layout = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const center = track.scrollLeft + track.clientWidth / 2;
    [...track.children].forEach((card) => {
      const cardCenter = card.offsetLeft + card.offsetWidth / 2;
      const d = Math.max(-1.5, Math.min(1.5, (cardCenter - center) / card.offsetWidth));
      const abs = Math.min(Math.abs(d), 1);
      const inner = card.firstElementChild;
      inner.style.transform = reduced ? '' : `rotateY(${d * -24}deg) scale(${1 - abs * 0.16})`;
      // Dim (not fade) side photos so the band colour doesn't show through.
      inner.style.filter = `brightness(${1 - abs * 0.45})`;
      card.style.zIndex = String(10 - Math.round(abs * 5));
    });
  }, []);

  const step = useCallback((dir) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.children[0];
    const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
    const width = card.offsetWidth + gap;
    const atEnd = track.scrollLeft + track.clientWidth >= track.scrollWidth - 4;
    const left = dir > 0 && atEnd ? 0 : track.scrollLeft + dir * width;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    track.scrollTo({ left, behavior: reduced ? 'auto' : 'smooth' });
  }, []);

  // Centre the first card and keep the 3D layout in sync with scrolling.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return undefined;
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(layout);
    };
    layout();
    track.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(frame);
      track.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [layout]);

  useEffect(() => {
    if (!moving || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const id = window.setInterval(() => {
      if (!paused.current && !document.hidden) step(1);
    }, AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [moving, step]);

  // Mouse drag (touch already scrolls natively).
  const onPointerDown = (e) => {
    if (e.pointerType !== 'mouse' || e.button !== 0) return;
    const track = trackRef.current;
    drag.current = { active: true, moved: 0, startX: e.clientX, startScroll: track.scrollLeft };
    track.classList.add('is-dragging');
  };
  const onPointerMove = (e) => {
    if (!drag.current.active) return;
    const dx = e.clientX - drag.current.startX;
    drag.current.moved = Math.max(drag.current.moved, Math.abs(dx));
    trackRef.current.scrollLeft = drag.current.startScroll - dx;
  };
  const endDrag = () => {
    if (!drag.current.active) return;
    drag.current.active = false;
    trackRef.current.classList.remove('is-dragging');
  };
  // A drag shouldn't count as a click on the photo link.
  const onClickCapture = (e) => {
    if (drag.current.moved > 6) {
      e.preventDefault();
      e.stopPropagation();
    }
    drag.current.moved = 0;
  };

  return (
    <section
      className={`relative overflow-hidden py-16 lg:py-24 ${className}`}
      aria-roledescription='carousel'
      aria-label='Photos from Kettli'
      onMouseEnter={() => (paused.current = true)}
      onMouseLeave={() => {
        paused.current = false;
        endDrag();
      }}
      onFocus={() => (paused.current = true)}
      onBlur={() => (paused.current = false)}
    >
      <ul
        ref={trackRef}
        className='coverflow flex snap-x snap-mandatory gap-4 overflow-x-auto px-[calc(50%-31vw)] pb-24 pt-8 [perspective:1400px] [scrollbar-width:none] sm:px-[calc(50%-11rem)] [&::-webkit-scrollbar]:hidden'
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onClickCapture={onClickCapture}
      >
        {items.map((photo) => (
          <li key={photo.src} className='w-[62vw] shrink-0 snap-center sm:w-[22rem]'>
            <a
              href={siteConfig.instagramUrl}
              target='_blank'
              rel='noopener noreferrer'
              draggable='false'
              aria-label={`${photo.alt} — more on Instagram`}
              className='group relative block overflow-hidden rounded-card shadow-lift transition-[transform,filter] duration-300 ease-out [transform-style:preserve-3d]'
            >
              <img
                src={photo.src}
                width={photo.width}
                height={photo.height}
                srcSet={photo.srcSet}
                sizes='(min-width: 640px) 352px, 62vw'
                alt={photo.alt}
                loading='lazy'
                decoding='async'
                draggable='false'
                className='aspect-[4/5] w-full select-none object-cover'
              />
              <span className='pointer-events-none absolute inset-0 bg-gradient-to-t from-night/60 via-transparent to-fg/5' aria-hidden='true' />
              <span className='absolute bottom-4 right-4 grid h-10 w-10 place-items-center rounded-full bg-accent text-night opacity-0 shadow-glow transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100'>
                <Instagram className='h-4 w-4' aria-hidden='true' />
              </span>
            </a>
          </li>
        ))}
      </ul>

      <div className='relative -mt-16 flex justify-center gap-3'>
        <button
          type='button'
          onClick={() => step(-1)}
          aria-label='Previous photo'
          className={`btn ${arrowVariant} h-11 w-11 px-0`}
        >
          <ChevronLeft className='h-5 w-5' />
        </button>
        <button
          type='button'
          onClick={() => step(1)}
          aria-label='Next photo'
          className={`btn ${arrowVariant} h-11 w-11 px-0`}
        >
          <ChevronRight className='h-5 w-5' />
        </button>
      </div>
    </section>
  );
}
