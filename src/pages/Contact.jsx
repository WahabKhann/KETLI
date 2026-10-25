import { useState } from 'react';
import {
  Phone,
  MapPin,
  Clock,
  Instagram,
  ExternalLink,
  MessageCircleMore,
} from 'lucide-react';
import Container from '../components/ui/Container.jsx';
import PageHeader from '../components/ui/PageHeader.jsx';
import Button from '../components/ui/Button.jsx';
import RevealOnScroll from '../components/ui/RevealOnScroll.jsx';
import usePageMeta from '../hooks/usePageMeta.js';
import { siteConfig } from '../data/siteConfig.js';
import { photos } from '../data/media.js';
import { labelClass, inputClass, errorClass } from '../components/ui/formStyles.js';
import { locations } from '../data/locations.js';

function validate(values) {
  const errors = {};

  if (!values.name.trim()) {
    errors.name = 'Please enter your name.';
  }

  if (!values.contact.trim()) {
    errors.contact = 'Please enter a phone number or email.';
  } else {
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.contact.trim());
    const isPhone = /^[+\d][\d\s-]{6,}$/.test(values.contact.trim());
    if (!isEmail && !isPhone) {
      errors.contact = 'Enter a valid phone number or email address.';
    }
  }

  if (!values.message.trim()) {
    errors.message = "Let us know what you'd like to ask.";
  } else if (values.message.trim().length < 10) {
    errors.message = 'Please add a few more details (10+ characters).';
  }

  return errors;
}

function ContactForm() {
  const [values, setValues] = useState({ name: '', contact: '', message: '' });
  const [errors, setErrors] = useState({});

  const handleChange = (field) => (e) => {
    setValues((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate(values);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      const message = [
        `Hi Kettli, my name is ${values.name.trim()}.`,
        `Contact: ${values.contact.trim()}`,
        values.message.trim(),
      ].join('\n\n');
      window.open(
        `${siteConfig.whatsappUrl}?text=${encodeURIComponent(message)}`,
        '_blank',
        'noopener,noreferrer',
      );
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate className='flex flex-col gap-5'>
      <div>
        <label htmlFor='name' className={labelClass}>
          Name
        </label>
        <input
          id='name'
          placeholder='Your name'
          autoComplete='name'
          type='text'
          value={values.name}
          onChange={handleChange('name')}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? 'name-error' : undefined}
          className={inputClass}
        />
        {errors.name && (
          <p id='name-error' className={errorClass}>
            {errors.name}
          </p>
        )}
      </div>

      <div>
        <label htmlFor='contact' className={labelClass}>
          Phone or email
        </label>
        <input
          id='contact'
          placeholder='03xx xxxxxxx or you@email.com'
          type='text'
          value={values.contact}
          onChange={handleChange('contact')}
          aria-invalid={Boolean(errors.contact)}
          aria-describedby={errors.contact ? 'contact-error' : undefined}
          className={inputClass}
        />
        {errors.contact && (
          <p id='contact-error' className={errorClass}>
            {errors.contact}
          </p>
        )}
      </div>

      <div>
        <label htmlFor='message' className={labelClass}>
          Message
        </label>
        <textarea
          id='message'
          placeholder='Table booking, feedback, a question…'
          rows={5}
          value={values.message}
          onChange={handleChange('message')}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? 'message-error' : undefined}
          className={`resize-none ${inputClass}`}
        />
        {errors.message && (
          <p id='message-error' className={errorClass}>
            {errors.message}
          </p>
        )}
      </div>

      <Button
        type='submit'
        variant='primary'
        size='lg'
        className='mt-2 w-full gap-2 sm:w-fit'
      >
        <MessageCircleMore className='h-4 w-4' />
        Continue on WhatsApp
      </Button>
      <p className='text-sm leading-relaxed text-fg-muted'>
        Your message will open in WhatsApp for you to review before sending.
      </p>
    </form>
  );
}

export default function Contact() {
  usePageMeta({
    title: 'Contact — Kettli Islamabad',
    description:
      'Get in touch with Kettli F-10/4, Islamabad. Call, message on Instagram, or send a note through the contact form.',
  });

  const mainBranch = locations[0];

  return (
    <>
      <PageHeader
        eyebrow='Contact'
        title='Get in touch'
        description='Questions, feedback, bookings or planning a visit — reach Kettli directly.'
        photo={photos.barCounter}
      />

      <section className='surface-gold py-16 text-ink lg:py-24'>
        <Container>
          <div className='grid grid-cols-1 gap-12 lg:grid-cols-5 lg:gap-16'>
            <RevealOnScroll className='lg:col-span-2'>
              <h2 className='font-display text-h4'>
                Reach us directly
              </h2>
              <ul className='mt-6 flex flex-col gap-5 text-base text-ink-muted'>
                <li className='flex items-start gap-3'>
                  <MapPin
                    className='mt-0.5 h-5 w-5 shrink-0 text-night'
                    strokeWidth={1.5}
                  />
                  <span>{mainBranch.address}</span>
                </li>
                <li className='flex items-start gap-3'>
                  <Clock
                    className='mt-0.5 h-5 w-5 shrink-0 text-night'
                    strokeWidth={1.5}
                  />
                  <span>{mainBranch.hours}</span>
                </li>
                <li className='flex items-start gap-3'>
                  <Phone
                    className='mt-0.5 h-5 w-5 shrink-0 text-night'
                    strokeWidth={1.5}
                  />
                  <a
                    href={siteConfig.phoneHref}
                    className='underline decoration-night/30 underline-offset-4 hover:decoration-night'
                  >
                    {siteConfig.phone}
                  </a>
                </li>
                <li className='flex items-start gap-3'>
                  <Instagram
                    className='mt-0.5 h-5 w-5 shrink-0 text-night'
                    strokeWidth={1.5}
                  />
                  <a
                    href={siteConfig.instagramUrl}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='underline decoration-night/30 underline-offset-4 hover:decoration-night'
                  >
                    {siteConfig.instagramHandle}
                  </a>
                </li>
              </ul>

              <div className='mt-8 flex flex-wrap gap-3'>
                <Button
                  href={mainBranch.mapsUrl}
                  variant='dark'
                  size='md'
                  className='gap-1.5'
                >
                  Get Directions
                  <ExternalLink className='h-3.5 w-3.5' strokeWidth={1.5} />
                </Button>
                <Button
                  href={siteConfig.foodpandaUrl}
                  variant='ghost'
                  size='md'
                >
                  Order Online
                </Button>
              </div>
            </RevealOnScroll>

            <RevealOnScroll delay={100} className='card p-6 sm:p-8 lg:col-span-3'>
              <h2 className='font-display text-h4 text-accent sm:text-4xl'>
                Send a message
              </h2>
              <div className='mt-6'>
                <ContactForm />
              </div>
            </RevealOnScroll>
          </div>
        </Container>
      </section>
    </>
  );
}
