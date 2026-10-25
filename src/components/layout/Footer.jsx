import { Link } from 'react-router-dom';
import { Instagram, Phone, MapPin, Clock, MessageCircleMore } from 'lucide-react';
import Container from '../ui/Container.jsx';
import { siteConfig, navLinks } from '../../data/siteConfig.js';
import { locations } from '../../data/locations.js';

function FooterHeading({ children }) {
  return <h2 className='mb-4 eyebrow text-accent'>{children}</h2>;
}

const linkClass = 'inline-flex min-h-11 items-center gap-2 transition-colors hover:text-accent';

export default function Footer() {
  const mainBranch = locations[0];
  const year = new Date().getFullYear();

  return (
    <footer className='bg-night pb-8 pt-16 text-fg-muted'>
      <Container>
        <div className='grid grid-cols-1 gap-12 border-b border-fg/10 pb-12 sm:grid-cols-2 lg:grid-cols-4'>
          <div>
            <span className='inline-flex items-center gap-3 text-lg font-semibold tracking-[0.2em] text-fg'>
              <img src='/images/brand/kettli-logo.webp' alt='' width={256} height={256} className='h-12 w-12 rounded-full border border-accent/50' />
              KETTLI
            </span>
            <p className='mt-4 max-w-xs text-sm leading-relaxed'>{siteConfig.description}</p>
          </div>

          <div>
            <FooterHeading>Visit</FooterHeading>
            <ul className='flex flex-col text-sm'>
              <li className='flex items-center gap-2'>
                <MapPin className='h-4 w-4 shrink-0 text-accent' strokeWidth={1.5} />
                <a href={mainBranch.mapsUrl} target='_blank' rel='noopener noreferrer' className='inline-flex min-h-11 items-center transition-colors hover:text-accent'>
                  {mainBranch.address}
                </a>
              </li>
              <li className='flex items-start gap-2'>
                <Clock className='mt-0.5 h-4 w-4 shrink-0 text-accent' strokeWidth={1.5} />
                <span>{mainBranch.hours}</span>
              </li>
            </ul>
          </div>

          <div>
            <FooterHeading>Contact</FooterHeading>
            <ul className='flex flex-col text-sm'>
              <li>
                <a href={siteConfig.phoneHref} className={linkClass}>
                  <Phone className='h-4 w-4 text-accent' strokeWidth={1.5} />
                  {siteConfig.phone}
                </a>
              </li>
              <li>
                <a href={siteConfig.whatsappUrl} target='_blank' rel='noopener noreferrer' className={linkClass}>
                  <MessageCircleMore className='h-4 w-4 text-accent' strokeWidth={1.5} />
                  WhatsApp us
                </a>
              </li>
              <li>
                <a href={siteConfig.instagramUrl} target='_blank' rel='noopener noreferrer' className={linkClass}>
                  <Instagram className='h-4 w-4 text-accent' strokeWidth={1.5} />
                  {siteConfig.instagramHandle}
                </a>
              </li>
              <li>
                <a href={siteConfig.foodpandaUrl} target='_blank' rel='noopener noreferrer' className={linkClass}>
                  Order online — Foodpanda
                </a>
              </li>
            </ul>
          </div>

          <div>
            <FooterHeading>Explore</FooterHeading>
            <ul className='grid grid-cols-2 gap-x-3 text-sm'>
              {navLinks.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className={linkClass}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className='flex flex-col items-center justify-between gap-4 pt-8 text-xs text-fg-muted sm:flex-row'>
          <p>© {year} Kettli. All rights reserved.</p>
          <p>F-10/4, Islamabad, Pakistan</p>
        </div>
      </Container>
    </footer>
  );
}
