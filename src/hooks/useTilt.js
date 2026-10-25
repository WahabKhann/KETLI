import { useEffect, useRef } from 'react';

/**
 * Gentle 3D tilt with a cursor-following glare. Returns a ref for the card;
 * pair it with the `.tilt` class and a `.tilt-glare` child (see index.css).
 * Only runs on fine pointers (mouse/trackpad) and never with reduced motion.
 */
export default function useTilt(maxDeg = 6) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!canHover || reduced) return undefined;

    let frame = 0;
    const onMove = (e) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        el.style.setProperty('--ry', `${(x - 0.5) * 2 * maxDeg}deg`);
        el.style.setProperty('--rx', `${(0.5 - y) * 2 * maxDeg}deg`);
        el.style.setProperty('--gx', `${x * 100}%`);
        el.style.setProperty('--gy', `${y * 100}%`);
        el.style.setProperty('--go', '1');
      });
    };
    const onEnter = () => el.classList.add('is-tilting');
    const onLeave = () => {
      cancelAnimationFrame(frame);
      el.classList.remove('is-tilting');
      ['--rx', '--ry'].forEach((prop) => el.style.setProperty(prop, '0deg'));
      el.style.setProperty('--go', '0');
    };

    el.addEventListener('pointerenter', onEnter);
    el.addEventListener('pointermove', onMove);
    el.addEventListener('pointerleave', onLeave);
    return () => {
      cancelAnimationFrame(frame);
      el.removeEventListener('pointerenter', onEnter);
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerleave', onLeave);
    };
  }, [maxDeg]);

  return ref;
}
