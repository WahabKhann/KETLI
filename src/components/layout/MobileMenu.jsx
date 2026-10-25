import { useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { X, Instagram, Phone } from 'lucide-react';
import Button from '../ui/Button.jsx';
import { navLinks, siteConfig } from '../../data/siteConfig.js';

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * Slide-in navigation panel for small screens. While open it locks page
 * scroll, traps Tab focus inside the panel, closes on Escape or backdrop
 * click, and hands focus back to the menu button when it closes.
 */
export default function MobileMenu({ open, onClose, returnFocusRef }) {
  const rootRef = useRef(null);
  const panelRef = useRef(null);
  const closeRef = useRef(null);

  // `inert` keeps the closed panel out of the tab order and accessibility tree.
  useEffect(() => {
    if (rootRef.current) rootRef.current.inert = !open;
  }, [open]);

  useEffect(() => {
    if (!open) return undefined;
    const returnTo = returnFocusRef?.current;

    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();

    const handleKey = (e) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      if (e.key !== 'Tab' || !panelRef.current) return;
      const items = [...panelRef.current.querySelectorAll(FOCUSABLE)];
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    window.addEventListener('keydown', handleKey);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKey);
      returnTo?.focus();
    };
  }, [open, onClose, returnFocusRef]);

  return (
    <div ref={rootRef} className={`fixed inset-0 z-[60] lg:hidden ${open ? '' : 'pointer-events-none'}`}>
      <div
        className={`absolute inset-0 bg-night/60 backdrop-blur-sm transition-opacity duration-300 ${open ? 'opacity-100' : 'opacity-0'}`}
        onClick={onClose}
        aria-hidden='true'
      />

      <div
        ref={panelRef}
        role='dialog'
        aria-modal='true'
        aria-label='Mobile navigation'
        className={`absolute inset-y-0 right-0 flex w-[min(88vw,24rem)] flex-col overflow-y-auto border-l border-line/15 bg-gradient-to-b from-surface-2 to-night shadow-lift transition-transform duration-500 ease-kettli ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className='flex h-[4.5rem] shrink-0 items-center justify-between px-5'>
          <span className='inline-flex items-center gap-3 text-lg font-semibold tracking-[0.2em] text-fg'>
            <img src='/images/brand/kettli-logo.webp' alt='' width={256} height={256} className='h-11 w-11 rounded-full border border-accent/60' />
            KETTLI
          </span>
          <button
            ref={closeRef}
            type='button'
            onClick={onClose}
            aria-label='Close menu'
            className='inline-flex h-11 w-11 items-center justify-center rounded-full text-fg transition-colors hover:bg-fg/10'
          >
            <X className='h-6 w-6' strokeWidth={1.5} />
          </button>
        </div>

        <nav className='flex flex-col px-5 pt-2' aria-label='Mobile primary'>
          {navLinks.map((link, index) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              onClick={onClose}
              style={{ transitionDelay: open ? `${120 + index * 40}ms` : '0ms' }}
              className={({ isActive }) =>
                `flex min-h-14 items-center border-b border-fg/10 font-display text-h5 transition-[color,opacity,transform] duration-500 ease-kettli hover:text-accent ${
                  open ? 'translate-x-0 opacity-100' : 'translate-x-6 opacity-0'
                } ${isActive ? 'text-accent' : 'text-fg'}`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className='mt-auto flex flex-col gap-4 px-5 py-8'>
          <Button href={siteConfig.foodpandaUrl} variant='primary' size='lg' className='w-full'>
            Order on Foodpanda
          </Button>
          <div className='flex flex-col gap-1 text-sm text-fg-muted'>
            <a href={siteConfig.phoneHref} className='inline-flex min-h-11 items-center gap-2 transition-colors hover:text-accent'>
              <Phone className='h-4 w-4' />
              {siteConfig.phone}
            </a>
            <a
              href={siteConfig.instagramUrl}
              target='_blank'
              rel='noopener noreferrer'
              className='inline-flex min-h-11 items-center gap-2 transition-colors hover:text-accent'
            >
              <Instagram className='h-4 w-4' />
              {siteConfig.instagramHandle}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
