import { lazy, Suspense } from 'react';
import Container from '../ui/Container.jsx';
import Button from '../ui/Button.jsx';
import { locations } from '../../data/locations.js';

// Leaflet is ~150 KB, so the map loads on its own after the page.
const KettliMap = lazy(() => import('../ui/KettliMap.jsx'));

/** Map + address/hours/phone on gold. */
export default function VisitSection({ id = 'visit', className = 'surface-gold' }) {
  const location = locations.find((item) => item.verified);
  if (!location) return null;

  return (
    <section id={id} className={`scroll-mt-20 py-16 lg:py-24 ${className}`}>
      <Container>
        <div className='grid items-center gap-8 lg:grid-cols-[1.5fr_1fr] lg:gap-14'>
          <div className='card overflow-hidden p-0'>
            <Suspense fallback={<div className='aspect-[4/3] w-full bg-surface-1 sm:aspect-[16/9]' />}>
              <KettliMap className='aspect-[4/3] w-full sm:aspect-[16/9]' />
            </Suspense>
          </div>

          <div className='text-ink'>
            <p className='eyebrow text-ink-muted'>Find your table</p>
            <h2 className='mt-4 font-display text-h3'>Kettli F-10/4</h2>
            <dl className='mt-6 space-y-5 text-base leading-relaxed'>
              <div>
                <dt className='text-sm font-semibold text-ink-muted'>Address</dt>
                <dd>{location.address}</dd>
              </div>
              <div>
                <dt className='text-sm font-semibold text-ink-muted'>Hours</dt>
                <dd>{location.hours}</dd>
              </div>
              <div>
                <dt className='text-sm font-semibold text-ink-muted'>Phone</dt>
                <dd>
                  <a href={location.phoneHref} className='inline-flex min-h-11 items-center underline decoration-night/30 underline-offset-4 hover:decoration-night'>
                    {location.phone}
                  </a>
                </dd>
              </div>
            </dl>
            <p className='mt-5 text-sm text-ink-muted'>We take orders over the phone too.</p>
            <div className='mt-7 flex flex-wrap gap-3'>
              <Button href={location.mapsUrl} variant='dark'>
                Get directions
              </Button>
              <Button href={location.foodpandaUrl} variant='ghost'>
                Order online
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
