import { useState } from 'react';
import { CalendarDays, Instagram, MapPin, MessageCircleMore, Moon, Music, Users } from 'lucide-react';
import Container from '../components/ui/Container.jsx';
import PageHeader from '../components/ui/PageHeader.jsx';
import RevealOnScroll from '../components/ui/RevealOnScroll.jsx';
import Button from '../components/ui/Button.jsx';
import CtaBand from '../components/sections/CtaBand.jsx';
import usePageMeta from '../hooks/usePageMeta.js';
import { labelClass, inputClass, errorClass } from '../components/ui/formStyles.js';
import { events, hostingOptions } from '../data/events.js';
import { photos, eventGallery } from '../data/media.js';
import { siteConfig } from '../data/siteConfig.js';

const highlights = [
  { icon: Music, title: 'Live acoustic sets', text: 'Guitar and vocals on the rooftop stage' },
  { icon: MapPin, title: 'Rooftop, F-10/4', text: 'String lights and city views' },
  { icon: Moon, title: 'Open till 3 AM', text: 'Nights that run late' },
  { icon: Users, title: 'Private bookings', text: 'Birthdays, teams and big tables' },
];

const steps = [
  'Tell us the date, group size and what you have in mind.',
  'We confirm the details with you on WhatsApp.',
  'Turn up — your table, chai and string lights will be ready.',
];

function whatsappAbout(text) {
  return `${siteConfig.whatsappUrl}?text=${encodeURIComponent(text)}`;
}

function EventMeta({ event }) {
  return (
    <ul className='space-y-1.5 text-sm font-semibold text-accent'>
      <li className='flex items-center gap-2'>
        <CalendarDays className='h-4 w-4 shrink-0' />
        {event.when}
      </li>
      <li className='flex items-center gap-2'>
        <MapPin className='h-4 w-4 shrink-0' />
        {event.where}
      </li>
    </ul>
  );
}

function FeaturedEvent({ event }) {
  const photo = photos[event.photo];

  return (
    <article className='card group grid overflow-hidden lg:grid-cols-2'>
      <div className='relative overflow-hidden'>
        <img
          src={photo.src}
          width={photo.width}
          height={photo.height}
          srcSet={photo.srcSet}
          sizes='(min-width: 1024px) 50vw, 100vw'
          alt={photo.alt}
          loading='lazy'
          decoding='async'
          className='aspect-[4/3] h-full w-full object-cover transition-transform duration-700 ease-kettli group-hover:scale-105 lg:aspect-auto lg:max-h-[36rem]'
        />
        <span className='absolute left-5 top-5 rounded-full bg-accent px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-night'>
          Featured
        </span>
      </div>
      <div className='flex flex-col justify-center p-7 sm:p-10'>
        <h2 className='font-display text-h3'>{event.title}</h2>
        <div className='mt-5'>
          <EventMeta event={event} />
        </div>
        <p className='mt-5 text-base leading-relaxed text-fg-muted sm:text-lg'>{event.description}</p>
        <div className='mt-8 flex flex-wrap gap-3'>
          <Button href={siteConfig.instagramUrl} variant='primary'>
            <Instagram className='h-4 w-4' />
            See dates
          </Button>
          <Button href={whatsappAbout(`Hi Kettli, I'd like to reserve a table for ${event.title}.`)} variant='secondary'>
            <MessageCircleMore className='h-4 w-4' />
            Reserve a table
          </Button>
        </div>
      </div>
    </article>
  );
}

function EventCard({ event }) {
  const photo = photos[event.photo];

  return (
    <article className='card group flex h-full flex-col overflow-hidden'>
      <div className='overflow-hidden'>
        <img
          src={photo.src}
          width={photo.width}
          height={photo.height}
          srcSet={photo.srcSet}
          sizes='(min-width: 1024px) 50vw, 100vw'
          alt={photo.alt}
          loading='lazy'
          decoding='async'
          className='aspect-[16/10] w-full object-cover transition-transform duration-700 ease-kettli group-hover:scale-105'
        />
      </div>
      <div className='flex flex-1 flex-col p-6 sm:p-7'>
        <h3 className='font-display text-h4'>{event.title}</h3>
        <div className='mt-4'>
          <EventMeta event={event} />
        </div>
        <p className='mt-4 flex-1 leading-relaxed text-fg-muted'>{event.description}</p>
        <a
          href={whatsappAbout(`Hi Kettli, I'd like to know more about ${event.title}.`)}
          target='_blank'
          rel='noopener noreferrer'
          className='mt-6 inline-flex w-fit items-center gap-2 border-b border-accent/40 pb-1 text-sm font-semibold text-accent transition-colors hover:border-accent'
        >
          <MessageCircleMore className='h-4 w-4' />
          Ask about this
        </a>
      </div>
    </article>
  );
}

