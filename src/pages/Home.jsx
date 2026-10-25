import { Instagram, MessageCircleMore } from 'lucide-react';
import Hero from '../components/home/Hero.jsx';
import VisitSection from '../components/sections/VisitSection.jsx';
import PhotoStrip from '../components/sections/PhotoStrip.jsx';
import MenuBoard from '../components/menu/MenuBoard.jsx';
import Specials from '../components/sections/Specials.jsx';
import EventsBand from '../components/sections/EventsBand.jsx';
import BlogTeaser from '../components/sections/BlogTeaser.jsx';
import Reviews from '../components/sections/Reviews.jsx';
import CtaBand from '../components/sections/CtaBand.jsx';
import Button from '../components/ui/Button.jsx';
import usePageMeta from '../hooks/usePageMeta.js';
import { photoStrip } from '../data/media.js';
import { siteConfig } from '../data/siteConfig.js';

export default function Home() {
  usePageMeta({
    title: 'Kettli — Rooftop Restaurant & Café in F-10, Islamabad',
    description:
      'Kettli is a late-night rooftop restaurant and café in F-10/4, Islamabad — karak chai, the Hi-Tea Platter, live acoustic nights and comfort food until 3 AM.',
  });

  return (
    <>
      <Hero />
      <VisitSection />
      <PhotoStrip items={photoStrip} />
      <MenuBoard />
      <Specials />
      <EventsBand />
      <Reviews />
      <BlogTeaser />
      <CtaBand
        title='Catch the next night first'
        description='Live music dates, new dishes and rooftop specials land on Instagram before anywhere else.'
        tone='gold'
      >
        <Button href={siteConfig.instagramUrl} variant='dark' size='lg'>
          <Instagram className='h-4 w-4' />
          Follow {siteConfig.instagramHandle}
        </Button>
        <Button href={siteConfig.whatsappUrl} variant='ghost' size='lg'>
          <MessageCircleMore className='h-4 w-4' />
          WhatsApp us
        </Button>
      </CtaBand>
    </>
  );
}
