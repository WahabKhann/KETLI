import PageHeader from '../components/ui/PageHeader.jsx';
import VisitSection from '../components/sections/VisitSection.jsx';
import PhotoStrip from '../components/sections/PhotoStrip.jsx';
import usePageMeta from '../hooks/usePageMeta.js';
import { photos } from '../data/media.js';

const arrivalPhotos = [photos.muralNight, photos.rooftopMural, photos.stringLights, photos.barCounter];

export default function Locations() {
  usePageMeta({
    title: 'Location — Kettli Islamabad',
    description: 'Find Kettli on the rooftop at Sagheer Market, Street 40, F-10/4, Islamabad. Open daily until around 3 AM.',
  });

  return (
    <>
      <PageHeader
        eyebrow='Location'
        title='Find Kettli'
        description='Up on the roof at Sagheer Market, F-10/4. Look for the KETTLI marquee lights.'
        photo={photos.rooftopSign}
      />
      <VisitSection id='map' />
      <PhotoStrip items={arrivalPhotos} />
    </>
  );
}
