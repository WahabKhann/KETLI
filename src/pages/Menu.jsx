import { Phone } from 'lucide-react';
import PageHeader from '../components/ui/PageHeader.jsx';
import MenuBoard from '../components/menu/MenuBoard.jsx';
import MenuCategoryNav from '../components/menu/MenuCategoryNav.jsx';
import Specials from '../components/sections/Specials.jsx';
import PhotoStrip from '../components/sections/PhotoStrip.jsx';
import CtaBand from '../components/sections/CtaBand.jsx';
import Button from '../components/ui/Button.jsx';
import usePageMeta from '../hooks/usePageMeta.js';
import { photos } from '../data/media.js';
import { siteConfig } from '../data/siteConfig.js';

const menuPhotos = [
  photos.hiteaPlatter,
  photos.karakChai,
  photos.pizzaMocktail,
  photos.hiteaLabelled,
  photos.barCounter,
  photos.hiteaCrunch,
  photos.muralNight,
];

export default function Menu() {
  usePageMeta({
    title: 'Menu — Kettli Islamabad',
    description:
      "Kettli's menu — karak chai, parathas, the Hi-Tea Platter, sehri, coffee, desserts and sheesha at our F-10/4 rooftop in Islamabad.",
  });

  return (
    <>
      <PageHeader
        eyebrow='Food & drink'
        title='Menu'
        description='Chai first, then everything else. Comfort food and late-night favourites, served until around 3 AM.'
        photo={photos.karakChai}
      />
      <MenuCategoryNav />
      <MenuBoard title={null} />
      <Specials />
      <PhotoStrip items={menuPhotos} moving className='surface-gold' />
      <CtaBand title='Hungry at 2 AM?' description='Order on Foodpanda, or call ahead and we will have it ready.'>
        <Button href={siteConfig.foodpandaUrl} variant='primary' size='lg'>
          Order on Foodpanda
        </Button>
        <Button href={siteConfig.phoneHref} variant='secondary' size='lg'>
          <Phone className='h-4 w-4' />
          Call {siteConfig.phone}
        </Button>
      </CtaBand>
    </>
  );
}
