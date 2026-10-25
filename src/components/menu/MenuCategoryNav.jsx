import { useEffect, useState } from 'react';
import { menuBoard, menuSectionId } from '../../data/menu.js';

const categories = menuBoard.flat().filter((name) => name !== 'note');
const NAV_OFFSET = 150; // sticky header + this bar

/**
 * Sticky row of category chips for the Menu page. Highlights the category
 * nearest the top of the viewport and smooth-scrolls to one on click.
 */
export default function MenuCategoryNav() {
  const [active, setActive] = useState(categories[0]);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      let best = categories[0];
      let bestTop = -Infinity;
      categories.forEach((name) => {
        const el = document.getElementById(menuSectionId(name));
        if (!el) return;
        const top = el.getBoundingClientRect().top;
        if (top <= NAV_OFFSET + 10 && top > bestTop) {
          best = name;
          bestTop = top;
        }
      });
      setActive(best);
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
  }, []);

  const goTo = (name) => (e) => {
    e.preventDefault();
    const el = document.getElementById(menuSectionId(name));
    if (!el) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - NAV_OFFSET + 16, behavior: reduced ? 'auto' : 'smooth' });
    setActive(name);
  };

  return (
    <nav
      aria-label='Menu categories'
      className='sticky top-[4.5rem] z-30 border-b border-line/15 bg-night/85 shadow-card backdrop-blur-xl'
    >
      <ul className='mx-auto flex max-w-7xl gap-2 overflow-x-auto px-5 py-3 [scrollbar-width:none] sm:px-8 lg:justify-center lg:px-12 [&::-webkit-scrollbar]:hidden'>
        {categories.map((name) => {
          const isActive = name === active;
          return (
            <li key={name} className='shrink-0'>
              <a
                href={`#${menuSectionId(name)}`}
                onClick={goTo(name)}
                aria-current={isActive ? 'true' : undefined}
                className={`inline-flex min-h-11 items-center rounded-full border px-4 text-sm font-semibold transition-colors ${
                  isActive
                    ? 'border-accent bg-accent text-night shadow-glow'
                    : 'border-fg/15 text-fg hover:border-accent hover:text-accent'
                }`}
              >
                {name}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
