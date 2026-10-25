import { useEffect, useRef } from 'react';

/**
 * Scroll parallax for a background layer: as the page scrolls past it, the
 * layer drifts down at `speed` × scroll and zooms in slightly. Disabled for
 * reduced motion. Returns a ref for the layer element.
 */
export default function useParallax(speed = 0.3) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    let frame = 0;
    const update = () => {
      const y = Math.min(window.scrollY, window.innerHeight * 1.2);
      el.style.transform = `translate3d(0, ${y * speed}px, 0) scale(${1.04 + y * 0.00012})`;
    };
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
    };
  }, [speed]);

  return ref;
}