function EnquiryForm() {
  const [values, setValues] = useState({ name: '', date: '', guests: '', type: hostingOptions[0], notes: '' });
  const [errors, setErrors] = useState({});

  const handleChange = (field) => (e) => setValues((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    const nextErrors = {};
    if (!values.name.trim()) nextErrors.name = 'Please enter your name.';
    if (!values.date) nextErrors.date = 'Pick a date (an approximate one is fine).';
    if (!(Number(values.guests) > 0)) nextErrors.guests = 'How many guests are you expecting?';
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    const message = [
      `Hi Kettli, I'd like to host an event.`,
      `Name: ${values.name.trim()}`,
      `Event: ${values.type}`,
      `Date: ${values.date}`,
      `Guests: ${values.guests}`,
      values.notes.trim() && `Notes: ${values.notes.trim()}`,
    ]
      .filter(Boolean)
      .join('\n');
    window.open(whatsappAbout(message), '_blank', 'noopener,noreferrer');
  };

  return (
    <form onSubmit={handleSubmit} noValidate className='card p-6 sm:p-8'>
      <h3 className='font-display text-h4 text-accent'>Plan your event</h3>
      <p className='mt-2 text-sm text-fg-muted'>Opens WhatsApp with your details filled in — nothing is sent until you hit send.</p>

      <div className='mt-6 grid gap-5 sm:grid-cols-2'>
        <div className='sm:col-span-2'>
          <label htmlFor='event-name' className={labelClass}>Your name</label>
          <input
            id='event-name'
            type='text'
            autoComplete='name'
            placeholder='Your name'
            value={values.name}
            onChange={handleChange('name')}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? 'event-name-error' : undefined}
            className={inputClass}
          />
          {errors.name && <p id='event-name-error' className={errorClass}>{errors.name}</p>}
        </div>

        <div>
          <label htmlFor='event-date' className={labelClass}>Date</label>
          <input
            id='event-date'
            type='date'
            value={values.date}
            onChange={handleChange('date')}
            aria-invalid={Boolean(errors.date)}
            aria-describedby={errors.date ? 'event-date-error' : undefined}
            className={`${inputClass} [color-scheme:dark]`}
          />
          {errors.date && <p id='event-date-error' className={errorClass}>{errors.date}</p>}
        </div>

        <div>
          <label htmlFor='event-guests' className={labelClass}>Guests</label>
          <input
            id='event-guests'
            type='number'
            min='1'
            inputMode='numeric'
            placeholder='e.g. 12'
            value={values.guests}
            onChange={handleChange('guests')}
            aria-invalid={Boolean(errors.guests)}
            aria-describedby={errors.guests ? 'event-guests-error' : undefined}
            className={inputClass}
          />
          {errors.guests && <p id='event-guests-error' className={errorClass}>{errors.guests}</p>}
        </div>

        <div className='sm:col-span-2'>
          <label htmlFor='event-type' className={labelClass}>Type of event</label>
          <select id='event-type' value={values.type} onChange={handleChange('type')} className={inputClass}>
            {hostingOptions.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </div>

        <div className='sm:col-span-2'>
          <label htmlFor='event-notes' className={labelClass}>Anything else? (optional)</label>
          <textarea
            id='event-notes'
            rows={3}
            placeholder='Cake, decorations, a music request…'
            value={values.notes}
            onChange={handleChange('notes')}
            className={`resize-none ${inputClass}`}
          />
        </div>
      </div>

      <Button type='submit' variant='primary' size='lg' className='mt-6 w-full'>
        <MessageCircleMore className='h-4 w-4' />
        Send enquiry on WhatsApp
      </Button>
    </form>
  );
}

export default function Events() {
  usePageMeta({
    title: 'Events — Kettli Islamabad',
    description:
      'Live acoustic nights, Hi-Tea evenings and rooftop gatherings at Kettli F-10/4, Islamabad. Host your own event with us.',
  });

  const [featured, ...more] = events;

  return (
    <>
      <PageHeader
        eyebrow='Events'
        title='Events at Kettli'
        description='Live music on the roof, long tables and nights that run late. New dates go up on Instagram first.'
        photo={photos.liveStageCrowd}
      />

      <section className='surface-gold py-10 text-ink sm:py-12'>
        <Container>
          <ul className='grid gap-6 sm:grid-cols-2 lg:grid-cols-4'>
            {highlights.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.title} className='flex items-center gap-4'>
                  <span className='grid h-12 w-12 shrink-0 place-items-center rounded-full bg-night text-accent'>
                    <Icon className='h-5 w-5' strokeWidth={1.75} />
                  </span>
                  <span>
                    <span className='block font-semibold'>{item.title}</span>
                    <span className='text-sm text-ink-muted'>{item.text}</span>
                  </span>
                </li>
              );
            })}
          </ul>
        </Container>
      </section>

      <section className='bg-night py-16 text-fg lg:py-24'>
        <Container>
          <p className='eyebrow text-accent'>What's on</p>
          <h2 className='mt-4 font-display text-h2'>Nights worth staying up for</h2>

          <RevealOnScroll className='mt-10'>
            <FeaturedEvent event={featured} />
          </RevealOnScroll>

          <div className='mt-6 grid gap-6 md:grid-cols-2'>
            {more.map((event, index) => (
              <RevealOnScroll key={event.id} delay={index * 90}>
                <EventCard event={event} />
              </RevealOnScroll>
            ))}
          </div>
        </Container>
      </section>

      <section className='surface-gold py-16 text-ink lg:py-24'>
        <Container className='grid items-start gap-12 lg:grid-cols-2 lg:gap-16'>
          <div>
            <p className='eyebrow text-ink-muted'>Private events</p>
            <h2 className='mt-4 font-display text-h2'>Host your event at Kettli</h2>
            <p className='mt-5 max-w-lg text-lg leading-relaxed text-ink-muted'>
              Birthdays, live sets, team dinners or a private night on the roof — tell us what you have in mind and we
              will make it happen.
            </p>
            <ul className='mt-7 flex flex-wrap gap-2'>
              {hostingOptions.map((option) => (
                <li key={option} className='rounded-full bg-night px-4 py-2 text-sm font-semibold text-accent'>
                  {option}
                </li>
              ))}
            </ul>

            <h3 className='mt-10 font-display text-2xl'>How it works</h3>
            <ol className='mt-5 space-y-4'>
              {steps.map((step, index) => (
                <li key={step} className='flex items-start gap-4'>
                  <span className='grid h-9 w-9 shrink-0 place-items-center rounded-full border-2 border-night font-display text-lg'>
                    {index + 1}
                  </span>
                  <span className='pt-1.5 leading-relaxed'>{step}</span>
                </li>
              ))}
            </ol>
          </div>

          <RevealOnScroll>
            <EnquiryForm />
          </RevealOnScroll>
        </Container>
      </section>

      <section className='bg-night py-16 text-fg lg:py-24'>
        <Container>
          <div className='text-center'>
            <p className='eyebrow text-accent'>Gallery</p>
            <h2 className='mt-4 font-display text-h2'>From past nights</h2>
          </div>
          <ul className='mt-10 grid auto-rows-[11rem] grid-cols-2 gap-3 sm:auto-rows-[14rem] sm:gap-4 md:grid-cols-3 lg:auto-rows-[16rem]'>
            {eventGallery.map((photo, index) => (
              <li
                key={photo.src}
                className={`group relative overflow-hidden rounded-card ${index === 0 ? 'col-span-2 row-span-2' : ''}`}
              >
                <img
                  src={photo.src}
                  width={photo.width}
                  height={photo.height}
                  srcSet={photo.srcSet}
                  sizes='(min-width: 1024px) 50vw, 100vw'
                  alt={photo.alt}
                  loading='lazy'
                  decoding='async'
                  className='h-full w-full object-cover transition-transform duration-700 ease-kettli group-hover:scale-105'
                />
                <span aria-hidden='true' className='pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-night/90 to-transparent p-4 pt-10 text-sm text-fg opacity-0 transition-opacity duration-300 group-hover:opacity-100'>
                  {photo.alt}
                </span>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <CtaBand tone='gold' title='Never miss a night' description='Every live set and special evening goes up on Instagram first.'>
        <Button href={siteConfig.instagramUrl} variant='dark' size='lg'>
          <Instagram className='h-4 w-4' />
          Follow {siteConfig.instagramHandle}
        </Button>
      </CtaBand>
    </>
  );
}
