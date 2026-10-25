import { Star } from 'lucide-react';
import Container from '../ui/Container.jsx';
import Button from '../ui/Button.jsx';
import { reviewSummary, reviews } from '../../data/reviews.js';
import { locations } from '../../data/locations.js';

function Stars({ rating }) {
  return (
    <div className='flex gap-0.5' aria-hidden='true'>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-5 w-5 ${i < Math.round(rating) ? 'fill-accent text-accent' : 'text-white/30'}`}
          strokeWidth={1.5}
        />
      ))}
    </div>
  );
}

/** Rating summary plus speech-bubble review cards on gold. */
export default function Reviews() {
  const highlights = reviews.filter((review) => review.sentiment === 'positive');
  const googleUrl = locations[0].mapsUrl;

  return (
    <section className='surface-gold py-16 text-ink lg:py-24'>
      <Container>
        <div className='text-center'>
          <p className='eyebrow text-ink-muted'>Reviews</p>
          <h2 className='mt-4 font-display text-h2'>What our guests say</h2>
        </div>

        <div className='mx-auto mt-10 grid max-w-5xl gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3'>
          <div className='card flex flex-col items-center justify-center p-7 text-center'>
            <p className='font-display text-7xl leading-none text-accent'>{reviewSummary.rating}</p>
            <div className='mt-3'>
              <Stars rating={reviewSummary.rating} />
            </div>
            <p className='mt-2 text-sm text-fg-muted'>
              {reviewSummary.reviewCount} reviews on {reviewSummary.source}
            </p>
            <Button href={googleUrl} variant='primary' className='mt-5'>
              Read them all
            </Button>
          </div>

          {highlights.map((review) => (
            <figure key={review.id}>
              <blockquote className='card relative p-6 text-[17px] leading-relaxed text-fg-muted after:absolute after:-bottom-2.5 after:left-8 after:h-5 after:w-5 after:rotate-45 after:border-b after:border-r after:border-accent/15 after:bg-surface-1'>
                <span aria-hidden='true' className='block font-display text-5xl leading-[0.6] text-accent'>“</span>
                <p className='mt-2'>{review.text}</p>
              </blockquote>
              <figcaption className='mt-5 flex items-center gap-3 pl-2'>
                <span className='grid h-10 w-10 place-items-center rounded-full bg-night font-display text-lg text-accent'>
                  {review.tag.charAt(0)}
                </span>
                <span className='text-sm'>
                  <span className='block font-semibold'>{review.tag}</span>
                  <span className='text-ink-muted'>Google review theme</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>

        <p className='mt-10 text-center text-xs text-ink-muted'>
          Summaries of recurring review themes — swap in verbatim quotes once approved.
        </p>
      </Container>
    </section>
  );
}
