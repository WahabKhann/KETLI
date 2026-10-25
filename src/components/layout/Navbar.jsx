import { useCallback, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu } from 'lucide-react';
import Container from '../ui/Container.jsx';
import Button from '../ui/Button.jsx';
import MobileMenu from './MobileMenu.jsx';
import useScrollPosition from '../../hooks/useScrollPosition.js';
import { navLinks, siteConfig } from '../../data/siteConfig.js';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const scrolled = useScrollPosition(8);
  const menuButtonRef = useRef(null);
  // Stable so the open menu's focus-trap effect doesn't re-run on re-render.
  const closeMenu = useCallback(() => setMobileOpen(false), []);

  return (
    <>
      <header
        className={`sticky top-0 z-50 w-full border-b backdrop-blur-xl backdrop-saturate-150 transition-[background-color,box-shadow,border-color] duration-300 ${
          scrolled ? 'border-line/15 bg-night/90 shadow-lift' : 'border-fg/10 bg-night/70'
        }`}
      >
        <Container className='flex h-[4.5rem] items-center justify-between gap-6'>
          <NavLink
            to='/'
            className='group inline-flex items-center gap-3 text-base font-bold tracking-[0.2em] text-fg transition-colors hover:text-accent'
            aria-label='Kettli — home'
          >
            <img
              src='/images/brand/kettli-logo.webp'
              alt=''
              width={256}
              height={256}
              className='h-10 w-10 rounded-full border border-accent/60 object-cover shadow-lift transition-transform duration-300 group-hover:rotate-3 group-hover:scale-105'
            />
            <span>KETTLI</span>
          </NavLink>

          <nav className='hidden items-center gap-6 lg:flex xl:gap-8' aria-label='Primary'>
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) =>
                  `relative inline-flex min-h-11 items-center text-xs font-semibold uppercase tracking-[0.14em] transition-colors duration-200 after:absolute after:inset-x-0 after:bottom-2.5 after:h-px after:origin-left after:bg-accent after:transition-transform hover:text-accent ${
                    isActive
                      ? 'text-accent after:scale-x-100'
                      : 'text-fg after:scale-x-0 hover:after:scale-x-100'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          <div className='flex items-center gap-3'>
            <Button href={siteConfig.foodpandaUrl} variant='primary' className='hidden sm:inline-flex'>
              Order now
            </Button>
            <button
              type='button'
              ref={menuButtonRef}
              className='inline-flex h-11 w-11 items-center justify-center rounded-full text-fg transition-colors hover:bg-fg/10 lg:hidden'
              onClick={() => setMobileOpen(true)}
              aria-label='Open menu'
              aria-expanded={mobileOpen}
            >
              <Menu className='h-6 w-6' strokeWidth={1.5} />
            </button>
          </div>
        </Container>
      </header>

      <MobileMenu open={mobileOpen} onClose={closeMenu} returnFocusRef={menuButtonRef} />
    </>
  );
}
